<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>Communication_Cancelled_Pre_QC</fullName>
        <description>Communication Cancelled Pre-QC</description>
        <protected>false</protected>
        <recipients>
            <field>Primary_Contact__c</field>
            <type>userLookup</type>
        </recipients>
        <recipients>
            <field>Secondary_Contact__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>DefaultWorkflowUser</senderType>
        <template>unfiled$public/CancelledCommunicationPreQC</template>
    </alerts>
    <alerts>
        <fullName>DME_team_email_notification</fullName>
        <description>Email to notify DME team when channel initiate is customer PM or customer DM when channel is inserted</description>
        <protected>false</protected>
        <recipients>
            <recipient>DME_Team</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/DME_team_Channel_Initiate_Request_Notification</template>
    </alerts>
    <alerts>
        <fullName>Campaign_Channel_Revision_Required</fullName>
        <description>Campaign Channel Revision Required</description>
        <protected>false</protected>
        <recipients>
            <recipient>Email_Channel_Team</recipient>
            <type>role</type>
        </recipients>
        <recipients>
            <field>Primary_Contact__c</field>
            <type>userLookup</type>
        </recipients>
        <recipients>
            <field>Secondary_Contact__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/Email_Channel_revision_required</template>
    </alerts>
    <alerts>
        <fullName>Campaign_Channel_DME_Notification_for_creative_submission</fullName>
        <ccEmails>ccemails@myorg.com</ccEmails>
        <description>Campaign Channel - DME Notification for creative submission</description>
        <protected>false</protected>
        <senderAddress>testuser@myorg.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>unfiled$public/Creative_DME_Notification_for_creative_submission</template>
    </alerts>
    <alerts>
        <fullName>Email_Prospect_DM_Attachment_Added_to_CMT</fullName>
        <description>Email Prospect DM Attachment Added to CMT</description>
        <protected>false</protected>
        <recipients>
            <recipient>Campaign_Management_Team</recipient>
            <type>group</type>
        </recipients>
        <senderType>DefaultWorkflowUser</senderType>
        <template>unfiled$public/Prospect_DM_Attachment_Added_to_CMT</template>
    </alerts>
    <fieldUpdates>
        <fullName>Clear_Cancelled_POID</fullName>
        <description>Sets the value in Cancelled_POID to null</description>
        <field>Cancelled_POID__c</field>
        <name>Clear Cancelled POID</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Null</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Set_Direct_Mail_Record_Type</fullName>
        <field>RecordTypeId</field>
        <lookupValue>Direct_Mail</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Set Direct Mail Record Type</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Set_Prospect_DM_Record_type</fullName>
        <field>RecordTypeId</field>
        <lookupValue>Prospect_DM</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Set Prospect DM Record type</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Status_Change</fullName>
        <field>Channel_Status__c</field>
        <literalValue>In Progress</literalValue>
        <name>Status Change</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_record_type_to_Email_Approval</fullName>
        <description>Update the record type to Email Approval</description>
        <field>RecordTypeId</field>
        <lookupValue>Email_Approval</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Update record type to Email Approval</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_record_type_to_Email_Approved</fullName>
        <description>Changes the record type to Email Approved</description>
        <field>RecordTypeId</field>
        <lookupValue>Email_Approved</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Update record type to Email Approved</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_record_type</fullName>
        <description>Update to MSE Request record type</description>
        <field>RecordTypeId</field>
        <lookupValue>MSE_Request</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Update record type</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_record_type_to_Email_Draft</fullName>
        <description>Updates the campaign channel record type to Email Draft</description>
        <field>RecordTypeId</field>
        <lookupValue>Email_Draft</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Update record type to Email Draft</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_record_type_to_Email_QC</fullName>
        <description>Changes the record type to Email QC on campaign channel</description>
        <field>RecordTypeId</field>
        <lookupValue>Email_QC</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Update record type to Email QC</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Reset_Email_Alert</fullName>
        <description>Resets the Email_Alert field to null to prevent email sends on subsequent edits.</description>
        <field>Email_Alert__c</field>
        <name>Reset Email Alert</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <rules>
        <fullName>Campaign Channel Insert Notification</fullName>
        <actions>
            <name>DME_team_email_notification</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <description>Workflow rule send an email to DME team if channel initiate is either Customer DM or Prospect DM and channel communication type is equal to related communication type</description>
        <formula>AND(OR( Channel_Communication_Type__r.Channel_Initiate_Text__c  =  &apos;Customer DM&apos;, Channel_Communication_Type__r.Channel_Initiate_Text__c = &apos;Prospect DM&apos;),Communication_Type__c =  TEXT(Communication__r.Communication_Type__c ))</formula>
        <triggerType>onCreateOnly</triggerType>
    </rules>
    <rules>
        <fullName>Change the campaign channel record type to Draft</fullName>
        <actions>
            <name>Update_record_type_to_Email_Draft</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <booleanFilter>1 AND 2 AND 3 AND 4</booleanFilter>
        <criteriaItems>
            <field>Campaign_Channel__c.Channel_Status__c</field>
            <operation>equals</operation>
            <value>Draft</value>
        </criteriaItems>
        <criteriaItems>
            <field>Campaign_Channel__c.Name</field>
            <operation>notContain</operation>
            <value>Prospect DM</value>
        </criteriaItems>
        <criteriaItems>
            <field>Campaign_Channel__c.Name</field>
            <operation>notContain</operation>
            <value>Customer DM</value>
        </criteriaItems>
        <criteriaItems>
            <field>Campaign_Channel__c.Is_Clone__c</field>
            <operation>equals</operation>
            <value>False</value>
        </criteriaItems>
        <description>Changes the record type to Email Draft when the Channel Status is Draft</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Campaign Channel Status Change</fullName>
        <actions>
            <name>Status_Change</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>When record is edited and Status is &quot;Draft&quot;, Status should be changed to &quot;In Progress&quot;</description>
        <formula>AND(NOT(ISNEW()),ISPICKVAL(Channel_Status__c ,&apos;Draft&apos;))</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Change the campaign channel record type to Email Approval</fullName>
        <actions>
            <name>Update_record_type_to_Email_Approval</name>
            <type>FieldUpdate</type>
        </actions>
        <active>false</active>
        <booleanFilter>1</booleanFilter>
        <criteriaItems>
            <field>Campaign_Channel__c.Channel_Status__c</field>
            <operation>equals</operation>
            <value>In Progress</value>
        </criteriaItems>
        <description>Changes the record type to Email Approval when the Channel Status is in Approval</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Change the campaign channel record type to Email Approved</fullName>
        <actions>
            <name>Update_record_type_to_Email_Approved</name>
            <type>FieldUpdate</type>
        </actions>
        <active>false</active>
        <booleanFilter>1</booleanFilter>
        <criteriaItems>
            <field>Campaign_Channel__c.Channel_Status__c</field>
            <operation>equals</operation>
            <value>Submitted for Delivery</value>
        </criteriaItems>
        <description>Changes the record type to Email Approved when the Channel Status is Approved</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Campaign Channel - DME Notification for creative submission</fullName>
        <actions>
            <name>Campaign_Channel_DME_Notification_for_creative_submission</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <description>Campaign Channel - DME Notification for creative submission for 'Customer DM' or 'Prospect DM' Channel Initiate type.
            SYS_DME_Email_Sent__c of Campaign_Channel__c is set to true by the trigger handler</description>
        <formula>AND( ISCHANGED( SYS_DME_Email_Sent__c ), SYS_DME_Email_Sent__c = true )</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Campaign Channel - Set Customer DM RecordType</fullName>
        <actions>
            <name>Set_Direct_Mail_Record_Type</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Campaign_Channel__c.Name</field>
            <operation>startsWith</operation>
            <value>Customer DM -</value>
        </criteriaItems>
        <criteriaItems>
            <field>Campaign_Channel__c.RecordTypeId</field>
            <operation>notEqual</operation>
            <value>Direct Mail</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Campaign Channel - Set Prospect DM RecordType</fullName>
        <actions>
            <name>Set_Prospect_DM_Record_type</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <booleanFilter>1 AND 2</booleanFilter>
        <criteriaItems>
            <field>Campaign_Channel__c.Name</field>
            <operation>startsWith</operation>
            <value>Prospect DM</value>
        </criteriaItems>
        <criteriaItems>
            <field>Campaign_Channel__c.Channel_Status__c</field>
            <operation>equals</operation>
            <value>Draft</value>
        </criteriaItems>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Email Prospect DM Attachment Added</fullName>
        <actions>
            <name>Email_Prospect_DM_Attachment_Added_to_CMT</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>Reset_Email_Alert</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Campaign_Channel__c.Email_Alert__c</field>
            <operation>equals</operation>
            <value>Prospect DM Attachment Added</value>
        </criteriaItems>
        <description>Fires to send email alert to when an attachment has been added to a Prospect DM campaign channel.</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Campaign Channnel - Cancelled POID Saved</fullName>
        <actions>
            <name>Communication_Cancelled_Pre_QC</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>Clear_Cancelled_POID</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Campaign_Channel__c.Cancelled_POID__c</field>
            <operation>notEqual</operation>
        </criteriaItems>
        <description>Cancelled POID is saved whenever communication is cancelled pre-QC to trigger an email.</description>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Update Record Type for MSE Request</fullName>
        <actions>
            <name>Update_record_type_to_MSE</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>Workflow to update the record type for MSE Channel initiates values of campaign channel</description>
        <formula>Channel_Initiate__c == &apos;Digital MSE&apos;
|| Channel_Initiate__c == &apos;Prospect Phone Inbound&apos;
|| Channel_Initiate__c == &apos;Prospect Phone Outbound&apos;
|| Channel_Initiate__c == &apos;Customer Phone Outbound&apos;
|| (CONTAINS(Channel_Initiate__c, &apos;Customer Phone Inbound&apos;)
&amp;&amp; Channel_Config__r.Name != &apos;Customer Phone Inbound&apos;)</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
</Workflow>