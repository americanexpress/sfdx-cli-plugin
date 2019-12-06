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
import { SfdxProject } from '@salesforce/core';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { isNullOrUndefined } from 'util';
import * as cliCmd from '../shared/cliCommand';
import * as sfdxProj from '../shared/sfdxProject';

/**
 * Interface for options to getDependencies
 */
export interface GetDependenciesOptions {
    // tslint:disable-next-line:no-any
    projectJson: any;
    includeParent?: boolean;
    verbose?: boolean;
    versionBias?: string;
}

/**
 * Interface for basic info about a package version
 */
export interface PackageVersionBasic {
    id: string;
    name: string;
    isMain?: boolean;
    isMainContract?: boolean;
    version: string;
    installationVersionId?: string;
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
    installationVersion?: string;
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
    latest?: boolean;
    released?: boolean;
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
    Ahead = 'Ahead',
    Behind = 'Behind',
    Same = 'Same',
    Missing = 'Missing'
}

/**
 * Wrapper function to retrieve project JSON file as JSON object
 */
export async function getProjectJson() {
    const project = await SfdxProject.resolve();
    const projectJson = await project.resolveProjectConfig();
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
            { key: 'c2', label: 'This Project' },
            { key: 'c3', label: 'Config Package ID' },
            { key: 'c4', label: 'Config Package Vers.' }
        ]
    };

    const rows = [];
    retObj.rows = rows;
    if (!packageVersions || packageVersions.length === 0) {
        return retObj;
    }

    for (const pv of packageVersions) {
        const row = {
            c1: pv.name,
            c2: pv.isMain || pv.isMainContract,
            c3: pv.id,
            c4: pv.version
        };
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
            { key: 'c2', label: 'This Project' },
            { key: 'c3', label: 'Config Package ID' },
            { key: 'c4', label: 'Config Package Vers.' },
            { key: 'c5', label: 'Installation ID' },
            { key: 'c6', label: 'Installation Version' }]
    };

    const rows = [];
    retObj.rows = rows;
    if (!packageVersions || packageVersions.length === 0) {
        return retObj;
    }

    for (const pv of packageVersions) {

        const releasedStr = buildReleasedDisplayString(pv.released, pv.latestBuildNumber);

        let displayVersion;
        if (pv.released) {
            displayVersion = chalk.green(`${pv.installationVersion} ${releasedStr}`);
        } else {
            displayVersion = chalk.red(`${pv.installationVersion} ${releasedStr}`);
        }
        const row = {
            c1: pv.name,
            c2: pv.isMain || pv.isMainContract,
            c3: pv.id === null || pv.id === undefined ? 'N/A' : pv.id,
            c4: pv.version,
            c5: isNullOrUndefined(pv.installationVersionId) ? 'N/A' : pv.installationVersionId,
            c6: displayVersion
        };
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
            { key: 'c3', label: 'Configured Vers.' },
            { key: 'c4', label: 'Installation Version' },
            { key: 'c5', label: 'Installed Version' },
            { key: 'c6', label: 'Status' }]
    };

    const rows = [];
    retObj.rows = rows;
    if (!packageVersions || packageVersions.length === 0) {
        return retObj;
    }

    for (const pv of packageVersions) {
        let row;

        const statusStr = computeInstalledStatus(pv.installationVersion, pv.installedVersion);
        row = { c1: pv.id,
            c2: pv.name,
            c3: pv.version,
            c4: pv.installationVersion,
            c5: pv.installedVersion,
            c6: statusStr
        };
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
    const dfltPackageDir = projJson.packageDirectories.find(pd => pd.default);
    const includeParent: boolean = options.includeParent;
    const verbose: boolean = options.verbose;
    const versionBias: string = options.versionBias;

    if (dfltPackageDir === undefined) {
        throw new Error('Default package directory not found.');
    }

    const mainPackage = sfdxProj.getMainPackage(projJson);
    let deps;
    if (includeParent) {
        deps = sfdxProj.getPackageDependencies(projJson);
    } else {
        // Exclude the main contracts dependency
        deps = sfdxProj.getPackageDependencies(projJson, [mainPackage.packageName + '_contracts']);
    }

    let pkgVersions;

    if (verbose) {

        // Build the comma-delimited list of packages to query
        const packageNames: string[] = new Array();
        if (includeParent) {
            packageNames.push(mainPackage.packageName);
        }

        for (const dep of deps) {
            // We want package version for all packages, even those for which we already have the 04t id
            if (dep.versionNumber) {
                packageNames.push(dep.packageName);
            }
        }

        // Retrieve package versions if necessary
        if (packageNames.length > 0) {

            const pvListCmd = `sfdx force:package:version:list -p '${packageNames}' --json --concise`;

            let pkgVersionResp;
            const noInherit = true;
            try {
                pkgVersionResp = cliCmd.runCmd(pvListCmd, noInherit);
            } catch (err) {
                console.log(chalk.red('Command failed. Set SYSTEM_DEBUG=true for more details.'));
                const errorResult: PackageVersionInfo[] = new Array();
                return errorResult;
            }
            pkgVersions = JSON.parse(pkgVersionResp);
        }

    }

    // Add the parent project to the array if user opted for it
    if (includeParent) {
        deps.push(mainPackage);
    }

    const devhubPackageVersions = pkgVersions ? pkgVersions.result : null;
    const retArr = buildPackageVersionArray(deps, null, devhubPackageVersions, versionBias);

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
        dep.installed = installed.findIndex(pkg => pkg.installedVersionId === dep.installationVersionId) > -1;
        const foundInstalled = installed.find(pkg => pkg.installedPackageName === dep.name);
        dep.installedVersion = isNullOrUndefined(foundInstalled) ? '' : foundInstalled.installedPackageVersion;
        retArr.push(dep);
    }
    return retArr;
}

export function buildReleasedDisplayString(isReleased: boolean, buildNumber: number) {
    let retVal: string;
    if (isNullOrUndefined(buildNumber)) {
        retVal = 'Indeterminate';
    } else if (isReleased) {
        retVal = 'Released';
    } else {
        retVal = `Beta ${buildNumber}`;
    }
    return `(${retVal})`;
}

/**
 * Computes whether input is specific version or contains
 * an instruction like LATEST or NEXT
 * @param input Version string, e.g. 1.0.0.LATEST
 */
export function isSpecificVersion(input: string) {
    let retVal;
    if (!isNullOrUndefined(input)) {
        const stripped = input.replace(/[\-.0-9]/g, '');
        retVal = stripped.trim().length === 0;
    }
    return retVal;
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
    filePackageInfoArr: sfdxProj.ProjectJsonPackage[],
    packageAliases,
    retrievedPackageInfoArr?: ResponsePackageVersion[],
    versionBias?: string): PackageVersionInfo[] {

    // Create the output array
    const retArr: PackageVersionInfo[] = new Array<PackageVersionInfo>();

    if (filePackageInfoArr) {

        // Loop through the packages defined in sfdx-project.json
        for (const fpi of filePackageInfoArr) {
            const pvi = {
                id: fpi.packageId,
                name: fpi.packageName,
                version: fpi.versionNumber,
                isMain: fpi.isMainPackage,
                isMainContract: fpi.isMainContractPackage,
                installationVersion: fpi.versionNumber,
                installationVersionId: fpi.isVersionIdSpecified ? fpi.packageId : null
            } as PackageVersionInfo;

            let picked: ResponsePackageVersion = null;

            // Devhub package version data present?
            if (retrievedPackageInfoArr) {

                const filteredByName = retrievedPackageInfoArr.filter(v => v.Package2Name === pvi.name && v.Branch === null);
                if (!isNullOrUndefined(fpi.packageId) && fpi.packageId.indexOf('04t') === 0) {
                    const filteredById = filteredByName.filter(v => v.SubscriberPackageVersionId === fpi.packageId);
                    if (filteredById.length > 0) {
                        picked = filteredById[0];
                    }
                } else if (versionBias === 'Released') {
                    const filteredByReleased = filteredByName.filter(v => v.IsReleased === true);
                    if (filteredByReleased.length > 0) {
                        // Get latest of released versions
                        picked = getLatest(filteredByReleased);
                    }
                } else if (versionBias === 'Latest') {
                    picked = getLatest(filteredByName);

                } else if (isSpecificVersion(fpi.versionNumber)) {
                    const filteredByVersionNum = filteredByName.filter(v => v.Version === fpi.versionNumber.replace('-', '.'));
                    if (filteredByVersionNum.length > 0) {
                        picked = getLatest(filteredByVersionNum);
                    }
                } else {
                    // Get latest build number within version
                    const parts = fpi.versionNumber.split('.');
                    const first3 = `${parts[0]}.${parts[1]}.${parts[2]}`;
                    const filteredByMajorMinorPatch = filteredByName.filter(v => v.Version.startsWith(first3));
                    if (filteredByMajorMinorPatch.length > 0) {
                        picked = getLatest(filteredByMajorMinorPatch);
                    }
                }

                if (isNullOrUndefined(picked)) {
                    pvi.installationVersion = isNullOrUndefined(pvi.version) ? null : pvi.version;
                    // Nothing picked yet (e.g. never released)?
                    // Check if the version is part of the alias
                    const aliasedVersion: VersionedAlias = findVersionedAlias(pvi.name, packageAliases);
                    if (aliasedVersion != null) {
                        pvi.branch = '';
                        pvi.latestVersion = aliasedVersion.versionNumber;
                        pvi.latestBuildNumber = parseBuildNumber(aliasedVersion.versionNumber);
                    }
                } else {
                    pvi.installationVersionId = picked.SubscriberPackageVersionId;
                    pvi.latestVersion = picked.Version;
                    pvi.branch = picked.Branch;
                    pvi.released = picked.IsReleased;
                    pvi.latestBuildNumber = picked.BuildNumber;
                    pvi.installationVersion = picked.Version;
                }

            } else { // retrievedPackageInfoArr is null
                const aliasedVersion: VersionedAlias = findVersionedAlias(pvi.name, packageAliases);
                if (aliasedVersion != null) {
                    // pvi.id = aliasedVersion.versionId;
                    pvi.branch = '';
                    pvi.latestVersion = aliasedVersion.versionNumber;
                    pvi.latestBuildNumber = parseBuildNumber(aliasedVersion.versionNumber);
                }
            }

            retArr.push(pvi);

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

export function computeInstalledStatus(installationVersionNumber: string, installedVersionNumber: string): string {
    let status = '';

    if (!installedVersionNumber) {
        status = chalk.red(InstallStatus.Missing);
    } else if (installationVersionNumber === installedVersionNumber) {
        status = chalk.green(InstallStatus.Same);
    } else if (sfdxProj.isLaterVersion(installationVersionNumber, installedVersionNumber)) {
        status = chalk.yellow(InstallStatus.Ahead);
    } else {
        status = chalk.yellow(InstallStatus.Behind);
    }
    return status;
}
