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
import * as consts from '../../src/shared/constants';
import * as org from '../../src/shared/orgUtil';

function getTestJsonPackageArray() {
    return [{ package: 'package1', versionNumber: '1.0.0.LATEST' },
    { package: 'package2', versionNumber: '1.0.0.LATEST' },
    { package: 'package3', versionNumber: '1.0.0.LATEST' }];
}

function getTestInstalledPackagesArray() {
    return [{
        Id: '0A3190000000n81CAA',
        SubscriberPackageId: '03330000000O0ndAAC',
        SubscriberPackageName: 'Knowledge Base Dashboards & Reports',
        SubscriberPackageNamespace: 'SK',
        SubscriberPackageVersionId: '04t30000000bqOuAAI',
        SubscriberPackageVersionName: 'Summer\'10',
        SubscriberPackageVersionNumber: '1.23.0.3'
    },
    {
        Id: '0A3190000000oSUCAY',
        SubscriberPackageId: '033460000004cF9AAI',
        SubscriberPackageName: 'package1',
        SubscriberPackageNamespace: null,
        SubscriberPackageVersionId: '04t1',
        SubscriberPackageVersionName: 'v1.0.0',
        SubscriberPackageVersionNumber: '1.0.0.3'
    },
    {
        Id: '0A3190000000oRHCAY',
        SubscriberPackageId: '033460000004cG7AAI',
        SubscriberPackageName: 'package2',
        SubscriberPackageNamespace: null,
        SubscriberPackageVersionId: '04t2',
        SubscriberPackageVersionName: 'v1.1.0',
        SubscriberPackageVersionNumber: '1.1.0.1'
    },
    {
        Id: '0A3190000000n80CAA',
        SubscriberPackageId: '03350000000DFFrAAO',
        SubscriberPackageName: 'Salesforce.com CRM Dashboards',
        SubscriberPackageNamespace: null,
        SubscriberPackageVersionId: '04t50000000EcdrAAC',
        SubscriberPackageVersionName: 'Summer 2011',
        SubscriberPackageVersionNumber: '1.0.0.1'
    }];
}

describe('---------- orgUtil UNIT ----------', () => {
    describe('buildOrderedUninstallArray', () => {

        it('returns an array of type PackageVersion[] with 2 elements', () => {
            const jsonPackageArr = getTestJsonPackageArray();
            const installedArr = getTestInstalledPackagesArray();
            const result = org.buildOrderedUninstallArray(jsonPackageArr, installedArr);
            expect(result.length).to.equal(2);
        });

        it('returned array is in the correct order to uninstall', () => {
            const jsonPackageArr = getTestJsonPackageArray();
            const installedArr = getTestInstalledPackagesArray();
            const result = org.buildOrderedUninstallArray(jsonPackageArr, installedArr);
            expect(result[0].id).to.equal('04t2');
            expect(result[1].id).to.equal('04t1');
        });
    });

    describe('parseEnvironmentFromUsername', () => {
        it ('parses the environment from the username successfully', () => {
            const result = org.parseEnvironmentFromUsername('test.username@myorg.com.uat');
            expect(result).to.equal('.uat');
        });

        it ('parses environment from fragment username successfully', () => {
            const result = org.parseEnvironmentFromUsername('.uat');
            expect(result).to.equal('.uat');
        });

        it ('prepends a period when none exists', () => {
            const result = org.parseEnvironmentFromUsername('envname');
            expect(result).to.equal('.envname');
        });
    });

    describe('isSandboxUsername', () => {
        it ('returns TRUE for sandbox username', () => {
            const result = org.isSandboxUsername('test.username@myorg.com.myenv');
            expect(result).to.equal(true);
        });

        it ('returns FALSE for scratch org username', () => {
            const result = org.isSandboxUsername('test-tgxymlyiqjqp@example.com');
            expect(result).to.equal(false);
        });
    });

    describe('getOrgTypeByAlias', () => {
        it ('returns "scratch" when org is a scratch org', () => {
            const orgListJson = JSON.parse(testOrgJson);
            const result = org.getOrgTypeByAlias('scratch1', orgListJson);
            expect(result).to.equal(consts.ORG_TYPE_SCRATCH);
        });

        it ('returns "sandbox" when org is a sandbox', () => {
            const orgListJson = JSON.parse(testOrgJson);
            const result = org.getOrgTypeByAlias('sbox1', orgListJson);
            expect(result).to.equal(consts.ORG_TYPE_SANDBOX);
        });

        it ('returns "devhub" when org is a dev hub org', () => {
            const orgListJson = JSON.parse(testOrgJson);
            const result = org.getOrgTypeByAlias('devhub', orgListJson);
            expect(result).to.equal(consts.ORG_TYPE_DEVHUB);
        });

        it ('returns "notfound" when alias does not exist', () => {
            const orgListJson = JSON.parse(testOrgJson);
            const result = org.getOrgTypeByAlias('bogusalias', orgListJson);
            expect(result).to.equal(consts.ORG_TYPE_NOTFOUND);
        });
    });

    describe('getOrgTypeByUsername', () => {
        it ('returns "scratch" when org is a scratch org', () => {
            const orgListJson = JSON.parse(testOrgJson);
            const result = org.getOrgTypeByUsername('test-8zxaqb3r4r2f@example.com', orgListJson);
            expect(result).to.equal(consts.ORG_TYPE_SCRATCH);
        });
    });
});

const testOrgJson = `{
    "status": 0,
    "result": {
        "nonScratchOrgs": [
            {
                "orgId": "00D0n0000000nG0EAI",
                "accessToken": "testaccesstoken",
                "instanceUrl": "https://the-app--test.cs67.my.salesforce.com",
                "loginUrl": "https://test.salesforce.com",
                "username": "testuser@myorg.com.sbox1",
                "clientId": "PlatformCLI",
                "connectedStatus": "Connected",
                "lastUsed": "2019-03-18T12:37:44.365Z",
                "alias": "sbox1"
            },
            {
                "orgId": "00D46000000bBqpEAE",
                "accessToken": "testaccesstoken",
                "instanceUrl": "https://the-app.my.salesforce.com",
                "loginUrl": "https://login.salesforce.com",
                "username": "testuser@myorg.com.devhub",
                "clientId": "SalesforceDevelopmentExperience",
                "isDevHub": true,
                "connectedStatus": "Connected",
                "lastUsed": "2019-03-18T12:37:46.460Z",
                "alias": "devhub",
                "isDefaultDevHubUsername": true,
                "defaultMarker": "(D)"
            },
            {
                "orgId": "00D0v0000009A5GEAU",
                "accessToken": "testaccesstoken ",
                "instanceUrl": "https://the-app--xfrom1.cs66.my.salesforce.com",
                "loginUrl": "https://test.salesforce.com",
                "username": "testuser@myorg.com.myproject.sbox2",
                "clientId": "PlatformCLI",
                "connectedStatus": "Connected",
                "lastUsed": "2019-03-18T12:37:45.214Z",
                "alias": "sbox2"
            }
        ],
        "scratchOrgs": [
            {
                "orgId": "00D3F0000001AhbUAE",
                "accessToken": "testaccesstoken",
                "instanceUrl": "https://saas-customization-9566.cs92.my.salesforce.com/",
                "loginUrl": "https://CS92.salesforce.com",
                "username": "test-8zxaqb3r4r2f@example.com",
                "password": "encryptedpassword",
                "clientId": "SalesforceDevelopmentExperience",
                "createdOrgInstance": "CS92",
                "created": 1552153876956,
                "devHubUsername": "testuser@myorg.com.devhub",
                "connectedStatus": "Unknown",
                "lastUsed": "2019-03-18T12:37:47.024Z",
                "alias": "scratch1",
                "attributes": {
                    "type": "ScratchOrgInfo",
                    "url": "/services/data/v45.0/sobjects/ScratchOrgInfo/2SR46000000LQKAGA4"
                },
                "orgName": "b_myapp_dx",
                "status": "Active",
                "createdBy": "testuser@myorg.com.devhub",
                "createdDate": "2019-03-09T17:49:36.000+0000",
                "expirationDate": "2019-04-08",
                "edition": null,
                "signupUsername": "test-8zxaqb3r4r2f@example.com",
                "devHubOrgId": "00D46000000bBqpEAE",
                "isExpired": false
            },
            {
                "orgId": "00D54000000DW08EAG",
                "accessToken": "testaccesstoken",
                "instanceUrl": "https://customization-data-9075.cs40.my.salesforce.com/",
                "loginUrl": "https://CS40.salesforce.com",
                "username": "test-ydh2viyyhe4c@example.com",
                "password": "encryptedpassword",
                "clientId": "SalesforceDevelopmentExperience",
                "createdOrgInstance": "CS40",
                "created": 1552681916815,
                "devHubUsername": "testuser@myorg.com.devhub",
                "connectedStatus": "Unknown",
                "lastUsed": "2019-03-18T12:37:46.539Z",
                "alias": "scratch2",
                "attributes": {
                    "type": "ScratchOrgInfo",
                    "url": "/services/data/v45.0/sobjects/ScratchOrgInfo/2SR46000000LQNnGAO"
                },
                "orgName": "b_myapp_dx",
                "status": "Active",
                "createdBy": "testuser@myorg.com.devhub",
                "createdDate": "2019-03-15T20:30:55.000+0000",
                "expirationDate": "2019-04-14",
                "edition": null,
                "signupUsername": "test-ydh2viyyhe4c@example.com",
                "devHubOrgId": "00D46000000bBqpEAE",
                "isExpired": false
            }
        ]
    }
}`;
