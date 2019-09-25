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
import { expect } from '@salesforce/command/dist/test';
import chalk from 'chalk';
import * as pkg from '../../src/helpers/packageHelper';

// tslint:disable-next-line:no-var-requires
const testJson = require('../resources/test-project.json');
// tslint:disable-next-line:no-var-requires
const noDefaultJson = require('../resources/test-project-no-default.json');

describe('---------- packageHelper UNIT ----------', () => {

    describe('getDependencies - force-app exists', () => {
        let packages;
        before(async () => {
            packages = await pkg.getDependencies({projectJson: testJson});
        });

        it('returns 6 dependencies with no contracts', async () => {
            expect(packages.length).to.equal(7);
        });

        it('result has fflib-apex-mocks listed first', async () => {
            expect(packages[0].name).to.equal('fflib-apex-mocks');
        });

        it('result has d_utilities listed last', async () => {
            expect(packages[packages.length - 1].name).to.equal('d_utilities');
        });

        it('version aliased package has version number', async () => {
            expect(packages.find(p => p.name === 'd_trigger_monitor').version).to.equal('1.0.0.3');
        });

        it('gets the package ID from the aliases', async () => {
            expect(packages.find(p => p.name === 'd_trigger_monitor').id).to.equal('04t460000006MLsAAM');
        });
    });

    describe('getDependencies - force-app does not exist', () => {

        it ('throws error when default package directory not found', async () => {
            let errorMsg = '';
            try {
                await pkg.getDependencies({projectJson: noDefaultJson});
            } catch (err) {
                errorMsg = err.message;
            }
            expect(errorMsg).to.equal('Default package directory not found.');
        });

    });

    describe('buildVerboseTable', () => {

        it('returns a TableData object with 6 columns when input empty', () => {
            const result = pkg.buildVerboseTable([]);
            expect(result.options).not.equal(null);
            expect(result.options.columns.length).equals(6);
        });

        it('returns a TableData object with 6 columns and 0 rows when input null', () => {
            const result = pkg.buildVerboseTable(null);
            expect(result.options.columns.length).equals(6);
        });

        it('returns a TableData object with 1 row when version data passed in', () => {
            const result = pkg.buildVerboseTable([{
                id: '123456',
                name: 'package name',
                branch: 'branch name',
                version: 'version',
                installedBuildNumber: 1,
                latestBuildNumber: 2,
                installationVersion: '1.0.0.1',
                installedVersion: '1.0.0.1',
                latestVersion: '1.0.0.1',
                installed: false,
                released: false
            }]);
            expect(result.rows.length).equals(1);
        });
    });

    describe('buildInstalledTable', () => {

        it('returns a TableData object with 6 columns when input empty', () => {
            const result = pkg.buildInstalledTable([]);
            expect(result.options).not.equal(null);
            expect(result.options.columns.length).equals(6);
        });

        it('has last column labeled "Status"', () => {
            const result = pkg.buildInstalledTable(null);
            expect(result.options.columns[result.options.columns.length - 1].label).equals('Status');
        });

        it('returns a TableData object with 1 row when version data passed in', () => {
            const result = pkg.buildInstalledTable([{
                id: '123456',
                name: 'package name',
                branch: 'branch name',
                version: 'version',
                installedBuildNumber: 1,
                latestBuildNumber: 2,
                installedVersion: '1.0.0.1',
                installationVersion: '1.0.0.1',
                latestVersion: '1.0.0.1',
                installed: true,
                released: true
            }]);
            expect(result.rows.length).equals(1);
        });
    });

    describe('buildBasicTable', () => {

        it('returns a TableData object with 4 columns and 0 rows when input null', () => {
            const result = pkg.buildBasicTable(null);
            expect(result.options).not.equal(null);
            expect(result.options.columns.length).equals(4);
        });

        it('returns a TableData object with 4 columns and 0 rows when input empty', () => {
            const result = pkg.buildBasicTable([]);
            expect(result.options).not.equal(null);
            expect(result.options.columns.length).equals(4);
        });

        it('returns a TableData object with 1 row when version data passed in', () => {
            const result = pkg.buildBasicTable([{
                id: null,
                name: 'package name',
                branch: null,
                version: 'version',
                installedBuildNumber: null,
                latestBuildNumber: null,
                installationVersion: null,
                installedVersion: null,
                latestVersion: null,
                installed: null,
                released: null
            }]);
            expect(result.rows.length).equals(1);
        });
    });

    describe('isSpecificVersion', () => {

        it('returns FALSE when passed 1.0.0.LATEST', () => {
            expect(pkg.isSpecificVersion('1.0.0.LATEST')).to.equal(false);
        });

        it('returns TRUE when passed 1.0.0.13', () => {
            expect(pkg.isSpecificVersion('1.0.0.13')).to.equal(true);
        });

        it('returns TRUE when passed 1.0.0-3', () => {
            expect(pkg.isSpecificVersion('1.0.0-3')).to.equal(true);
        });
    });

    describe('buildPackageVersionArray', () => {

        describe('when response package info array parameter is null', () => {
            it('returns an empty array of type PackageVersion when first parameter is null', () => {
                const result = pkg.buildPackageVersionArray(null, null);
                expect(result).not.equals(null);
            });

            it('returns one element when project JSON has one dependency', () => {
                const result = pkg.buildPackageVersionArray([
                    { packageId: '0Hoxxxxxxxx', packageName: 'my_package', versionNumber: '1.0.0.LATEST', isVersionIdSpecified: false,
                        isMainPackage: false, isMainContractPackage: false}
                ], null);
                expect(result.length).equals(1);
                expect(result[0].name).equals('my_package');
                expect(result[0].version).equals('1.0.0.LATEST');
            });
        });

        describe('when both inputs parameters are populated', () => {
            it('result has additional parameters populated', () => {
                const result = pkg.buildPackageVersionArray([
                    { packageId: '04t11111', packageName: 'my_package', versionNumber: '1.0.0.5', isVersionIdSpecified: true,
                        isMainPackage: false, isMainContractPackage: false}
                    ],
                    null,
                    [{
                        SubscriberPackageVersionId: '04t11111',
                        Package2Name: 'my_package',
                        Version: '1.0.0.5',
                        BuildNumber: 5,
                        Branch: null,
                        IsReleased: false,
                        CreatedDate: '2018-12-07 09:49'
                    },
                    {
                        SubscriberPackageVersionId: '04t222222',
                        Package2Name: 'my_other_package',
                        Version: '1.0.0.1',
                        BuildNumber: 1,
                        Branch: null,
                        IsReleased: true,
                        CreatedDate: '2018-12-07 09:49'
                    }]);
                expect(result[0].id).equals('04t11111');
                expect(result[0].installationVersion).equals('1.0.0.5');
                expect(result[0].released).equals(false);
                expect(result[0].latestBuildNumber).to.equal(5);
            });

            it('result contains match in case of specific version when specified', () => {
                const result = pkg.buildPackageVersionArray(
                    [{ packageId: '0HoAAA', packageName: 'my_package', versionNumber: '1.0.0.2', isVersionIdSpecified: false,
                        isMainPackage: false, isMainContractPackage: false}],
                    null,
                    [{
                        SubscriberPackageVersionId: '04t11111',
                        Package2Name: 'my_package',
                        Version: '1.0.0.1',
                        BuildNumber: 1,
                        Branch: 'US123456',
                        IsReleased: false,
                        CreatedDate: '2018-12-03 10:00'
                    },
                    {
                        SubscriberPackageVersionId: '04t22222',
                        Package2Name: 'my_package',
                        Version: '1.0.0.2',
                        BuildNumber: 2,
                        Branch: null,
                        IsReleased: true,
                        CreatedDate: '2018-12-07 09:49'
                    },
                    {
                        SubscriberPackageVersionId: '04t33333',
                        Package2Name: 'my_package',
                        Version: '1.0.0.3',
                        BuildNumber: 1,
                        Branch: null,
                        IsReleased: true,
                        CreatedDate: '2018-12-10 15:00'
                    }]);

                expect(result[0].installationVersionId).equals('04t22222');
            });

            it ('has installationVersion set to released version when version bias set to "Released"', () => {
                const result = pkg.buildPackageVersionArray(
                    [{ packageId: '0HoAAA', packageName: 'my_package', versionNumber: '1.0.0.2', isVersionIdSpecified: false,
                    isMainPackage: false, isMainContractPackage: false}],
                    null,
                    [{
                        SubscriberPackageVersionId: '04t11111',
                        Package2Name: 'my_package',
                        Version: '1.0.0.1',
                        BuildNumber: 1,
                        Branch: null,
                        IsReleased: true,
                        CreatedDate: '2018-12-03 09:49'
                    },
                    {
                        SubscriberPackageVersionId: '04t22222',
                        Package2Name: 'my_package',
                        Version: '1.0.0.2',
                        BuildNumber: 2,
                        Branch: null,
                        IsReleased: false,
                        CreatedDate: '2018-12-07 09:49'
                    },
                    {
                        SubscriberPackageVersionId: '04t33333',
                        Package2Name: 'my_other package',
                        Version: '1.0.1.1',
                        BuildNumber: 1,
                        Branch: null,
                        IsReleased: false,
                        CreatedDate: '2018-12-07 09:49'
                    }], 'Released');

                expect(result[0].installationVersion).to.equal('1.0.0.1');
            });

            it('has value of null in installationVersion property when specified version number not found', () => {
                const result = pkg.buildPackageVersionArray(
                    [{ packageId: '0HoAAA', packageName: 'my_package', versionNumber: '1.0.0.3', isVersionIdSpecified: false,
                    isMainPackage: false, isMainContractPackage: false}],
                    null,
                    [{
                        SubscriberPackageVersionId: '04t11111',
                        Package2Name: 'my_package',
                        Version: '1.0.0.1',
                        BuildNumber: 1,
                        Branch: null,
                        IsReleased: false,
                        CreatedDate: '2018-12-03 09:49'
                    },
                    {
                        SubscriberPackageVersionId: '04t22222',
                        Package2Name: 'my_package',
                        Version: '1.0.0.2',
                        BuildNumber: 2,
                        Branch: null,
                        IsReleased: false,
                        CreatedDate: '2018-12-07 09:49'
                    },
                    {
                        SubscriberPackageVersionId: '04t33333',
                        Package2Name: 'my_other package',
                        Version: '1.0.1.1',
                        BuildNumber: 1,
                        Branch: null,
                        IsReleased: false,
                        CreatedDate: '2018-12-07 09:49'
                    }]);

                expect(result[0].installationVersion).to.equal('1.0.0.3');
            });

            it('has value in installationVersion that matches configured version when version uses hyphenated build number', () => {
                const result = pkg.buildPackageVersionArray(
                    [{ packageId: '04t222', packageName: 'my_package', versionNumber: '1.0.0-2', isVersionIdSpecified: false,
                    isMainPackage: false, isMainContractPackage: false}],
                    null,
                    [{
                        SubscriberPackageVersionId: '04t111',
                        Package2Name: 'my_package',
                        Version: '1.0.0.1',
                        BuildNumber: 1,
                        Branch: null,
                        IsReleased: false,
                        CreatedDate: '2018-12-03 09:49'
                    },
                    {
                        SubscriberPackageVersionId: '04t222',
                        Package2Name: 'my_package',
                        Version: '1.0.0.2',
                        BuildNumber: 2,
                        Branch: null,
                        IsReleased: false,
                        CreatedDate: '2018-12-07 09:49'
                    },
                    {
                        SubscriberPackageVersionId: '04t333',
                        Package2Name: 'my_other package',
                        Version: '1.0.1.1',
                        BuildNumber: 1,
                        Branch: null,
                        IsReleased: false,
                        CreatedDate: '2018-12-07 09:49'
                    }]);

                expect(result[0].installationVersion).to.equal('1.0.0.2');
            });
        });
    }); // end buildPackageVersionArray

    describe('parseBuildNumber', () => {
        it('parses the build number from valid version number', () => {
            const result = pkg.parseBuildNumber('1.0.0.14');
            expect(result).to.equal(14);
        });
    });

    describe('computeInstalledStatus', () => {
        it('returns "Behind" in yellow when installed version is greater than installation version number', () => {
            const result = pkg.computeInstalledStatus('1.0.0.12', '1.0.0.11');
            expect(result).to.equal(chalk.yellow('Behind'));
        });

        it('returns "Same" in green when installation and installed version numbers match', () => {
            const result = pkg.computeInstalledStatus('1.0.0.12', '1.0.0.12');
            expect(result).to.equal(chalk.green('Same'));
        });

        it('returns "Missing" in red when installed version number is undefined', () => {
            const result = pkg.computeInstalledStatus('1.0.0.12', undefined);
            expect(result).to.equal(chalk.red('Missing'));
        });
    });

    describe('findVersionedAlias', () => {
        it ('returns correct details when found and no "@" in alias', () => {
            const result = pkg.findVersionedAlias('mypackage', {
                mypackage: '04tabc',
                another_alias: '0Hoxyz',
                'myotherpackage@1.0.0.1': '@04tdef'
            });

            expect(result.versionId).to.equal('04tabc');
            expect(result.packageName).to.equal('mypackage');
            expect(result.versionNumber).to.equal('NA');
            expect(result.alias).to.equal('mypackage');
        });

        it ('returns correct details when found and alias contains "@"', () => {
            const result = pkg.findVersionedAlias('myotherpackage', {
                mypackage: '04tabc',
                another_alias: '0Hoxyz',
                'myotherpackage@1.0.0.1': '04tdef'
            });

            expect(result.versionId).to.equal('04tdef');
            expect(result.packageName).to.equal('myotherpackage');
            expect(result.versionNumber).to.equal('1.0.0.1');
            expect(result.alias).to.equal('myotherpackage@1.0.0.1');
        });
    });
});
