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
            expect(packages.length).to.equal(6);
        });

        it('result has fflib-apex-mocks listed first', async () => {
            expect(packages[0].name).to.equal('fflib-apex-mocks');
        });

        it('result has d_utilities listed last', () => {
            expect(packages[packages.length - 1].name).to.equal('d_utilities');
        });

        it('version aliased package has version number', () => {
            expect(packages.find(p => p.name === 'd_trigger_monitor').version).to.equal('1.0.0.3');
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

        it('returns a TableData object with 5 columns when input empty', () => {
            const result = pkg.buildVerboseTable([]);
            expect(result.options).not.equal(null);
            expect(result.options.columns.length).equals(5);
        });

        it('returns a TableData object with 5 columns and 0 rows when input null', () => {
            const result = pkg.buildVerboseTable(null);
            expect(result.options.columns.length).equals(5);
        });

        it('returns a TableData object with 1 row when version data passed in', () => {
            const result = pkg.buildVerboseTable([{
                id: '123456',
                name: 'package name',
                branch: 'branch name',
                version: 'version',
                installedBuildNumber: 1,
                latestBuildNumber: 2,
                installedVersion: 'installed version',
                latestVersion: 'latest version',
                installed: false,
                released: false
            }]);
            expect(result.rows.length).equals(1);
        });
    });

    describe('buildInstalledTable', () => {

        it('returns a TableData object with 7 columns when input empty', () => {
            const result = pkg.buildInstalledTable([]);
            expect(result.options).not.equal(null);
            expect(result.options.columns.length).equals(7);
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
                installedVersion: 'installed version',
                latestVersion: 'latest version',
                installed: true,
                released: true
            }]);
            expect(result.rows.length).equals(1);
        });
    });

    describe('buildBasicTable', () => {

        it('returns a TableData object with 2 columns and 0 rows when input null', () => {
            const result = pkg.buildBasicTable(null);
            expect(result.options).not.equal(null);
            expect(result.options.columns.length).equals(2);
        });

        it('returns a TableData object with 2 columns and 0 rows when input empty', () => {
            const result = pkg.buildBasicTable([]);
            expect(result.options).not.equal(null);
            expect(result.options.columns.length).equals(2);
        });

        it('returns a TableData object with 1 row when version data passed in', () => {
            const result = pkg.buildBasicTable([{
                id: null,
                name: 'package name',
                branch: null,
                version: 'version',
                installedBuildNumber: null,
                latestBuildNumber: null,
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
            expect(pkg.isSpecificVersion('1.0.0.LATEST')).equals(false);
        });

        it('returns TRUE when passed 1.0.0.13', () => {
            expect(pkg.isSpecificVersion('1.0.0.13')).equals(true);
        });
    });

    describe('buildPackageVersionArray', () => {

        describe('when response package info array parameter is null', () => {
            it('returns an empty array of type PackageVersion when first parameter is null', () => {
                const result = pkg.buildPackageVersionArray(null, null);
                expect(result).not.equals(null);
            });

            it('returns one element when project JSON has one dependency', () => {
                const result = pkg.buildPackageVersionArray([{ package: 'my_package', versionNumber: '1.0.0.LATEST' }], null);
                expect(result.length).equals(1);
                expect(result[0].name).equals('my_package');
                expect(result[0].version).equals('1.0.0.LATEST');
            });

            it('has version from alias when version aliases are used', () => {
                const result = pkg.buildPackageVersionArray(
                    [{ package: 'my_package', versionNumber: '1.0.0.1' },
                     { package: 'my_alias_versioned_package' }],
                    { my_package: '0Ho46' ,
                     'my_alias_versioned_package@1.0.0.2': '04t46' }
                    , null);
                expect(result.length).equals(2);
                expect(result[0].version).to.equal('1.0.0.1');
                expect(result[1].version).to.equal('1.0.0.2');
            });
        });

        describe('when both inputs parameters are populated', () => {
            it('result has additional parameters populated', () => {
                const result = pkg.buildPackageVersionArray([{ package: 'my_package', versionNumber: '1.0.0.LATEST' }],
                    null,
                    [{
                        SubscriberPackageVersionId: '04t11111',
                        Package2Name: 'my_package',
                        Version: '1.0.0.5',
                        BuildNumber: 5,
                        Branch: 'US123456',
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
                    }], { branch: 'US123456', released: null });
                expect(result[0].id).equals('04t11111');
                expect(result[0].latestVersion).equals('1.0.0.5');
                expect(result[0].branch).equals('US123456');
                expect(result[0].released).equals(false);
                expect(result[0].latestBuildNumber).to.equal(5);
            });

            it('result contains match on branch when specified', () => {
                const result = pkg.buildPackageVersionArray(
                    [{ package: 'my_package', versionNumber: '1.0.0.LATEST' }],
                    null,
                    [{
                        SubscriberPackageVersionId: '04t11111',
                        Package2Name: 'my_package',
                        Version: '1.0.0.5',
                        BuildNumber: 5,
                        Branch: 'US123456',
                        IsReleased: false,
                        CreatedDate: '2018-12-07 09:49'
                    },
                    {
                        SubscriberPackageVersionId: '04t222222',
                        Package2Name: 'my_package',
                        Version: '1.0.0.5',
                        BuildNumber: 1,
                        Branch: null,
                        IsReleased: true,
                        CreatedDate: '2018-12-07 09:49'
                    }], { branch: 'US123456', released: null });

                expect(result[0].id).equals('04t11111');
            });

            it('result contains match in case of specific version', () => {
                const result = pkg.buildPackageVersionArray(
                    [{ package: 'my_package', versionNumber: '1.0.0.2' }],
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

                expect(result[0].id).equals('04t22222');
            });

            it('result contains latest non-branch version if match on package branch not found', () => {

                const result = pkg.buildPackageVersionArray(
                    [{ package: 'my_package', versionNumber: '1.0.0.LATEST' }],
                    null,
                    [{
                        SubscriberPackageVersionId: '04t1',
                        Package2Name: 'my_package',
                        Version: '1.0.0.1',
                        BuildNumber: 1,
                        Branch: null,
                        IsReleased: false,
                        CreatedDate: '2018-12-01 09:49'
                    },
                    {
                        SubscriberPackageVersionId: '04t2',
                        Package2Name: 'my_package',
                        Version: '1.0.0.2',
                        BuildNumber: 2,
                        Branch: null,
                        IsReleased: false,
                        CreatedDate: '2018-12-02 09:49'
                    },
                    {
                        SubscriberPackageVersionId: '04t3',
                        Package2Name: 'my_other package',
                        Version: '1.0.1.1',
                        BuildNumber: 1,
                        Branch: null,
                        IsReleased: false,
                        CreatedDate: '2018-12-07 09:49'
                    }], { branch: 'Nonexistent_Branch', released: null });

                expect(result[0].id).to.equal('04t2');
            });

            it('throws error if specified version does not exist', () => {
                let errorMsg = '';
                try {
                    pkg.buildPackageVersionArray(
                        [{ package: 'my_package', versionNumber: '1.0.0.4' }],
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

                } catch (err) {
                    errorMsg = err.message;
                }

                expect(errorMsg).to.equal('Version 1.0.0.4 not found for package, my_package.');
            });

            it('throws error if no match found on specified version and branch', () => {
                let errorMsg = '';
                try {
                    pkg.buildPackageVersionArray(
                        [{ package: 'my_package', versionNumber: '1.0.0.3' }],
                        null,
                        [{
                            SubscriberPackageVersionId: '04t11111',
                            Package2Name: 'my_package',
                            Version: '1.0.0.1',
                            BuildNumber: 1,
                            Branch: 'Test_Branch',
                            IsReleased: false,
                            CreatedDate: '2018-12-07 09:49'
                        },
                        {
                            SubscriberPackageVersionId: '04t22222',
                            Package2Name: 'my_package',
                            Version: '1.0.0.2',
                            BuildNumber: 2,
                            Branch: 'Test_Branch',
                            IsReleased: false,
                            CreatedDate: '2018-12-07 09:49'
                        },
                        {
                            SubscriberPackageVersionId: '04t33333',
                            Package2Name: 'my_other package',
                            Version: '1.0.0.3',
                            BuildNumber: 1,
                            Branch: null,
                            IsReleased: false,
                            CreatedDate: '2018-12-07 09:49'
                        }], { branch: 'Test_Branch', released: null });

                } catch (err) {
                    errorMsg = err.message;
                }

                expect(errorMsg).to.equal('Version 1.0.0.3 not found for my_package branch: Test_Branch');
            });

            it('returns only released packages if --releasedonly flag is set', () => {

                const result = pkg.buildPackageVersionArray(
                    [{ package: 'first_package', versionNumber: '1.0.0.LATEST' },
                    { package: 'second_package', versionNumber: '1.0.1.LATEST' },
                    { package: 'third_package', versionNumber: '1.0.0.LATEST' }],
                    null,
                    [{
                        SubscriberPackageVersionId: '04t0',
                        Package2Name: 'first_package',
                        Version: '1.0.0.1',
                        BuildNumber: 1,
                        Branch: null,
                        IsReleased: true,
                        CreatedDate: '2018-12-01 09:49'
                    },
                    {
                        SubscriberPackageVersionId: '04t1',
                        Package2Name: 'first_package',
                        Version: '1.0.0.2',
                        BuildNumber: 2,
                        Branch: null,
                        IsReleased: false,
                        CreatedDate: '2018-12-03 09:49'
                    },
                    {
                        SubscriberPackageVersionId: '04t2',
                        Package2Name: 'second_package',
                        Version: '1.0.0.1',
                        BuildNumber: 1,
                        Branch: null,
                        IsReleased: false,
                        CreatedDate: '2018-09-07 10:00'
                    },
                    {
                        SubscriberPackageVersionId: '04t3',
                        Package2Name: 'third_package',
                        Version: '1.0.0.1',
                        BuildNumber: 1,
                        Branch: null,
                        IsReleased: true,
                        CreatedDate: '2018-10-03 13:45'
                    }], { branch: null, released: true });

                expect(result.length).to.equal(2);
                expect(result[0].id).to.equal('04t0');
                expect(result[1].id).to.equal('04t3');
            });

            it('returns only non-branched packages if --branch flag is not set', () => {

                const result = pkg.buildPackageVersionArray(
                    [{ package: 'first_package', versionNumber: '1.0.0.LATEST' },
                    { package: 'second_package', versionNumber: '1.0.1.LATEST' }],
                    null,
                    [{
                        SubscriberPackageVersionId: '04t0',
                        Package2Name: 'first_package',
                        Version: '1.0.0.1',
                        BuildNumber: 1,
                        Branch: null,
                        IsReleased: false,
                        CreatedDate: '2018-12-01 09:49'
                    },
                    {
                        SubscriberPackageVersionId: '04t1',
                        Package2Name: 'first_package',
                        Version: '1.0.0.2',
                        BuildNumber: 2,
                        Branch: null,
                        IsReleased: false,
                        CreatedDate: '2018-12-02 09:49'
                    },
                    {
                        SubscriberPackageVersionId: '04t2',
                        Package2Name: 'first_package',
                        Version: '1.0.0.3',
                        BuildNumber: 3,
                        Branch: null,
                        IsReleased: false,
                        CreatedDate: '2018-12-03 09:49'
                    },
                    {
                        SubscriberPackageVersionId: '04t3',
                        Package2Name: 'first_package',
                        Version: '1.0.0.12',
                        BuildNumber: 12,
                        Branch: 'mybranch',
                        IsReleased: false,
                        CreatedDate: '2018-12-04 09:49'
                    }
                    ]);

                expect(result.length).to.equal(1);
                expect(result[0].id).to.equal('04t2');
            });

            it('throws error if branch is set and released is TRUE', () => {
                let errorMsg = '';
                try {
                    pkg.buildPackageVersionArray(
                        [{ package: 'my_package', versionNumber: '1.0.0.LATEST' }],
                        null,
                        [{
                            SubscriberPackageVersionId: '04t11111',
                            Package2Name: 'my_package',
                            Version: '1.0.0.1',
                            BuildNumber: 1,
                            Branch: 'Test_Branch',
                            IsReleased: false,
                            CreatedDate: '2018-12-07 09:49'
                        }], { branch: 'Test_Branch', released: true });

                } catch (err) {
                    errorMsg = err.message;
                }

                expect(errorMsg).to.equal('Set either --branch or --released, but not both.');
            });

            it('uses version number from devhub package info rather than aliases section', () => {

                const aliases = JSON.parse(`{"first_package":"04t10",
                    "first_package@1.0.0-1":"04t11",
                    "first_package@1.0.0-2":"04t12",
                    "second_package":"04t20",
                    "second_package@1.0.0":"04t21"}`);

                const result = pkg.buildPackageVersionArray(
                    [{ package: 'first_package', versionNumber: '1.0.0.LATEST' },
                    { package: 'second_package', versionNumber: '1.0.1.LATEST' }],
                    aliases,
                    [{
                        SubscriberPackageVersionId: '04t10',
                        Package2Name: 'first_package',
                        Version: '1.0.0.0',
                        BuildNumber: 0,
                        Branch: null,
                        IsReleased: false,
                        CreatedDate: '2019-12-01 06:00'
                    },
                    {
                        SubscriberPackageVersionId: '04t11',
                        Package2Name: 'first_package',
                        Version: '1.0.0.1',
                        BuildNumber: 1,
                        Branch: null,
                        IsReleased: false,
                        CreatedDate: '2019-12-01 07:00'
                    },
                    {
                        SubscriberPackageVersionId: '04t12',
                        Package2Name: 'first_package',
                        Version: '1.0.0.2',
                        BuildNumber: 2,
                        Branch: null,
                        IsReleased: false,
                        CreatedDate: '2019-12-01 08:00'
                    },
                    {
                        SubscriberPackageVersionId: '04t20',
                        Package2Name: 'second_package',
                        Version: '1.0.0.0',
                        BuildNumber: 0,
                        Branch: null,
                        IsReleased: false,
                        CreatedDate: '2019-12-02 06:00'
                    },
                    {
                        SubscriberPackageVersionId: '04t21',
                        Package2Name: 'second_package',
                        Version: '1.0.0.1',
                        BuildNumber: 1,
                        Branch: null,
                        IsReleased: false,
                        CreatedDate: '2019-12-02 07:00'
                    }]
                );

                expect(result[0].latestVersion).to.equal('1.0.0.2');

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
        it('returns "Behind" in yellow when installed and latest version numbers don\'t match', () => {
            const result = pkg.computeInstalledStatus('1.0.0.11', '1.0.0.12');
            expect(result).to.equal(chalk.yellow('Behind'));
        });

        it('returns "Latest" in green when installed and latest version numbers match', () => {
            const result = pkg.computeInstalledStatus('1.0.0.12', '1.0.0.12');
            expect(result).to.equal(chalk.green('Latest'));
        });

        it('returns "Missing" in red when installed version number is undefined', () => {
            const result = pkg.computeInstalledStatus(undefined, '1.0.0.12');
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
