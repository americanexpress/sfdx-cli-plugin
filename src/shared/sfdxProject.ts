export interface ProjectJsonPackage {
    packageName: string;
    isMainPackage: boolean;
    isMainContractPackage: boolean;
    versionNumber?: string;
    packageId: string;
    isVersionIdSpecified: boolean;
    releasedVersion?: string;
    latestVersion?: string;
}

export function getMainPackage(projectJson) {
    const projJson = projectJson;
    const defaultPackageDir = projJson.packageDirectories.find(pd => pd.default);
    const pkg: ProjectJsonPackage = {
        packageName: defaultPackageDir.package,
        packageId: null,
        isVersionIdSpecified: null,
        versionNumber: defaultPackageDir.versionNumber,
        isMainPackage: true,
        isMainContractPackage: false
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

export function stripAtVersion(input: string): string {
    if (input.indexOf('@') > -1) {
        const parts = input.split('@');
        return parts[0];
    }
    return input;
}
