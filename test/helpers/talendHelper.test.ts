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
import { expect } from '@salesforce/command/lib/test';
import * as sinon from 'sinon';
import * as dh from '../../src/helpers/talendHelper';

describe('---------- talendHelper UNIT ----------', () => {

    describe('validateTargetOrg', () => {

        it('throws an error when attempting to push data to a restricted org', () => {
            let errorMsg = '';
            try {
                dh.validateTargetOrg(
                    {
                        orgType: 'Sandbox',
                        dataTypes: ['talendproject/a1_get_visibility_rules_0_1/a1_get_visibility_rules.class'],
                        instanceUrl: null,
                        jobType: dh.JobType.AdminDataPut,
                        sfUsername: 'test.username@myorg.com',
                        sfPassword: 'thepassword',
                        argValidator: null
                    }, ['test.username@myorg.com', 'test.username@myorg.com.uat']);

            } catch (err) {
                errorMsg = err.message;
            }

            expect(errorMsg).to.equal('Data updates to higher environments is not allowed.');
        });

        it('does not throw an error when username is not a restricted org', () => {
            let errorMsg = '';
            try {
                dh.validateTargetOrg(
                    {
                        orgType: 'Sandbox',
                        dataTypes: ['talendproject/a1_get_visibility_rules_0_1/a1_get_visibility_rules.class'],
                        instanceUrl: null,
                        jobType: dh.JobType.AdminDataPut,
                        sfUsername: 'test.username@myorg.com.dev',
                        sfPassword: 'thepassword',
                        argValidator: null
                    }, ['test.username@myorg.com', 'test.username@myorg.com.uat']);

            } catch (err) {
                errorMsg = err.message;
            }

            expect(errorMsg).to.equal('');
        });
    });

    describe('validateArgs', () => {

        it('throws an error if Job Type is invalid', async () => {

            let errorMsg = '';
            try {
                dh.validateArgs(
                    {
                        orgType: 'Sandbox',
                        dataTypes: ['talendproject/a1_get_visibility_rules_0_1/a1_get_visibility_rules.class'],
                        instanceUrl: null,
                        jobType: 'invalid',
                        sfUsername: 'john.doe@myorg.com.test',
                        sfPassword: 'thepassword',
                        argValidator: null
                    });

            } catch (err) {
                errorMsg = err.message;
            }

            expect(errorMsg).to.equal('Invalid job type: invalid');
        });

        it('throws an error if Job Type is missing', async () => {

            let errorMsg = '';
            try {
                dh.validateArgs(
                    {
                        orgType: 'Sandbox',
                        dataTypes: null,
                        instanceUrl: null,
                        jobType: null,
                        sfUsername: 'john.doe@myorg.com.test',
                        sfPassword: 'thepassword',
                        argValidator: null
                    });

            } catch (err) {
                errorMsg = err.message;
            }

            expect(errorMsg).to.equal('A valid job type or class path is required.');
        });

        it('throws an error if Data Type is missing', async () => {

            let errorMsg = '';
            try {
                dh.validateArgs(
                    {
                        orgType: 'Sandbox',
                        dataTypes: null,
                        instanceUrl: null,
                        jobType: dh.JobType.AdminDataGet,
                        sfUsername: 'john.doe@myorg.com.test',
                        sfPassword: 'thepassword',
                        argValidator: null
                    });

            } catch (err) {
                errorMsg = err.message;
            }

            expect(errorMsg).to.equal('A valid data type is required.');
        });

        it('throws an error if Username is missing', async () => {

            let errorMsg = '';
            try {
                dh.validateArgs(
                    {
                        orgType: 'Sandbox',
                        dataTypes: ['talendproject/a1_get_visibility_rules_0_1/a1_get_visibility_rules.class'],
                        instanceUrl: null,
                        jobType: dh.JobType.AdminDataDelete,
                        sfUsername: null,
                        sfPassword: 'thepassword',
                        argValidator: null
                    });

            } catch (err) {
                errorMsg = err.message;
            }

            expect(errorMsg).to.equal('A valid username is required.');
        });

        it('throws an error if Password is missing', async () => {

            let errorMsg = '';
            try {
                dh.validateArgs(
                    {
                        orgType: 'Sandbox',
                        dataTypes: ['talendproject/a1_get_visibility_rules_0_1/a1_get_visibility_rules.class'],
                        instanceUrl: null,
                        jobType: dh.JobType.AdminDataDelete,
                        sfUsername: 'john.doe@myorg.com.test',
                        sfPassword: null,
                        argValidator: null
                    });

            } catch (err) {
                errorMsg = err.message;
            }

            expect(errorMsg).to.equal('A valid password is required.');
        });

        it('throws an error if org type is Scratch Org and instance URL is missing.', () => {
            let errorMsg = '';
            try {
                dh.validateArgs(
                    {
                        orgType: dh.OrgType.ScratchOrg,
                        dataTypes: ['talendproject/a1_get_visibility_rules_0_1/a1_get_visibility_rules.class'],
                        instanceUrl: null,
                        jobType: dh.JobType.AdminDataDelete,
                        sfUsername: 'john.doe@myorg.com.test',
                        sfPassword: 'mypassword',
                        argValidator: null
                    });

            } catch (err) {
                errorMsg = err.message;
            }

            expect(errorMsg).to.equal('Instance URL is missing.');
        });

    });

    describe('buildTalendJarCommand', () => {

        it('calls validateArgs', () => {
            const argValidator = sinon.spy(dh.validateArgs);
            dh.buildTalendJarCommand(
                {
                    orgType: 'Sandbox',
                    dataTypes: ['talendproject/a1_get_visibility_rules_0_1/a1_get_visibility_rules.class'],
                    instanceUrl: null,
                    jobType: dh.JobType.AdminDataGet,
                    sfUsername: 'john.doe@myorg.com.test',
                    sfPassword: 'thepassword',
                    argValidator
                },
                {
                    proxySettings: {
                        httpProxyHost: 'myproxyhost',
                        httpProxyPort: '8888'
                    },
                    talendSettings: {
                        jarDir: '~/my_jar_dir',
                        jarDependenciesDir: '~/my_jar_dir/lib',
                        orgSetupDataClass: 'myorgsetupdataclass',
                        projectDir: '~/my_project_dir',
                        uberJar: 'talend.jar'
                    }
                });

            expect(argValidator.called).to.equal(true);
        });

        it('returns proper command given parameter combination 1', async () => {
            const result: string = dh.buildTalendJarCommand(
                {
                    orgType: 'Sandbox',
                    dataTypes: ['talendproject/a1_get_visibility_rules_0_1/a1_get_visibility_rules.class'],
                    instanceUrl: null,
                    jobType: dh.JobType.AdminDataGet,
                    sfUsername: 'john.doe@myorg.com.test',
                    sfPassword: 'thepassword',
                    argValidator: dh.validateArgs
                },
                {
                    proxySettings: {
                        httpProxyHost: 'myproxyhost',
                        httpProxyPort: '8888'
                    },
                    talendSettings: {
                        jarDir: '~/my_jar_dir',
                        jarDependenciesDir: '~/my_jar_dir/lib',
                        orgSetupDataClass: 'mysetupdataclass',
                        projectDir: '~/my_project_dir',
                        soapApiVersion: '44.0',
                        uberJar: 'talend.jar'
                    }
                });

            const expected = 'java -Dhttp.proxyPort=8888 -Dhttp.proxyHost=myproxyhost'
                + ' -cp "~/my_jar_dir/lib:~/my_jar_dir/talend.jar"'
                + ' talendproject.a1_get_visibility_rules_0_1.a1_get_visibility_rules'
                + ' --context_param projDir=~/my_project_dir/'
                + ' --context_param Salesforce_Suffix=.test'
                + ' --context_param Salesforce_UserName=john.doe@myorg.com.test'
                + ' --context_param Salesforce_Password="thepassword"';

            expect(result).to.equal(expected);
        });

        it('returns proper command given parameter combination 2', async () => {
            const result: string = dh.buildTalendJarCommand(
                {
                    orgType: 'Sandbox',
                    dataTypes: ['talendproject/b2_put_business_units_0_1/b2_put_business_units.class'],
                    jobType: dh.JobType.AdminDataPut,
                    instanceUrl: null,
                    sfUsername: 'john.doe@myorg.com.test',
                    sfPassword: 'thepassword',
                    argValidator: dh.validateArgs
                },
                {
                    proxySettings: {
                        httpProxyHost: 'myproxyhost',
                        httpProxyPort: '8888'
                    },
                    talendSettings: {
                        jarDir: '~/my_jar_dir',
                        jarDependenciesDir: '~/my_jar_dir/lib',
                        orgSetupDataClass: 'mysetupdataclass',
                        projectDir: '~/my_project_dir',
                        soapApiVersion: '44.0',
                        uberJar: 'talend.jar'
                    }
                });

            const expected = 'java -Dhttp.proxyPort=8888 -Dhttp.proxyHost=myproxyhost'
                + ' -cp "~/my_jar_dir/lib:~/my_jar_dir/talend.jar"'
                + ' talendproject.b2_put_business_units_0_1.b2_put_business_units'
                + ' --context_param projDir=~/my_project_dir/'
                + ' --context_param Salesforce_Suffix=.test'
                + ' --context_param Salesforce_UserName=john.doe@myorg.com.test'
                + ' --context_param Salesforce_Password="thepassword"';

            expect(result).to.equal(expected);
        });

        it('returns proper command for org setup data job', async () => {
            const result: string = dh.buildTalendJarCommand(
                {
                    orgType: null,
                    dataTypes: ['talendproject/zz6_scratch_admin_0_1/zz6_scratch_admin.class'],
                    jobType: dh.JobType.OrgSetupData,
                    instanceUrl: null,
                    sfUsername: 'john.doe@myorg.com.test',
                    sfPassword: 'thepassword',
                    argValidator: dh.validateArgs
                },
                {
                    proxySettings: {
                        httpProxyHost: 'myproxyhost',
                        httpProxyPort: '8888'
                    },
                    talendSettings: {
                        jarDir: '~/my_jar_dir',
                        jarDependenciesDir: '~/my_jar_dir/lib',
                        orgSetupDataClass: 'mysetupdataclass',
                        projectDir: '~/my_project_dir',
                        soapApiVersion: '44.0',
                        uberJar: 'talend.jar'
                    }
                });

            const expected = 'java -Dhttp.proxyPort=8888 -Dhttp.proxyHost=myproxyhost'
                + ' -cp "~/my_jar_dir/lib:~/my_jar_dir/talend.jar"'
                + ' talendproject.zz6_scratch_admin_0_1.zz6_scratch_admin'
                + ' --context_param projDir=~/my_project_dir/'
                + ' --context_param Salesforce_Suffix=.test'
                + ' --context_param Salesforce_UserName=john.doe@myorg.com.test'
                + ' --context_param Salesforce_Password="thepassword"';

            expect(result).to.equal(expected);
        });

        it('ensures no duplicate path separators exist', async () => {
            const result: string = dh.buildTalendJarCommand(
                {
                    orgType: 'Sandbox',
                    dataTypes: ['talendproject/a1_get_visibility_rules_0_1/a1_get_visibility_rules.class'],
                    instanceUrl: null,
                    jobType: dh.JobType.AdminDataGet,
                    sfUsername: 'john.doe@myorg.com.test',
                    sfPassword: 'thepassword',
                    argValidator: dh.validateArgs
                },
                {
                    proxySettings: {
                        httpProxyHost: 'myproxyhost',
                        httpProxyPort: '8888'
                    },
                    talendSettings: {
                        jarDir: '~/my_jar_dir',
                        jarDependenciesDir: '~/my_jar_dir//lib/',
                        orgSetupDataClass: 'mysetupdataclass',
                        projectDir: '~/my_project_dir',
                        soapApiVersion: '44.0',
                        uberJar: 'talend.jar'
                    }
                });

            const expected = 'java -Dhttp.proxyPort=8888 -Dhttp.proxyHost=myproxyhost'
                + ' -cp "~/my_jar_dir/lib/:~/my_jar_dir/talend.jar"'
                + ' talendproject.a1_get_visibility_rules_0_1.a1_get_visibility_rules'
                + ' --context_param projDir=~/my_project_dir/'
                + ' --context_param Salesforce_Suffix=.test'
                + ' --context_param Salesforce_UserName=john.doe@myorg.com.test'
                + ' --context_param Salesforce_Password="thepassword"';

            expect(result).to.equal(expected);
        });

        it('returns proper command for Scratch Org', async () => {
            const result: string = dh.buildTalendJarCommand(
                {
                    orgType: 'Scratch Org',
                    dataTypes: ['talendproject/a1_get_visibility_rules_0_1/a1_get_visibility_rules.class'],
                    instanceUrl: 'https://myinstanceurl/',
                    jobType: dh.JobType.AdminDataGet,
                    sfUsername: 'test-rx8wcrtv7ebz@example.com',
                    sfPassword: 'thepassword',
                    argValidator: dh.validateArgs
                },
                {
                    proxySettings: {
                        httpProxyHost: 'myproxyhost',
                        httpProxyPort: '8888'
                    },
                    talendSettings: {
                        jarDir: '~/my_jar_dir',
                        jarDependenciesDir: '~/my_jar_dir/lib',
                        orgSetupDataClass: 'mysetupdataclass',
                        projectDir: '~/my_project_dir',
                        soapApiVersion: '44.0',
                        uberJar: 'talend.jar'
                    }
                });

            const expected = 'java -Dhttp.proxyPort=8888 -Dhttp.proxyHost=myproxyhost'
                + ' -cp "~/my_jar_dir/lib:~/my_jar_dir/talend.jar"'
                + ' talendproject.a1_get_visibility_rules_0_1.a1_get_visibility_rules'
                + ' --context_param projDir=~/my_project_dir/'
                + ' --context_param Salesforce_WebServiceUrl=https://myinstanceurl/services/Soap/u/44.0'
                + ' --context_param Salesforce_Suffix=.scratch'
                + ' --context_param Salesforce_UserName=test-rx8wcrtv7ebz@example.com'
                + ' --context_param Salesforce_Password="thepassword"';

            expect(result).to.equal(expected);
        });

        it('ensures instanceUrl has no duplicate path separators', async () => {
            const result: string = dh.buildTalendJarCommand(
                {
                    orgType: 'Scratch Org',
                    dataTypes: ['talendproject/a1_get_visibility_rules_0_1/a1_get_visibility_rules.class'],
                    instanceUrl: 'https://myinstance/url/',
                    jobType: dh.JobType.AdminDataGet,
                    sfUsername: 'test-rx8wcrtv7ebz@example.com',
                    sfPassword: 'thepassword',
                    argValidator: dh.validateArgs
                },
                {
                    proxySettings: {
                        httpProxyHost: 'myproxyhost',
                        httpProxyPort: '8888'
                    },
                    talendSettings: {
                        jarDir: '~/my_jar_dir',
                        jarDependenciesDir: '~/my_jar_dir/lib',
                        orgSetupDataClass: 'myorgsetupdataclass',
                        projectDir: '~/my_project_dir',
                        soapApiVersion: '44.0',
                        uberJar: 'talend.jar'
                    }
                });

            const expected = 'java -Dhttp.proxyPort=8888 -Dhttp.proxyHost=myproxyhost'
                + ' -cp "~/my_jar_dir/lib:~/my_jar_dir/talend.jar"'
                + ' talendproject.a1_get_visibility_rules_0_1.a1_get_visibility_rules'
                + ' --context_param projDir=~/my_project_dir/'
                + ' --context_param Salesforce_WebServiceUrl=https://myinstance/url/services/Soap/u/44.0'
                + ' --context_param Salesforce_Suffix=.scratch'
                + ' --context_param Salesforce_UserName=test-rx8wcrtv7ebz@example.com'
                + ' --context_param Salesforce_Password="thepassword"';

            expect(result).to.equal(expected);
        });

        it('ensures trailing separator added to project directory if missing', async () => {
            const result: string = dh.buildTalendJarCommand(
                {
                    orgType: 'Sandbox',
                    dataTypes: ['talendproject/a1_get_visibility_rules_0_1/a1_get_visibility_rules.class'],
                    instanceUrl: null,
                    jobType: dh.JobType.AdminDataGet,
                    sfUsername: 'john.doe@myorg.com.test',
                    sfPassword: 'thepassword',
                    argValidator: dh.validateArgs
                },
                {
                    proxySettings: {
                        httpProxyHost: 'myproxyhost',
                        httpProxyPort: '8888'
                    },
                    talendSettings: {
                        jarDir: '~/my_jar_dir/',
                        jarDependenciesDir: '~/my_jar_dir//lib/',
                        orgSetupDataClass: 'myorgsetupdataclass',
                        projectDir: '~/my_project_dir',
                        soapApiVersion: '44.0',
                        uberJar: 'talend.jar'
                    }
                });

            const expected = 'java -Dhttp.proxyPort=8888 -Dhttp.proxyHost=myproxyhost'
                + ' -cp "~/my_jar_dir/lib/:~/my_jar_dir/talend.jar"'
                + ' talendproject.a1_get_visibility_rules_0_1.a1_get_visibility_rules'
                + ' --context_param projDir=~/my_project_dir/'
                + ' --context_param Salesforce_Suffix=.test'
                + ' --context_param Salesforce_UserName=john.doe@myorg.com.test'
                + ' --context_param Salesforce_Password="thepassword"';

            expect(result).to.equal(expected);
        });

        it('throws an error if soapApiVersion not configured when orgType is Scratch Org.', () => {
            let errorMsg = '';
            try {
                dh.buildTalendJarCommand(
                    {
                        orgType: 'Scratch Org',
                        dataTypes: ['talendproject/a1_get_visibility_rules_0_1/a1_get_visibility_rules.class'],
                        instanceUrl: 'https://myinstanceurl',
                        jobType: dh.JobType.AdminDataGet,
                        sfUsername: 'test-rx8wcrtv7ebz@example.com',
                        sfPassword: 'thepassword',
                        argValidator: dh.validateArgs
                    },
                    {
                        proxySettings: {
                            httpProxyHost: 'myproxyhost',
                            httpProxyPort: '8888'
                        },
                        talendSettings: {
                            jarDir: '~/my_jar_dir',
                            jarDependenciesDir: '~/my_jar_dir/lib',
                            uberJar: 'talend.jar',
                            orgSetupDataClass: 'myclass',
                            projectDir: '~/my_project_dir'
                        }
                    });

            } catch (err) {
                errorMsg = err.message;
            }

            expect(errorMsg).to.equal('Missing Talend setting: soapApiVersion');

        });

        it('throws an error if orgSetupDataClass not configured.', () => {
            let errorMsg = '';
            try {
                dh.buildTalendJarCommand(
                    {
                        orgType: 'Sandbox',
                        dataTypes: ['talendproject/a1_get_visibility_rules_0_1/a1_get_visibility_rules.class'],
                        instanceUrl: 'https://myinstanceurl',
                        jobType: dh.JobType.AdminDataGet,
                        sfUsername: 'test-rx8wcrtv7ebz@example.com',
                        sfPassword: 'thepassword',
                        argValidator: dh.validateArgs
                    },
                    {
                        proxySettings: {
                            httpProxyHost: 'myproxyhost',
                            httpProxyPort: '8888'
                        },
                        talendSettings: {
                            jarDir: '~/my_jar_dir',
                            jarDependenciesDir: '~/my_jar_dir/lib',
                            soapApiVersion: '44.0',
                            uberJar: 'talend.jar',
                            projectDir: '~/my_project_dir'
                        }
                    });

            } catch (err) {
                errorMsg = err.message;
            }

            expect(errorMsg).to.equal('Missing Talend setting: orgSetupDataClass');

        });
    });

    describe('dh.buildStatusString', () => {

        it('returns correct in-progress message for Get', () => {
            const result = dh.buildStatusString({
                orgType: 'Sandbox',
                dataTypes: null,
                instanceUrl: null,
                jobType: dh.JobType.AdminDataGet,
                sfUsername: 'john.doe@myorg.com.test',
                sfPassword: 'thepassword',
                argValidator: null
            },
                {
                    proxySettings: {
                        httpProxyHost: 'myproxyhost',
                        httpProxyPort: '8888'
                    },
                    talendSettings: {
                        jarDir: '~/my_jar_dir',
                        jarDependenciesDir: '~/my_jar_dir/lib',
                        uberJar: 'talend.jar',
                        projectDir: '~/my_project_dir'
                    }
                });
            expect(result).to.equal('Retrieving data into ~/my_project_dir folder');
        });

        it('returns correct in-progress message for Put', () => {
            const result = dh.buildStatusString({
                orgType: 'Sandbox',
                dataTypes: null,
                instanceUrl: null,
                jobType: 'put',
                sfUsername: 'john.doe@myorg.com.test',
                sfPassword: 'thepassword',
                argValidator: null
            },
                {
                    proxySettings: {
                        httpProxyHost: 'myproxyhost',
                        httpProxyPort: '8888'
                    },
                    talendSettings: {
                        jarDir: '~/my_jar_dir',
                        jarDependenciesDir: '~/my_jar_dir/lib',
                        uberJar: 'talend.jar',
                        projectDir: '~/my_project_dir'
                    }
                });
            expect(result).to.equal('Pushing data from ~/my_project_dir folder');
        });

        it('returns correct in-progress message for Delete', () => {
            const result = dh.buildStatusString({
                orgType: 'Sandbox',
                dataTypes: null,
                instanceUrl: null,
                jobType: 'delete',
                sfUsername: 'john.doe@myorg.com.test',
                sfPassword: 'thepassword',
                argValidator: null
            },
                {
                    proxySettings: {
                        httpProxyHost: 'myproxyhost',
                        httpProxyPort: '8888'
                    },
                    talendSettings: {
                        jarDir: '~/my_jar_dir',
                        jarDependenciesDir: '~/my_jar_dir/lib',
                        uberJar: 'talend.jar',
                        projectDir: '~/my_project_dir'
                    }
                });
            expect(result).to.equal('Deleting data from john.doe@myorg.com.test');
        });
    });

    describe('buildAdminDataClassArray', () => {
        it('returns an array of Data Type name value pairs filtered by job type', () => {

            const result = dh.buildAdminDataClassArray(['talendproject/a1_get_visibility_rules_0_1/a1_get_visibility_rules.class',
                'talendproject/a2_put_visibility_rules_0_1/a2_put_visibility_rules.class',
                'talendproject/b1_get_business_units_0_1/b1_get_business_units.class',
                'talendproject/b2_put_business_units_0_1/b2_put_business_units.class',
                'talendproject/c1_get_channels_0_1/c1_get_channels.class',
                'talendproject/c2_put_channels_0_1/c2_put_channels.class',
                'talendproject/zz1_get_recordtypes_0_1/zz1_get_recordtypes.class',
                'talendproject/zz6_scratch_admin_0_1/zz6_scratch_admin.class'], dh.JobType.AdminDataGet);

            expect(result.length).to.equal(3);
            expect(result[0].name).to.equal('Visibility Rules');
            expect(result[1].name).to.equal('Business Units');
            expect(result[2].name).to.equal('Channels');
            expect(result[2].value).to.equal('talendproject/c1_get_channels_0_1/c1_get_channels.class');
        });
    });

    describe('filterClassPathsByName', () => {
        it('returns an array with the configured class when job type is "OrgSetupData"', () => {

            const orgSetupDataClassName = 'zz6_scratch_admin';

            const result = dh.filterClassPathsByName(['talendproject/a1_get_visibility_rules_0_1/a1_get_visibility_rules.class',
                'talendproject/a2_put_visibility_rules_0_1/a2_put_visibility_rules.class',
                'talendproject/b1_get_business_units_0_1/b1_get_business_units.class',
                'talendproject/b2_put_business_units_0_1/b2_put_business_units.class',
                'talendproject/c1_get_channels_0_1/c1_get_channels.class',
                'talendproject/c2_put_channels_0_1/c2_put_channels.class',
                'talendproject/zz1_get_recordtypes_0_1/zz1_get_recordtypes.class',
                'talendproject/zz6_scratch_admin_0_1/zz6_scratch_admin.class'], orgSetupDataClassName);

            expect(result).to.equal('talendproject/zz6_scratch_admin_0_1/zz6_scratch_admin.class');
        });
    });

    describe('buildOrgTypeArray', () => {

        it('returns array of Org Type name value pairs', () => {

            const result = dh.buildOrgTypeArray();
            expect(result.length).to.equal(2);
            expect(result[1].name).to.equal('Scratch Org');
            expect(result[1].value).to.equal('Scratch Org');
        });
    });

    describe('toDataTypeDisplayName', () => {
        it('returns correct price code display name', () => {
            const result = dh.toDataTypeDisplayName('talendproject/l1_get_price_code_data_0_1/l1_get_price_code_data.class', dh.JobType.AdminDataGet);
            expect(result).to.equal('Price Code Data');
        });
    });
});
