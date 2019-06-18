/*
 * Copyright (c) 2019 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
import { SfdxProjectJson } from '@salesforce/core';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { isNullOrUndefined } from 'util';
import * as cliCmd from '../shared/cliCommand';

/**
 * Interface for basic info about a package version
 */
export interface PackageVersionBasic {
    id: string;
    name: string;
    version: string;
}

/**
 * Interface for options to getDependencies
 */
export interface GetDependenciesOptions {
    // tslint:disable-next-line:no-any
    projectJson: any;
    includeParent?: boolean;
    verbose?: boolean;
    latestVersions?: boolean;
}

/**
 * Interface for more detailed information about a package version
 * TODO: Refactor using optional properties.
 */
export interface PackageVersionInfo extends PackageVersionBasic {
    branch: string;
    installedBuildNumber: number;
    latestBuildNumber: number;
    installedVersion: string;
    latestVersion: string;
    installed: boolean;
    released: boolean;
}

/**
 * Interface for package info from sfdx-project.json
 */
export interface FilePackageInfo {
    package: string;
    versionNumber: string;
}

export interface VersionedAlias {
    alias: string;
    packageName: string;
    versionNumber: string;
    versionId: string;
}

/**
 * Interface for properties returned by sfdx:package:version:list
 */
export interface ResponsePackageVersion {
    SubscriberPackageVersionId: string;
    Package2Name: string;
    Version: string;
    BuildNumber: number;
    Branch: string;
    IsReleased: boolean;
    CreatedDate: string; // Not used but might be handy later. XF
}

export interface FilterOptions {
    branch?: string;
    released: boolean;
}

/**
 * Interface for table creation
 */
export interface TableData {
    rows: object[];
    options: { columns: Array<{ key: string, label: string }> };
}

/**
 * Display statuses for package versions installed compared
 * to list of dependencies in sfdx-project.json
 */
export enum InstallStatus {
    Behind = 'Behind',
    Latest = 'Latest',
    Missing = 'Missing'
}

/**
 * Wrapper function to retrieve project JSON file as JSON object
 */
export async function getProjectJson() {
    const project = await SfdxProjectJson.retrieve<SfdxProjectJson>();
    const projectJson = project.toObject();
    return projectJson;
}

/**
 * Builds data for the basic package version display table
 * @param packageVersions Array of PackageVersionInfo objects
 * @returns TableData object
 */
export function buildBasicTable(packageVersions: PackageVersionInfo[]): TableData {
    const retObj: TableData = {
        rows: null,
        options: null
    };

    retObj.options = {
        columns: [
            { key: 'c1', label: 'Package Name' },
            { key: 'c2', label: 'Configured Vers.' }
        ]
    };

    const rows = [];
    retObj.rows = rows;
    if (!packageVersions || packageVersions.length === 0) {
        return retObj;
    }

    for (const pv of packageVersions) {
        const row = { c1: pv.name, c2: pv.version };
        rows.push(row);
    }
    retObj.rows = rows;
    return retObj;
}

/**
 * Builds table to display for adp:package:list --verbose
 * @param packageVersions Package version info array
 */
export function buildVerboseTable(packageVersions: PackageVersionInfo[]): TableData {

    const retObj: TableData = {
        rows: null,
        options: null
    };

    retObj.options = {
        columns: [
            { key: 'c1', label: 'Package Name' },
            { key: 'c2', label: 'Branch' },
            { key: 'c3', label: 'Configured Vers.' },
            { key: 'c4', label: 'Version ID'},
            { key: 'c5', label: 'Version Number' }]
    };

    const rows = [];
    retObj.rows = rows;
    if (!packageVersions || packageVersions.length === 0) {
        return retObj;
    }

    for (const pv of packageVersions) {

        const releasedStr = buildReleasedDisplayString(pv.released, pv.latestBuildNumber);
        const branchName = isNullOrUndefined(pv.branch) ? '' : chalk.red(pv.branch);
        let displayVersion;
        if (isNullOrUndefined(pv.released)) {
            displayVersion = `${pv.latestVersion} (NA)`;
        } else if (pv.released) {
            displayVersion = chalk.green(`${pv.latestVersion} ${releasedStr}`);
        } else {
            displayVersion = chalk.red(`${pv.latestVersion} ${releasedStr}`);
        }
        const row = { c1: pv.name, c2: branchName, c3: pv.version, c4: pv.id, c5: displayVersion };
        rows.push(row);
    }
    retObj.rows = rows;
    return retObj;
}

/**
 * Builds table to list installed packages
 * @param packageVersions Package version info array
 */
export function buildInstalledTable(packageVersions: PackageVersionInfo[]): TableData {

    const retObj: TableData = {
        rows: null,
        options: null
    };

    retObj.options = {
        columns: [
            { key: 'c1', label: 'ID' },
            { key: 'c2', label: 'Package Name' },
            { key: 'c3', label: 'Branch' },
            { key: 'c4', label: 'Configured Vers.' },
            { key: 'c5', label: 'Installed Version' },
            { key: 'c6', label: 'Latest Version'},
            { key: 'c7', label: 'Status' }]
    };

    const rows = [];
    retObj.rows = rows;
    if (!packageVersions || packageVersions.length === 0) {
        return retObj;
    }

    for (const pv of packageVersions) {
        let row;

        const branchName = pv.branch === null ? '' : chalk.red(pv.branch);
        const statusStr = computeInstalledStatus(pv.installedVersion, pv.latestVersion);
        row = { c1: pv.id, c2: pv.name, c3: branchName, c4: pv.version, c5: pv.installedVersion, c6: pv.latestVersion, c7: statusStr };
        rows.push(row);
    }
    retObj.rows = rows;
    return retObj;
}

/**
 * Retrieves the dependencies for a project
 * @param options Project dependency retrieval options
 * @returns Array of PackageVersionInfo objects
 */
export async function getDependencies(options: GetDependenciesOptions) {

    const projJson = options.projectJson;
    const pkgDir = projJson.packageDirectories.find(pd => pd.default);
    const includeParent: boolean = options.includeParent;
    const verbose: boolean = options.verbose;
    const latestVersions: boolean = options.latestVersions;

    if (pkgDir === undefined) {
        throw new Error('Default package directory not found.');
    }
    const packageAliases = projJson.packageAliases;
    const mainPackage = pkgDir.package;
    const parentVersionNum = pkgDir.versionNumber;
    let deps = pkgDir.dependencies;
    if (!includeParent) {
        deps = deps.filter(d => d.package !== `${mainPackage}_contracts`);
    }

    let pkgVersions;

    if (verbose) {

        // Build the comma-delimited list of packages to query
        const packageNames: string[] = new Array();
        if (includeParent) {
            packageNames.push(mainPackage);
        }

        for (const dep of deps) {
            if (dep.versionNumber) {
                packageNames.push(dep.package);
            }
        }

        // Retrieve package versions
        const pvListCmd = `sfdx force:package:version:list -p '${packageNames}' --json --concise`;

        let pkgVersionResp;
        const noInherit = true;
        pkgVersionResp = cliCmd.runCmd(pvListCmd, noInherit);
        pkgVersions = JSON.parse(pkgVersionResp);

        // try {
        //     // Can't use cliCommand function here, so that we can return the response
        //     pkgVersionResp = execSync(pvListCmd, { encoding: 'utf8' });
        //     pkgVersions = JSON.parse(pkgVersionResp);
        // } catch (err) {
        //     return;
        // }
    }

    // Add the parent project to the array if user opted for it
    if (includeParent) {
        deps.push({ package: mainPackage, versionNumber: parentVersionNum });
    }

    const devhubPackageVersions = pkgVersions ? pkgVersions.result : null;

    // Set filter options for the final package package version array
    let filterOptions: FilterOptions = null;
    if (!latestVersions) {
        filterOptions = {released: true};
    }

    const retArr = buildPackageVersionArray(deps, packageAliases, devhubPackageVersions, filterOptions);
    return retArr;
}

/**
 * Wraps force:package:installed:list and user-friendly output
 * @param dependencies Dependencies from sfdx-project.json
 * @param username The username for the target org
 */
export async function getInstalledDependencies(dependencies, username?: string) {

    const retArr: PackageVersionInfo[] = new Array();

    // Get every package installed on the target org
    const installedResp = execSync(`sfdx force:package:installed:list -u ${username} --json`, { encoding: 'utf8' });
    const installedJson = await JSON.parse(installedResp);

    const installed = new Array();

    // Capture the Package Version IDs used to set the "installed" flag
    for (const v of installedJson.result) {
        installed.push({
            installedVersionId: v.SubscriberPackageVersionId,
            installedPackageName: v.SubscriberPackageName,
            installedPackageVersion: v.SubscriberPackageVersionNumber,
            installedBuildNumber: parseBuildNumber(v.SubscriberPackageVersionNumber)
        });
    }

    // Loop through dependencies to populate properties: installed, installedVersion
    for (const dep of dependencies) {
        dep.installed = installed.findIndex(pkg => pkg.installedVersionId === dep.id) > -1;
        const foundInstalled = installed.find(pkg => pkg.installedPackageName === dep.name);
        dep.installedVersion = isNullOrUndefined(foundInstalled) ? '' : foundInstalled.installedPackageVersion;
        retArr.push(dep);
    }
    return retArr;
}

export function buildReleasedDisplayString(isReleased: boolean, buildNumber: number) {
    let retVal: string;
    if (isReleased) {
        retVal = '(Released)';
    } else {
        retVal = `(Beta ${buildNumber})`;
    }
    return retVal;
}

/**
 * Computes whether input is specific version or contains
 * an instruction like LATEST or NEXT
 * @param input Version string, e.g. 1.0.0.LATEST
 */
export function isSpecificVersion(input: string) {
    let retVal;
    if (!isNullOrUndefined(input)) {
        const stripped = input.replace(/[.0-9]/g, '');
        retVal = stripped.trim().length === 0;
    }
    return retVal;
}

function findVersionNumberByAlias(packageName: string, packageAliases): string {
    const aliasObj: VersionedAlias = findVersionedAlias(packageName, packageAliases);
    return isNullOrUndefined(aliasObj) ? 'NA' : aliasObj.versionNumber;
}

/**
 * Searches the package aliases section from the project JSON by package name
 * @param packageName Name of the package
 * @param packageAliases packageAliases section from sfdx-project.json
 * @returns VersionedAlias object
 */
export function findVersionedAlias(packageName: string, packageAliases): VersionedAlias {
    let retObj: VersionedAlias = null;
    if (packageAliases) {
        for (const prop in packageAliases) {
            if (packageAliases.hasOwnProperty(prop)) {
                const id = packageAliases[prop];
                const pkgName = prop.includes('@') ? prop.split('@')[0] : prop;
                if (id.startsWith('04t') && pkgName === packageName) {
                    const versionNum = prop.includes('@') ? prop.split('@')[1] : 'NA';
                    retObj = {
                        alias: prop,
                        versionId: id,
                        versionNumber: versionNum,
                        packageName: pkgName
                    };
                    break;
                }
            }
        }// for
    }
    return retObj;
}

/**
 * Builds an array of PackageVersionInfo objects based on the the various inputs
 * @param filePackageInfoArr Array of packages from sfdx-package.json
 * @param packageAliases Section packageAliases from sfdx-package.json
 * @param retrievedPackageInfoArr Package versions retrieved from package:version:list
 * @param filterOpts
 */
export function buildPackageVersionArray(
    filePackageInfoArr,
    packageAliases,
    retrievedPackageInfoArr?: ResponsePackageVersion[],
    filterOpts?: FilterOptions): PackageVersionInfo[] {

    const retArr: PackageVersionInfo[] = new Array<PackageVersionInfo>();

    if (filePackageInfoArr) {
        for (const fpi of filePackageInfoArr) {
            const pvi = {
                name: fpi.package,
                version: fpi.versionNumber ? fpi.versionNumber : findVersionNumberByAlias(fpi.package, packageAliases)
            } as PackageVersionInfo;

            let picked: ResponsePackageVersion = null;
            if (retrievedPackageInfoArr) {
                const filteredByName = retrievedPackageInfoArr.filter(v => v.Package2Name === pvi.name);

                if (filterOpts) {
                    // With filter options
                    if (filterOpts.branch && filterOpts.released === true) {
                        throw new Error('Set either --branch or --released, but not both.');
                    } else if (filterOpts.branch) {
                        const branch = filterOpts.branch;
                        if (isSpecificVersion(fpi.versionNumber)) {
                            const filteredByBranchAndVersion = filteredByName.filter(v => v.Branch === branch && v.Version === fpi.versionNumber);
                            if (filteredByBranchAndVersion.length > 0) {
                                picked = getLatest(filteredByBranchAndVersion);
                            } else {
                                throw new Error(`Version ${fpi.versionNumber} not found for ${fpi.package} branch: ${branch}`);
                            }
                        } else {
                            const filteredByBranch = filteredByName.filter(v => v.Branch === branch);
                            if (filteredByBranch.length > 0) {
                                picked = getLatest(filteredByBranch);
                            } else {
                                picked = getLatest(filteredByName);
                            }
                        }
                    } else if (filterOpts.released === true) {
                        const filteredByReleased = filteredByName.filter(v => v.IsReleased === true);
                        if (filteredByReleased.length > 0) {
                            // Get latest of released versions
                            picked = getLatest(filteredByReleased);
                        }
                    }

                    if (isNullOrUndefined(picked)) {
                        // Nothing picked yet (e.g. never released)?
                        // Check if the version is part of the alias
                        const aliasedVersion: VersionedAlias = findVersionedAlias(pvi.name, packageAliases);
                        if (aliasedVersion != null) {
                            pvi.id = aliasedVersion.versionId;
                            pvi.branch = '';
                            pvi.latestVersion = aliasedVersion.versionNumber;
                            pvi.latestBuildNumber = parseBuildNumber(aliasedVersion.versionNumber);
                        }
                    } else {
                        pvi.id = picked.SubscriberPackageVersionId;
                        pvi.latestVersion = picked.Version;
                        pvi.branch = picked.Branch;
                        pvi.released = picked.IsReleased;
                        pvi.latestBuildNumber = picked.BuildNumber;
                    }

                } else {
                    // Without filter options
                    if (isSpecificVersion(fpi.versionNumber)) {
                        const filteredByVersionNum = filteredByName.filter(v => v.Branch === null && v.Version === fpi.versionNumber);
                        if (filteredByVersionNum.length > 0) {
                            picked = getLatest(filteredByVersionNum);
                        } else {
                            throw new Error(`Version ${fpi.versionNumber} not found for package, ${fpi.package}.`);
                        }
                    } else {
                        const filteredOnNotBranched = filteredByName.filter(v => v.Branch === null);
                        picked = getLatest(filteredOnNotBranched);
                    }

                    if (isNullOrUndefined(picked)) {
                        const aliasedVersion: VersionedAlias = findVersionedAlias(pvi.name, packageAliases);
                        if (aliasedVersion != null) {
                            pvi.id = aliasedVersion.versionId;
                            pvi.branch = '';
                            pvi.latestVersion = aliasedVersion.versionNumber;
                            pvi.latestBuildNumber = parseBuildNumber(aliasedVersion.versionNumber);
                        }
                    } else {
                        pvi.id = picked.SubscriberPackageVersionId;
                        pvi.latestVersion = picked.Version;
                        pvi.branch = picked.Branch;
                        pvi.released = picked.IsReleased;
                        pvi.latestBuildNumber = picked.BuildNumber;
                    }
                } // if filterOptions

            } else { // retrievedPackageInfoArr is null
                const aliasedVersion: VersionedAlias = findVersionedAlias(pvi.name, packageAliases);
                if (aliasedVersion != null) {
                    pvi.id = aliasedVersion.versionId;
                    pvi.branch = '';
                    pvi.latestVersion = aliasedVersion.versionNumber;
                    pvi.latestBuildNumber = parseBuildNumber(aliasedVersion.versionNumber);
                }
            }

            // If info from devhub passed hasn't been filtered out, add to array
            if (retrievedPackageInfoArr && pvi.id != null) {
                retArr.push(pvi);
            } else if (!retrievedPackageInfoArr) {
                retArr.push(pvi);
            }
        } // end for
    } // end if filePackageInfoArr
    return retArr;
}

function getLatest(arr) {
    return arr[arr.length - 1];
}

export function parseBuildNumber(versionNumber: string): number {
    return parseInt(versionNumber.split('.')[3], 0);
}

export function computeInstalledStatus(installedVersionNumber: string, latestVersionNumber: string): string {
    let status = '';
    if (!installedVersionNumber) {
        status = chalk.red(InstallStatus.Missing);
    } else if (installedVersionNumber === latestVersionNumber) {
        status = chalk.green(InstallStatus.Latest);
    } else {
        status = chalk.yellow(InstallStatus.Behind);
    }
    return status;
}
