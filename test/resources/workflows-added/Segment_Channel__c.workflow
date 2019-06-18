<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>MSEExperiencedCancelledNotification</fullName>
        <description>MSEExperiencedCancelledNotification</description>
        <protected>false</protected>
        <recipients>
            <recipient>MSE_Business_Manager</recipient>
            <type>role</type>
        </recipients>
        <recipients>
            <recipient>MSE_Team</recipient>
            <type>role</type>
        </recipients>
        <recipients>
            <recipient>MSE_Team_Manager</recipient>
            <type>role</type>
        </recipients>
        <recipients>
            <recipient>MSE_Team_Member</recipient>
            <type>role</type>
        </recipients>
        <senderAddress>testuser@myorg.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>SampleProject_Support/MSE_ExperienceCancelledNotification</template>
    </alerts>
    <fieldUpdates>
        <fullName>Update_Mail_History_Id</fullName>
        <description>This WF field updates the mail history id field with Segment Id</description>
        <field>Mail_History_Id__c</field>
        <formula>Segment__r.Segment_Id__c</formula>
        <name>Update Mail History Id</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <rules>
        <fullName>Update Mail History Id</fullName>
        <actions>
            <name>Update_Mail_History_Id</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Segment__c.Segment_Id__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <criteriaItems>
            <field>Segment__c.Segment_Id__c</field>
            <operation>notEqual</operation>
            <value>null</value>
        </criteriaItems>
        <description>This rule does a field update on Segment Channel.</description>
        <triggerType>onCreateOnly</triggerType>
    </rules>
</Workflow>
