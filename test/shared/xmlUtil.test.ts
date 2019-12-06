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
import * as fs from 'fs';
import * as sinon from 'sinon';
import * as fileUtil from '../../src/shared/fileUtil';
import { SourceMember } from '../../src/shared/sourceUtil';
import { XmlMergeResult } from '../../src/shared/xmlUtil';
import * as xmlUtil from '../../src/shared/xmlUtil';

describe('---------- xmlUtil UNIT ----------', () => {
    describe('mergeSourceMembersToXml', () => {

        let testSourceMembers: SourceMember[];

        before('create test sourceMembers', () => {
            const sourceMembers = new Array();
            sourceMembers.push({
                IsNameObsolete: true,
                MemberName: 'ApplicationLogTestData',
                MemberType: 'ApexClass',
                MemberId: null
            });
            sourceMembers.push({
                IsNameObsolete: true,
                MemberName: 'CustomObjectA.FieldOne',
                MemberType: 'CustomField',
                MemberId: null
            });
            sourceMembers.push({
                IsNameObsolete: true,
                MemberName: 'CustomObjectA.FieldTwo',
                MemberType: 'CustomField',
                MemberId: null
            });
            sourceMembers.push({
                IsNameObsolete: true,
                MemberName: 'MyWorkflow',
                MemberType: 'Workflow',
                MemberId: null
            });
            testSourceMembers = sourceMembers;
        });

        it('result has a memberTypes property', async () => {

            const sourceMembers: SourceMember[] = testSourceMembers;
            const result: XmlMergeResult = await xmlUtil.mergeSourceMembersToXml(
                'test/resources/destructive/testdestructive1.xml', sourceMembers);

            expect(result).has.ownProperty('memberTypes');
        });

        it('result memberTypes property has 3 total unique types', async () => {

            const sourceMembers: SourceMember[] = testSourceMembers;
            const result: XmlMergeResult = await xmlUtil.mergeSourceMembersToXml(
                'test/resources/destructive/testdestructive1.xml', sourceMembers);

            expect(result.memberTypes).has.lengthOf(3);
        });

        it('result sourceMembers property contains 6 total unique members', async () => {

            const sourceMembers: SourceMember[] = testSourceMembers;
            const result: XmlMergeResult = await xmlUtil.mergeSourceMembersToXml(
                'test/resources/destructive/testdestructive1.xml', sourceMembers);

            expect(result.sourceMembers).has.lengthOf(6);
        });
    });

    describe('mergeXmlFiles', () => {

        it('result has a memberTypes property', async () => {
            const result: XmlMergeResult = await xmlUtil.mergeXmlFiles(
                'test/resources/destructive/testdestructive1.xml', 'test/resources/destructive/testdestructive2.xml');

            expect(result).has.ownProperty('memberTypes');
        });

        it('result memberTypes property has 3 total unique types', async () => {
            const result: XmlMergeResult = await xmlUtil.mergeXmlFiles(
                'test/resources/destructive/testdestructive1.xml', 'test/resources/destructive/testdestructive2.xml');

            expect(result.memberTypes).has.lengthOf(3);
        });

        it('result sourceMembers property contains 6 total unique members', async () => {
            const result: XmlMergeResult = await xmlUtil.mergeXmlFiles(
                'test/resources/destructive/testdestructive1.xml', 'test/resources/destructive/testdestructive2.xml');

            expect(result.sourceMembers).has.lengthOf(6);
        });
    });

    describe('sourceMembersToXML', () => {

        it('returns correct XML string', async () => {
            const sourceMembers: SourceMember[] = new Array();
            sourceMembers.push({
                IsNameObsolete: true,
                MemberName: 'MyClass1',
                MemberType: 'ApexClass',
                MemberId: null
            });
            sourceMembers.push({
                IsNameObsolete: true,
                MemberName: 'MyClass2',
                MemberType: 'ApexClass',
                MemberId: null
            });
            sourceMembers.push({
                IsNameObsolete: true,
                MemberName: 'MyObject.My_Custom_Field__c',
                MemberType: 'CustomField',
                MemberId: null
            });
            const result: string = await xmlUtil.sourceMembersToXML(sourceMembers);

            expect(result).to.equal(expectedXML, 'XML is wrong.');
        });
    });

    describe('findOrgWideEmailAlerts', () => {
        let result;
        before ('call the method', () => {
            result = xmlUtil.findOrgWideEmailAlerts(testWorkflowXml);
        });

        it ('finds 2 test records', () => {
            expect(result.length).to.equal(2);
        });

        it ('returns an array with correct data values', () => {
            expect(result[0].fullName).to.equal('CGT_team_member');
            expect(result[0].senderAddress).to.equal('testuser@myorg.com');
            expect(result[1].fullName).to.equal('MSE_Member_to_case_assignment');
            expect(result[1].senderAddress).to.equal('testuser@myorg.com');
        });
    });

    describe('findComponentNames', () => {
        let result;
        before ('call the method', () => {
            result = xmlUtil.findComponentNames('Workflow/alerts', testWorkflowXml);
        });

        it ('finds 5 test records', () => {
            expect(result.length).to.equal(5);
        });

        it ('first result is Band_35_Case_Approval', () => {
            expect(result[0]).to.equal('Band_35_Case_Approval');
        });

        it('last result is MSE_Member_to_case_assignment', () => {
            expect(result[4]).to.equal('MSE_Member_to_case_assignment');
        });
    });

    describe('findNodes', () => {
        let result;
        before ('call the method', () => {
            result = xmlUtil.findNodes('Workflow/alerts/fullName', testWorkflowXml);
        });

        it ('finds 5 test records', () => {
            expect(result.length).to.equal(5);
        });

        it ('first full name is Band_35_Case_Approval', () => {
            expect(result[0].textContent).to.equal('Band_35_Case_Approval');
        });

        it('last full name is MSE_Member_to_case_assignment', () => {
            expect(result[4].textContent).to.equal('MSE_Member_to_case_assignment');
        });
    });

    describe('transform', () => {

        let readXmlStub; // Stub of fileUtil.readXml that returns test XML
        let readdirSyncStub; // Stub of fs.readdirSync that returns test file names
        let writeFileStub; // stub of fs.writeFile
        beforeEach('set mocking before each call', () => {
            readXmlStub = sinon.stub(fileUtil, 'readXml');
            readXmlStub.returns(testAdminProfileXml);
            readdirSyncStub = sinon.stub(fs, 'readdirSync');
            readdirSyncStub.returns(['a.xml', 'b.xml', 'c.xml']);
            writeFileStub = sinon.stub(fs, 'writeFile');
        });

        afterEach('restore sinon', () => {
            readXmlStub.restore();
            readdirSyncStub.restore();
            writeFileStub.restore();
        });

        it ('throws error when operation is invalid', async () => {
            const transformProps: xmlUtil.XmlTransform = {
                title: 'my transform title',
                operation: 'someInvalidOperation',
                pattern: '**/profiles/*.profile-meta.xml',
                nodeName: 'userPermissions',
                isActive: true
            };

            let errorMsg = '';
            try {
                await xmlUtil.transform(transformProps);
            } catch (err) {
                errorMsg = err.message;
            }
            expect(errorMsg).to.equal('Invalid operation: "someInvalidOperation"');
        });

        it ('calls xmlUtil.removeElements when operation is removeElements', () => {

            const spy = sinon.spy(xmlUtil, 'removeElements');

            const transformProps: xmlUtil.XmlTransform = {
                title: 'my transform title',
                operation: 'removeElements',
                pattern: 'test/resources/profiles/*',
                nodeName: 'userPermissions',
                isActive: true
            };
            xmlUtil.transform(transformProps);
            expect(spy.called).to.equal(true);

            spy.restore();
        });

        it ('calls fileUtil.readXml with profiles directory as argument when pattern matches "profile"', async () => {

            const transformProps: xmlUtil.XmlTransform = {
                title: 'my transform title',
                operation: 'removeElements',
                pattern: 'test/resources/profiles/Admin.profile-meta.xml',
                nodeName: 'userPermissions',
                isActive: true
            };
            xmlUtil.transform(transformProps);
            expect(readXmlStub.calledWith('test/resources/profiles/Admin.profile-meta.xml')).to.equal(true);
        });
    });

    describe('removeElements', () => {

        it ('removes the userPermissions elements when elementName is "userPermissions"', async () => {
            const result = await xmlUtil.removeElements('userPermissions', testAdminProfileXml);
            const newJson = result.transformedJson;
            expect(newJson.Profile.userPermissions).to.equal(undefined); // removed
            expect(newJson.Profile.applicationVisibilities).not.to.equal(undefined); // not removed
            expect(newJson.Profile.classAccesses).not.to.equal(undefined); // not removed
        });

        it ('removes the classAccesses elements when elementName is "classAccesses"', async () => {

            const result = await xmlUtil.removeElements('classAccesses', testAdminProfileXml);
            const newJson = result.transformedJson;
            expect(newJson.Profile.classAccesses).to.equal(undefined); // removed
        });

        it ('removes an element 3 levels deep', async () => {
            const result = await xmlUtil.removeElements('recipients', testWorkflowXml, 3);
            const newXml = result.transformedXml;
            expect(newXml).not.to.contain('<recipients>'); // removed
        });

        it ('does not remove an element 3 levels deep if max depth is 2', async () => {
            const result = await xmlUtil.removeElements('recipients', testWorkflowXml, 2);
            const newXml = result.transformedXml;
            expect(newXml).to.contain('<recipients>'); // not removed
        });

        it ('change count is 1 if removals occurred', async () => {
            const result = await xmlUtil.removeElements('userPermissions', testAdminProfileXml, 1);
            expect(result.changeCount).to.equal(1);
        });

        it ('change count 0 if no removals occured', async () => {
            const result = await xmlUtil.removeElements('nonexistentElement', testAdminProfileXml, 1);
            expect(result.changeCount).to.equal(0);
        });
    });
});

const expectedXML: string =
    `<Package xmlns="http://soap.sforce.com/2006/04/metadata">
  <types>
    <member>MyClass1</member>
    <member>MyClass2</member>
    <name>ApexClass</name>
  </types>
  <types>
    <member>MyObject.My_Custom_Field__c</member>
    <name>CustomField</name>
  </types>
</Package>
`;

const testWorkflowXml: string = `<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>Band_35_Case_Approval</fullName>
        <description>Band 35 Case Approval</description>
        <protected>false</protected>
        <recipients>
            <recipient>MSE_Business_Manager</recipient>
            <type>role</type>
        </recipients>
        <recipients>
            <recipient>MSE_Team_Manager</recipient>
            <type>role</type>
        </recipients>
        <recipients>
            <field>Case_Submitted_By__c</field>
            <type>userLookup</type>
        </recipients>
        <recipients>
            <field>MSE_Reviewer__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>MSE_Request_Email_Templates/Band_35_Case_Approval</template>
    </alerts>
    <alerts>
        <fullName>Band_35_Case_Update_Request</fullName>
        <description>Band 35 Case Update Request</description>
        <protected>false</protected>
        <recipients>
            <field>Case_Submitted_By__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>MSE_Request_Email_Templates/Band_35_Case_Update_Request</template>
    </alerts>
    <alerts>
        <fullName>CGT_team_member</fullName>
        <description>CGT team member</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderAddress>testuser@myorg.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>MSE_Request_Email_Templates/CGT_Team_Member_Notification</template>
    </alerts>
    <alerts>
        <fullName>CRC_Case_COVE_Screenshot_Upload_Charge</fullName>
        <description>CRC Case - COVE Screenshot Upload (Charge)</description>
        <protected>false</protected>
        <recipients>
            <recipient>BR_Team_Charge</recipient>
            <type>group</type>
        </recipients>
        <recipients>
            <recipient>Escalation_CGT</recipient>
            <type>group</type>
        </recipients>
        <recipients>
            <field>Primary_Requestor__c</field>
            <type>userLookup</type>
        </recipients>
        <recipients>
            <field>Secondary_Requestor__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>CRC_Request_Email_Templates/CRC_Case_COVE_Screenshots_Uploaded</template>
    </alerts>
    <alerts>
        <fullName>MSE_Member_to_case_assignment</fullName>
        <description>Trigger An email when Case with MSE record type has been assigned or reassigned to member in a queue</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderAddress>testuser@myorg.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Re_Assigned_to_MSE</template>
    </alerts>
</Workflow>
`;

const testAdminProfileXml: string = `<?xml version="1.0" encoding="UTF-8"?>
<Profile xmlns="http://soap.sforce.com/2006/04/metadata">
    <applicationVisibilities>
        <application>Service_Cloud_Console</application>
        <default>true</default>
        <visible>true</visible>
    </applicationVisibilities>
    <classAccesses>
        <apexClass>AEMCalloutCustomMetadataDao</apexClass>
        <enabled>true</enabled>
    </classAccesses>
    <userPermissions>
        <enabled>true</enabled>
        <name>ActivateContract</name>
    </userPermissions>
    <userPermissions>
        <enabled>true</enabled>
        <name>ActivateOrder</name>
    </userPermissions>
</Profile>
`;
