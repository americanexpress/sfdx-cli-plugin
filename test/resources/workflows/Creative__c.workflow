<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <fieldUpdates>
        <fullName>Creative_Set_Timestamp_Status_Updated</fullName>
        <description>To capture the timestamp of when the status was last updated.</description>
        <field>Last_Status_Updated__c</field>
        <formula>NOW()</formula>
        <name>Creative Set Timestamp Status Updated</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Creative_Switch_Record_Type_to_Lock_Canc</fullName>
        <description>To switch the record type (incl. page layout) to Locked Creative Layout to remove edit functionality while still allowing to cancel.</description>
        <field>RecordTypeId</field>
        <lookupValue>Locked_Creative_Allow_Cancel</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Creative Switch Record Type to Lock Canc</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Creative_Switch_Record_Type_to_Locked_FU</fullName>
        <field>RecordTypeId</field>
        <lookupValue>Locked_Creative</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Creative Switch Record Type to Locked FU</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Creative_Switch_Record_Type_to_Unlock_FU</fullName>
        <description>To switch the record type (incl. page layout) to Unlocked Creative Layout to allow edit functionality.</description>
        <field>RecordTypeId</field>
        <lookupValue>Creative_Record</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Creative Switch Record Type to Unlock FU</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <rules>
        <fullName>Creative Switch Record Type to Locked</fullName>
        <actions>
            <name>Creative_Switch_Record_Type_to_Locked_FU</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>To switch the record type (incl. page layout) to Locked Creative Layout to remove edit functionality.</description>
        <formula>AND( RecordType.DeveloperName != &apos;Locked_Creative&apos;, OR (Status__c == &apos;Canceled&apos;, Status__c == &apos;Approved&apos; ) )</formula>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Creative Switch Record Type to Locked - Allow Cancel</fullName>
        <actions>
            <name>Creative_Switch_Record_Type_to_Lock_Canc</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>To switch the record type (incl. page layout) to Locked Creative Layout to remove edit functionality - while allowing still allowing to cancel the current record.</description>
        <formula>AND( RecordType.DeveloperName != &apos;Locked_Creative_Allow_Cancel&apos;, OR (Status__c == &apos;Resubmission&apos;, Status__c == &apos;In Progress&apos; ) )</formula>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Creative Switch Record Type to Unlocked</fullName>
        <actions>
            <name>Creative_Switch_Record_Type_to_Unlock_FU</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>To switch the record type (incl. page layout) to Unlocked Creative Layout to allow edit functionality.</description>
        <formula>AND( RecordType.DeveloperName != &apos;Creative_Record&apos;, Status__c == &apos;New&apos; )</formula>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Creative Timestamp of last status updated</fullName>
        <actions>
            <name>Creative_Set_Timestamp_Status_Updated</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>To capture a timestamp when the most recent last status update has happened.</description>
        <formula>OR( ISNEW(), ISCHANGED( Status__c ) )</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
</Workflow>
