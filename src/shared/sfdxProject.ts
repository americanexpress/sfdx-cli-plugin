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
import { isNullOrUndefined } from 'util';

export interface ProjectJsonPackage {
    packageName: string;
    isMainPackage: boolean;
    isMainContractPackage: boolean;
    versionNumber?: string;
    packageId: string;
    isVersionIdSpecified: boolean;
    releasedVersion?: string;
    latestVersion?: string;
    dependencies?: [];
}

export function getMainPackage(projectJson) {
    const projJson = projectJson;
    const defaultPackageDir = projJson.packageDirectories.find(pd => pd.default);
    const packageName = defaultPackageDir.package;
    const aliases = projJson.packageAliases;
    const pkg: ProjectJsonPackage = {
        packageName,
        packageId: aliases[packageName],
        isVersionIdSpecified: null,
        versionNumber: defaultPackageDir.versionNumber,
        isMainPackage: true,
        isMainContractPackage: false,
        dependencies: defaultPackageDir.dependencies
    };
    return pkg;
}

export function getMainContractsPackage(projectJson) {
    const dependencies = getPackageDependencies(projectJson);
    const retVal = dependencies.find(p => p.isMainContractPackage);
    return retVal;
}

export function getPackageDependencies(projectJson, excludePackageNames?: string[]) {

    const pkgList: ProjectJsonPackage[] = new Array();
    const projJson = projectJson;
    const defaultPackageDir = projJson.packageDirectories.find(pd => pd.default);
    const mainPackage = defaultPackageDir.package;

    // Loop through the dependencies
    for (const dependency of defaultPackageDir.dependencies) {

        const alias = Object.keys(projJson.packageAliases).find(a => a === dependency.package);
        const isVersionIdSpecified = projJson.packageAliases[alias].indexOf('04t') === 0;
        const getVersionNumber = dep => {

            if (dep.package.indexOf('@') > -1) {
                return dep.package.split('@')[1];
            } else {
                return dep.versionNumber;
            }
        };

        const packageName = stripAtVersion(dependency.package);
        const pkg: ProjectJsonPackage = {
            packageName,
            packageId: projJson.packageAliases[alias],
            isVersionIdSpecified,
            versionNumber: getVersionNumber(dependency),
            isMainPackage: false,
            isMainContractPackage: packageName === `${mainPackage}_contracts`
        };

        const alreadyAdded = pkgList.findIndex(p => p.packageName === pkg.packageName) >= 0;

        // Add to return array if not excluded
        if (excludePackageNames !== undefined) {
            if (excludePackageNames.indexOf(pkg.packageName) === -1) {
                if (!alreadyAdded) {
                    pkgList.push(pkg);
                }
            }
        } else {
            if (!alreadyAdded) {
                pkgList.push(pkg);
            }
        }
    }
    return pkgList;
}

/**
 * Compares strings in Major.Minor.Patch.Build to determine if the second argument is a later version than the first
 * @param version1
 * @param version2
 */
export function isLaterVersion(version1: string, version2: string) {
    if (isNullOrUndefined(version1) || isNullOrUndefined(version2)) {
        return false;
    }
    const versionArr1 = version1.split('.');
    const versionArr2 = version2.split('.');
    let isLater = false;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < versionArr1.length; i++) {
        const num1 = parseInt(versionArr1[i], 10);
        const num2 = parseInt(versionArr2[i], 10);
        if (num2 > num1) {
            isLater = true;
            break;
        }
    }
    return isLater;
}

export function stripAtVersion(input: string): string {
    if (input.indexOf('@') > -1) {
        const parts = input.split('@');
        return parts[0];
    }
    return input;
}
