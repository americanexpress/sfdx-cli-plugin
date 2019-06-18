<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <alerts>
        <fullName>Cancelled_Communication_Email_Alert</fullName>
        <description>Cancelled Communication Email Alert</description>
        <protected>false</protected>
        <recipients>
            <recipient>CA_Marketers</recipient>
            <type>group</type>
        </recipients>
        <senderAddress>testuser@myorg.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>unfiled$public/Cancelled_Communication_Template</template>
    </alerts>
    <alerts>
        <fullName>Send_email_notification_to_mse_team</fullName>
        <description>Send email notification to mse team</description>
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
            <recipient>MSE_Team_Member</recipient>
            <type>role</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/MSE_CommunicationCancelledNotification</template>
    </alerts>
    <alerts>
        <fullName>Targeting_Approval_by_MarketingEnablement</fullName>
        <description>Targeting Approval by Marketing Enablement</description>
        <protected>false</protected>
        <recipients>
            <type>creator</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Targeting_Email_Folder/Targeting_Approval_Template</template>
    </alerts>
    <alerts>
        <fullName>Targeting_Approval_by_Marketing_Enablement</fullName>
        <description>Targeting Approval by Marketing Enablement</description>
        <protected>false</protected>
        <recipients>
            <type>creator</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Targeting_Email_Folder/Targeting_Approval_Template</template>
    </alerts>
    <alerts>
        <fullName>Targeting_Approval_by_Marketing_EnablementTeam</fullName>
        <description>Targeting Approval by Marketing Enablement</description>
        <protected>false</protected>
        <recipients>
            <type>creator</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Targeting_Email_Folder/Targeting_Approval_Template</template>
    </alerts>
    <alerts>
        <fullName>Targeting_Review_by_Marketing_Enablement</fullName>
        <description>Targeting Review by Marketing Enablement</description>
        <protected>false</protected>
        <recipients>
            <type>creator</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Targeting_Email_Folder/Targeting_Reviewal_Template</template>
    </alerts>
    <alerts>
        <fullName>Targeting_Review_by_Marketing_EnablementTeam</fullName>
        <description>Targeting Review by Marketing Enablement</description>
        <protected>false</protected>
        <recipients>
            <type>creator</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>Targeting_Email_Folder/Targeting_Reviewal_Template</template>
    </alerts>
    <fieldUpdates>
        <fullName>Change_Member_Get_Comm_to_Approved_RT</fullName>
        <field>RecordTypeId</field>
        <lookupValue>Status_OG_Approved</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Change Member Get Comm to Approved RT</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Change_Prospect_Acq_Comm_to_Approved_RT</fullName>
        <field>RecordTypeId</field>
        <lookupValue>Status_OG_Approved</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Change Prospect Acq Comm to Approved RT</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Change_to_Approved_Record_Type</fullName>
        <description>Changes customer acquisition communication to approved record type</description>
        <field>RecordTypeId</field>
        <lookupValue>Status_OG_Approved</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Change Acquisition Comm to Approved RT</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Communication_Switch_RT_to_Status_Draft</fullName>
        <description>Communication Switch RecordType to Status Draft</description>
        <field>RecordTypeId</field>
        <lookupValue>Status_Draft</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Communication Switch RT to Status Draft</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>OG_Approved_set_to_True</fullName>
        <field>OG_Approved__c</field>
        <literalValue>1</literalValue>
        <name>OG Approved set to True</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>PopulateComDescriptionValidationField</fullName>
        <description>Sprint 98 - US1497173 - Populate the Communication Description Validation if the Communication Description is Blank, otherwise, &apos;&apos; (empty)</description>
        <field>ComDesValidation__c</field>
        <formula>IF( ISPICKVAL(Incentive_Fulfillment_Required__c, &quot;No&quot;),
            IF(ISBLANK(Communication_Description_NonCard__c),
            &quot;Communication Description must be filled&quot;,
            &quot;&quot;),
            &quot;&quot;
            )</formula>
        <name>PopulateComDescriptionValidationField</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Approval_Communication_Status</fullName>
        <description>This Field updates the final communication status for the approval process.</description>
        <field>Status</field>
        <literalValue>Approved</literalValue>
        <name>Update Approval Communication Status</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Communication_Status</fullName>
        <description>This Field Updates the status field of the communication object as soon as it enters the approval process.</description>
        <field>Status</field>
        <literalValue>Pending Approval</literalValue>
        <name>Update Communication Status</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Communication_Status_to_Approved</fullName>
        <field>Status</field>
        <literalValue>Approved</literalValue>
        <name>Update Communication Status to Approved</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Communication_Status_to_Draft</fullName>
        <field>Status</field>
        <literalValue>Draft</literalValue>
        <name>Update Communication Status to Draft</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
     <fieldUpdates>
        <fullName>PopulateCarComDescriptionValidationField</fullName>
        <description>Sprint 100 - DE286635  - Populate Card Communication Description validation to blank value.</description>
        <field>ComDesValidation__c</field>
        <name>PopulateCarComDescriptionValidationField</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Null</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Communication_Status_to_Pending</fullName>
        <field>Status</field>
        <literalValue>Pending Approval</literalValue>
        <name>Update Communication Status to Pending</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Communication_Status_to_Recalled</fullName>
        <field>Status</field>
        <literalValue>Aborted</literalValue>
        <name>Update Communication Status to Recalled</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Communication_Status_to_Rejected</fullName>
        <field>Status</field>
        <literalValue>Aborted</literalValue>
        <name>Update Communication Status to Rejected</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Generate_PIB_Field_to_False</fullName>
        <field>Generate_A_PIB__c</field>
        <literalValue>0</literalValue>
        <name>Update Generate PIB Field to False</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Recall_Communication_Status</fullName>
        <description>This Field updates the communication status back to Draft.</description>
        <field>Status</field>
        <literalValue>Draft</literalValue>
        <name>Update Recall Communication Status</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Rejection_Communication_Status</fullName>
        <description>This field updates the status of communication Status field to Draft.</description>
        <field>Status</field>
        <literalValue>Draft</literalValue>
        <name>Update Rejection Communication Status</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_approval_checkbox</fullName>
        <description>Checks the Is Approved Field</description>
        <field>Is_Approved__c</field>
        <literalValue>1</literalValue>
        <name>Update Approval Checkbox</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <rules>
        <fullName>Communication Status OG Approved</fullName>
        <actions>
            <name>OG_Approved_set_to_True</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Campaign.Status</field>
            <operation>equals</operation>
            <value>OG Approved</value>
        </criteriaItems>
        <criteriaItems>
            <field>Campaign.OG_Approved__c</field>
            <operation>notEqual</operation>
            <value>True</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Communication Switch RecordType from Initial Assessment to Status Draft</fullName>
        <actions>
            <name>Communication_Switch_RT_to_Status_Draft</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Campaign.RecordTypeId</field>
            <operation>equals</operation>
            <value>Initial Assessment</value>
        </criteriaItems>
        <description>To switch the Communication record type from Initial Assessment to Status Draft</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Generate PIB Field On RecordCreate</fullName>
        <actions>
            <name>Update_Generate_PIB_Field_to_False</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>As per US1497193 when Communication Type is &apos;Awareness&apos; and Incentive Fulfillment is NO make the Generate A PIB field as false.</description>
        <formula>TEXT(Communication_Type__c)=&apos;Awareness&apos; &amp;&amp;  TEXT(Incentive_Fulfillment_Required__c)=&apos;No&apos;</formula>
        <triggerType>onCreateOnly</triggerType>
    </rules>
    <rules>
        <fullName>Generate PIB Field On RecordUpdate</fullName>
        <actions>
            <name>Update_Generate_PIB_Field_to_False</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>As per US1497193 when Communication Type is &apos;Awareness&apos; and Incentive Fulfillment is NO make the Generate A PIB field as false. - This Workflow rule is only for Update</description>
        <formula>(!ISNEW() &amp;&amp; (IsChanged(Communication_Type__c) ||
            IsChanged(Incentive_Fulfillment_Required__c)))

            &amp;&amp;

            (TEXT(Communication_Type__c)=&apos;Awareness&apos; &amp;&amp;
            TEXT(Incentive_Fulfillment_Required__c)=&apos;No&apos;)</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>MSE_CommunicationCancellationNotification</fullName>
        <actions>
            <name>Send_email_notification_to_mse_team</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <formula>TEXT(Status) == &apos;Cancelled&apos;</formula>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Populate Com Description Validation</fullName>
        <actions>
            <name>PopulateComDescriptionValidationField</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>Sprint 98 - US1497173 - Populate the Communication Description Validation for Non Card Communication (Loyalty) and Communication Construct Description is empty.</description>
        <formula>ISPICKVAL(Communication_Type__c, &quot;Loyalty&quot;) || ISPICKVAL(Communication_Type__c, &quot;Awareness&quot;)</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Populate Card Com Description Validation</fullName>
        <actions>
            <name>PopulateCarComDescriptionValidationField</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Campaign.Communication_Type__c</field>
            <operation>equals</operation>
            <value>Benefits Reinforcement,Customer Acquisition,Events,Lending,Member Get Member,Other,Prospect Acquisition,Social Only</value>
        </criteriaItems>
        <description>Sprint 100 - DE286635  - Populate Card Communication Description validation to blank value.</description>
        <triggerType>onAllChanges</triggerType>
    </rules>
</Workflow>
