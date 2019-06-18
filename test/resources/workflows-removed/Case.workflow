<?xml version="1.0" encoding="UTF-8"?>
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
        <fullName>CRC_Case_COVE_Screenshot_Upload_CoBrand</fullName>
        <description>CRC Case - COVE Screenshot Upload (CoBrand)</description>
        <protected>false</protected>
        <recipients>
            <recipient>BR_Team_CoBrand</recipient>
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
        <fullName>CRC_Case_COVE_Screenshot_Upload_Lending</fullName>
        <description>CRC Case - COVE Screenshot Upload (Lending)</description>
        <protected>false</protected>
        <recipients>
            <recipient>BR_Team_Lending</recipient>
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
        <fullName>CRC_Case_COVE_Screenshot_Upload_Messages</fullName>
        <description>CRC Case - COVE Screenshot Upload (Messages)</description>
        <protected>false</protected>
        <recipients>
            <recipient>BR_Team_Messages</recipient>
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
        <fullName>CRC_Case_COVE_Screenshot_Upload_Non_Card</fullName>
        <description>CRC Case - COVE Screenshot Upload (Non-Card)</description>
        <protected>false</protected>
        <recipients>
            <recipient>BR_Team_Non_Card</recipient>
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
        <fullName>CRC_Case_COVE_Screenshot_Upload_OPEN_Corporate_GCS</fullName>
        <description>CRC Case - COVE Screenshot Upload (OPEN/Corporate (GCS))</description>
        <protected>false</protected>
        <recipients>
            <recipient>BR_Team_OPEN_Corporate_GCS</recipient>
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
        <fullName>CRC_Case_COVE_Screenshot_Upload_Save_a_Card</fullName>
        <description>CRC Case - COVE Screenshot Upload (Save-a-Card)</description>
        <protected>false</protected>
        <recipients>
            <recipient>BR_Team_Save_a_Card</recipient>
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
        <fullName>CRC_Case_COVE_Team_Notification</fullName>
        <description>CRC Case - COVE Team Notification</description>
        <protected>false</protected>
        <recipients>
            <recipient>COVE_Team</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>CRC_Request_Email_Templates/CRC_Case_COVE_Team_Notification</template>
    </alerts>
    <alerts>
        <fullName>CRC_Case_Final_Marketing_Approval_Charge</fullName>
        <description>CRC Case - Final Marketing Approval (Charge)</description>
        <protected>false</protected>
        <recipients>
            <recipient>BR_Team_Charge</recipient>
            <type>group</type>
        </recipients>
        <recipients>
            <recipient>COVE_Team</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>CRC_Request_Email_Templates/CRC_Case_Final_Marketing_Approval</template>
    </alerts>
    <alerts>
        <fullName>CRC_Case_Final_Marketing_Approval_CoBrand</fullName>
        <description>CRC Case - Final Marketing Approval (CoBrand)</description>
        <protected>false</protected>
        <recipients>
            <recipient>BR_Team_CoBrand</recipient>
            <type>group</type>
        </recipients>
        <recipients>
            <recipient>COVE_Team</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>CRC_Request_Email_Templates/CRC_Case_Final_Marketing_Approval</template>
    </alerts>
    <alerts>
        <fullName>CRC_Case_Final_Marketing_Approval_Lending</fullName>
        <description>CRC Case - Final Marketing Approval (Lending)</description>
        <protected>false</protected>
        <recipients>
            <recipient>BR_Team_Lending</recipient>
            <type>group</type>
        </recipients>
        <recipients>
            <recipient>COVE_Team</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>CRC_Request_Email_Templates/CRC_Case_Final_Marketing_Approval</template>
    </alerts>
    <alerts>
        <fullName>CRC_Case_Final_Marketing_Approval_Messages</fullName>
        <description>CRC Case - Final Marketing Approval (Messages)</description>
        <protected>false</protected>
        <recipients>
            <recipient>BR_Team_Messages</recipient>
            <type>group</type>
        </recipients>
        <recipients>
            <recipient>COVE_Team</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>CRC_Request_Email_Templates/CRC_Case_Final_Marketing_Approval</template>
    </alerts>
    <alerts>
        <fullName>CRC_Case_Final_Marketing_Approval_Non_Card</fullName>
        <description>CRC Case - Final Marketing Approval (Non-Card)</description>
        <protected>false</protected>
        <recipients>
            <recipient>BR_Team_Non_Card</recipient>
            <type>group</type>
        </recipients>
        <recipients>
            <recipient>COVE_Team</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>CRC_Request_Email_Templates/CRC_Case_Final_Marketing_Approval</template>
    </alerts>
    <alerts>
        <fullName>CRC_Case_Final_Marketing_Approval_OPEN_Corporate_GCS</fullName>
        <description>CRC Case - Final Marketing Approval (OPEN/Corporate (GCS))</description>
        <protected>false</protected>
        <recipients>
            <recipient>BR_Team_OPEN_Corporate_GCS</recipient>
            <type>group</type>
        </recipients>
        <recipients>
            <recipient>COVE_Team</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>CRC_Request_Email_Templates/CRC_Case_Final_Marketing_Approval</template>
    </alerts>
    <alerts>
        <fullName>CRC_Case_Final_Marketing_Approval_Save_a_Card</fullName>
        <description>CRC Case - Final Marketing Approval (Save-a-Card)</description>
        <protected>false</protected>
        <recipients>
            <recipient>BR_Team_Save_a_Card</recipient>
            <type>group</type>
        </recipients>
        <recipients>
            <recipient>COVE_Team</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>CRC_Request_Email_Templates/CRC_Case_Final_Marketing_Approval</template>
    </alerts>
    <alerts>
        <fullName>Campaign_Channel_Revision_Required_email_template</fullName>
        <description>Campaign Channel Revision Required email template</description>
        <protected>false</protected>
        <recipients>
            <recipient>Email_Channel_Team</recipient>
            <type>role</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/Email_Channel_revision_required</template>
    </alerts>
    <alerts>
        <fullName>Case_Auto_Resolve_No_Response_3_Days</fullName>
        <description>Case Auto Resolve No Response 3 Days</description>
        <protected>false</protected>
        <recipients>
            <type>creator</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Auto_Resolve_No_Response_3_Days</template>
    </alerts>
    <alerts>
        <fullName>Case_Escalated_to_ACMS</fullName>
        <description>Case Escalated to ACMS</description>
        <protected>false</protected>
        <recipients>
            <recipient>Escalation_ACMS</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Escalated</template>
    </alerts>
    <alerts>
        <fullName>Case_Escalated_to_ATS</fullName>
        <description>Case Escalated to ATS</description>
        <protected>false</protected>
        <recipients>
            <recipient>Escalation_ATS</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Escalated</template>
    </alerts>
    <alerts>
        <fullName>Case_Escalated_to_BEQ</fullName>
        <description>Case Escalated to BEQ</description>
        <protected>false</protected>
        <recipients>
            <recipient>Escalation_BEQ</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Escalated</template>
    </alerts>
    <alerts>
        <fullName>Case_Escalated_to_Business_Admin</fullName>
        <description>Case Escalated to Business Admin</description>
        <protected>false</protected>
        <recipients>
            <recipient>Escalation_Business_Admin</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Escalated</template>
    </alerts>
    <alerts>
        <fullName>Case_Escalated_to_CBO</fullName>
        <description>Case Escalated to CBO</description>
        <protected>false</protected>
        <recipients>
            <recipient>Escalation_CBO</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Escalated</template>
    </alerts>
    <alerts>
        <fullName>Case_Escalated_to_CGT</fullName>
        <description>Case Escalated to CGT</description>
        <protected>false</protected>
        <recipients>
            <recipient>Escalation_CGT</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Escalated</template>
    </alerts>
    <alerts>
        <fullName>Case_Escalated_to_CMT</fullName>
        <description>Case Escalated to CMT</description>
        <protected>false</protected>
        <recipients>
            <recipient>Escalation_CMT</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Escalated</template>
    </alerts>
    <alerts>
        <fullName>Case_Escalated_to_COPTCAP</fullName>
        <description>Case Escalated to COPTCAP</description>
        <protected>false</protected>
        <recipients>
            <recipient>Escalation_COPTCAP</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Escalated</template>
    </alerts>
    <alerts>
        <fullName>Case_Escalated_to_CTC</fullName>
        <description>Case Escalated to CTC</description>
        <protected>false</protected>
        <recipients>
            <recipient>Escalation_CTC</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Escalated</template>
    </alerts>
    <alerts>
        <fullName>Case_Escalated_to_CTCM</fullName>
        <description>Case Escalated to CTCM</description>
        <protected>false</protected>
        <recipients>
            <recipient>Escalation_CTCM</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Escalated</template>
    </alerts>
    <alerts>
        <fullName>Case_Escalated_to_ERA</fullName>
        <description>Case Escalated to ERA</description>
        <protected>false</protected>
        <recipients>
            <recipient>Escalation_ERA</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Escalated</template>
    </alerts>
    <alerts>
        <fullName>Case_Escalated_to_IA_governance</fullName>
        <description>Case Escalated to IA governance</description>
        <protected>false</protected>
        <recipients>
            <recipient>Escalation_IA_governance</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Escalated</template>
    </alerts>
    <alerts>
        <fullName>Case_Escalated_to_ME_Tool</fullName>
        <description>Case Escalated to ME Tool</description>
        <protected>false</protected>
        <recipients>
            <recipient>Escalation_ME_Tool</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Escalated</template>
    </alerts>
    <alerts>
        <fullName>Case_Escalated_to_MSE</fullName>
        <description>Case Escalated to MSE</description>
        <protected>false</protected>
        <recipients>
            <recipient>Escalation_MSE</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Escalated</template>
    </alerts>
    <alerts>
        <fullName>Case_Escalated_to_Meridian</fullName>
        <description>Case Escalated to Meridian</description>
        <protected>false</protected>
        <recipients>
            <recipient>Escalation_Meridian</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Escalated</template>
    </alerts>
    <alerts>
        <fullName>Case_Escalated_to_Nexus</fullName>
        <description>Case Escalated to Nexus</description>
        <protected>false</protected>
        <recipients>
            <recipient>Escalation_Nexus</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Escalated</template>
    </alerts>
    <alerts>
        <fullName>Case_Escalated_to_OGCP</fullName>
        <description>Case Escalated to OGCP</description>
        <protected>false</protected>
        <recipients>
            <recipient>Escalation_OGCP</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Escalated</template>
    </alerts>
    <alerts>
        <fullName>Case_Escalated_to_OLET</fullName>
        <description>Case Escalated to OLET</description>
        <protected>false</protected>
        <recipients>
            <recipient>Escalation_OLET</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Escalated</template>
    </alerts>
    <alerts>
        <fullName>Case_Escalated_to_PPMIS</fullName>
        <description>Case Escalated to PPMIS</description>
        <protected>false</protected>
        <recipients>
            <recipient>Escalation_PPMIS</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Escalated</template>
    </alerts>
    <alerts>
        <fullName>Case_Escalated_to_SDM</fullName>
        <description>Case Escalated to SDM</description>
        <protected>false</protected>
        <recipients>
            <recipient>Escalation_SDM</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Escalated</template>
    </alerts>
    <alerts>
        <fullName>Case_Escalated_to_Training</fullName>
        <description>Case Escalated to Training</description>
        <protected>false</protected>
        <recipients>
            <recipient>Escalation_Training</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Escalated</template>
    </alerts>
    <alerts>
        <fullName>Case_Prospect_DM_Segment_Change_CMT</fullName>
        <description>Case: Prospect DM Segment Change Email to CMT</description>
        <protected>false</protected>
        <recipients>
            <recipient>Campaign_Management_Team</recipient>
            <type>group</type>
        </recipients>
        <senderType>DefaultWorkflowUser</senderType>
        <template>unfiled$public/Prospect_DM_Segment_Changes_to_CMT</template>
    </alerts>
    <alerts>
        <fullName>Case_Prospect_DM_Segment_Change_Marketer</fullName>
        <description>Case: Prospect DM Segment Change Email to Marketer</description>
        <protected>false</protected>
        <recipients>
            <type>creator</type>
        </recipients>
        <senderType>DefaultWorkflowUser</senderType>
        <template>unfiled$public/Prospect_DM_Segment_Changes_to_Marketer</template>
    </alerts>
    <alerts>
        <fullName>Case_Submitted_back_to_CGT</fullName>
        <description>Case Submitted back to CGT</description>
        <protected>false</protected>
        <recipients>
            <recipient>CGT_Team</recipient>
            <type>role</type>
        </recipients>
        <senderType>DefaultWorkflowUser</senderType>
        <template>MSE_Request_Email_Templates/Case_Submitted_By_MSE_To_CGT</template>
    </alerts>
    <alerts>
        <fullName>Case_closed</fullName>
        <description>Case closed</description>
        <protected>false</protected>
        <recipients>
            <field>ContactId</field>
            <type>contactLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/SUPPORT_Case_closed</template>
    </alerts>
    <alerts>
        <fullName>Change_Request_Record_Type_Email_Notification</fullName>
        <description>Change Request Record Type Email Notification</description>
        <protected>false</protected>
        <recipients>
            <field>Case_Submitted_By__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/CMT_Change_Request_Case_Creation_Notification</template>
    </alerts>
    <alerts>
        <fullName>Email_Channel_Resubmission</fullName>
        <description>Email Channel Resubmission</description>
        <protected>false</protected>
        <recipients>
            <recipient>Email_Channel_Team</recipient>
            <type>role</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/Case_Email_Channel_Resubmit</template>
    </alerts>
    <alerts>
        <fullName>Email_Channel_Submission</fullName>
        <description>Email Channel Submission</description>
        <protected>false</protected>
        <recipients>
            <recipient>Email_Channel_Team</recipient>
            <type>role</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/Case_Email_Channel_Submit</template>
    </alerts>
    <alerts>
        <fullName>Email_Notification_for_B35_Approval</fullName>
        <description>Email Notification for B35 Approval</description>
        <protected>false</protected>
        <recipients>
            <field>Band_35_User__c</field>
            <type>userLookup</type>
        </recipients>
        <recipients>
            <field>MSE_Business_Manager__c</field>
            <type>userLookup</type>
        </recipients>
        <recipients>
            <field>MSE_Reviewer__c</field>
            <type>userLookup</type>
        </recipients>
        <recipients>
            <field>MSE_Team_Lead__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/Case_Submitted_for_B35_Approval</template>
    </alerts>
    <alerts>
        <fullName>Email_Notification_on_CGT_Approved</fullName>
        <description>Email Notification on CGT Approved</description>
        <protected>false</protected>
        <recipients>
            <field>Band_35_User__c</field>
            <type>userLookup</type>
        </recipients>
        <recipients>
            <field>MSE_Business_Manager__c</field>
            <type>userLookup</type>
        </recipients>
        <recipients>
            <field>MSE_Reviewer__c</field>
            <type>userLookup</type>
        </recipients>
        <recipients>
            <field>MSE_Team_Lead__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>MSE_Request_Email_Templates/Submitted_for_B35_Approval</template>
    </alerts>
    <alerts>
        <fullName>Email_Notification_to_MSE_for_updates_by_B35</fullName>
        <description>Email Notification to MSE for updates by B35</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <recipients>
            <recipient>MSE_Business_Manager</recipient>
            <type>role</type>
        </recipients>
        <recipients>
            <recipient>MSE_Team_Manager</recipient>
            <type>role</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/MSE_Case_Submission_By_B35</template>
    </alerts>
    <alerts>
        <fullName>Email_notification_to_CGT_Team_lead1</fullName>
        <description>Email notification to CGT Team lead</description>
        <protected>false</protected>
        <recipients>
            <recipient>CGT_Team</recipient>
            <type>role</type>
        </recipients>
        <recipients>
            <field>CGT_Reviewer__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>DefaultWorkflowUser</senderType>
        <template>MSE_Request_Email_Templates/CGT_Team_Notification</template>
    </alerts>
    <alerts>
        <fullName>Email_notification_to_MSE_for_Updates</fullName>
        <description>Email notification to MSE for Updates</description>
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
            <field>Last_Case_Owner__c</field>
            <type>userLookup</type>
        </recipients>
        <senderAddress>testuser@myorg.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>MSE_Request_Email_Templates/MSE_Case_Submission_By_CGT</template>
    </alerts>
    <alerts>
        <fullName>MSE_Team_Manager_Lead_Email_Notification</fullName>
        <description>MSE Team Manager/Lead Email Notification</description>
        <protected>false</protected>
        <recipients>
            <field>Case_Approver__c</field>
            <type>userLookup</type>
        </recipients>
        <senderAddress>testuser@myorg.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Re_Assigned_to_MSE</template>
    </alerts>
    <alerts>
        <fullName>MSE_User_Case_Resubmission</fullName>
        <description>MSE User Case Resubmission</description>
        <protected>false</protected>
        <recipients>
            <field>Last_Reviewer__c</field>
            <type>userLookup</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>MSE_Request_Email_Templates/MSE_User_Case_Resubmission</template>
    </alerts>
    <alerts>
        <fullName>MSE_queue_assignment_for_Case</fullName>
        <description>Trigger An email when Case with MSE record type has been added to queue</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderAddress>testuser@myorg.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Assigned_to_MSE</template>
    </alerts>
    <alerts>
        <fullName>Milestone_Due_Warning</fullName>
        <description>Milestone Due Warning</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <recipients>
            <recipient>Support_Team_Lead</recipient>
            <type>role</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Milestone_Due_Warning</template>
    </alerts>
    <alerts>
        <fullName>Notify_Case_Owner</fullName>
        <description>US1204068 - Notify Case Owner</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/Case_Comment_Notification_Email_Template</template>
    </alerts>
    <alerts>
        <fullName>OG_Milestone_Due_Warning</fullName>
        <description>OG Milestone Due Warning</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <recipients>
            <recipient>Support_Team_Lead</recipient>
            <type>role</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Milestone_Due_Warning</template>
    </alerts>
    <alerts>
        <fullName>OG_Milestone_Overdue</fullName>
        <description>OG Milestone Overdue</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <recipients>
            <recipient>Support_Team_Lead</recipient>
            <type>role</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Milestone_Violation</template>
    </alerts>
    <alerts>
        <fullName>OG_Re_Submission_review_milestone_due_warning</fullName>
        <description>OG Re-Submission review milestone due warning</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <recipients>
            <recipient>Support_Team_Lead</recipient>
            <type>role</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Milestone_Due_Warning</template>
    </alerts>
    <alerts>
        <fullName>OG_Re_submission_review_overdue</fullName>
        <description>OG Re-submission review overdue</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <recipients>
            <recipient>Support_Team_Lead</recipient>
            <type>role</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Milestone_Violation</template>
    </alerts>
    <alerts>
        <fullName>OG_Resubmission</fullName>
        <description>OG Resubmission</description>
        <protected>false</protected>
        <recipients>
            <recipient>Offer_Governance_OG_Team</recipient>
            <type>role</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/Case_Resubmit_to_OG</template>
    </alerts>
    <alerts>
        <fullName>OG_Support_Milestone_Due_Warning</fullName>
        <description>OG Support Milestone Due Warning</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <recipients>
            <recipient>Support_Team_Lead</recipient>
            <type>role</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Milestone_Due_Warning</template>
    </alerts>
    <alerts>
        <fullName>OG_Support_Milestone_Overdue</fullName>
        <description>OG Support Milestone Overdue</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <recipients>
            <recipient>Support_Team_Lead</recipient>
            <type>role</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Milestone_Violation</template>
    </alerts>
    <alerts>
        <fullName>OG_Support_Milestone_Violation</fullName>
        <description>OG Support: Milestone Violation</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Milestone_Violation</template>
    </alerts>
    <alerts>
        <fullName>OG_Support_Milestone_Violation_Owner</fullName>
        <description>OG Support: Milestone Violation Owner</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Milestone_Violation</template>
    </alerts>
    <alerts>
        <fullName>OG_Support_Milestone_Warning</fullName>
        <description>OG Support: Milestone Warning</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Milestone_Due_Warning</template>
    </alerts>
    <alerts>
        <fullName>OG_Support_Milestone_Warning_Owner</fullName>
        <description>OG Support: Milestone Warning Owner</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Milestone_Due_Warning</template>
    </alerts>
    <alerts>
        <fullName>Offer_Governance_OG_review_Complete</fullName>
        <description>Offer Governance (OG) review Complete</description>
        <protected>false</protected>
        <recipients>
            <type>creator</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/Offer_Governance_Review_Complete</template>
    </alerts>
    <alerts>
        <fullName>Promotion_Status_Still_Pending_Notification_One_Hour</fullName>
        <description>Promotion Status Still Pending Notification (One Hour)</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderAddress>testuser@myorg.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>SampleProject_Support/Promotion_Status_Still_Pending_One_Hour</template>
    </alerts>
    <alerts>
        <fullName>Promotion_Status_Still_Pending_Notification_One_Week</fullName>
        <description>Promotion Status Still Pending Notification (One Week)</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderAddress>testuser@myorg.com</senderAddress>
        <senderType>OrgWideEmailAddress</senderType>
        <template>SampleProject_Support/Promotion_Status_Still_Pending_One_Week</template>
    </alerts>
    <alerts>
        <fullName>Prospect_DM_Change_Email_to_CMT</fullName>
        <description>Prospect DM Change Email to CMT</description>
        <protected>false</protected>
        <recipients>
            <recipient>Campaign_Management_Team</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/Prospect_DM_Segment_Changes_to_CMT</template>
    </alerts>
    <alerts>
        <fullName>Prospect_DM_Change_Email_to_MES</fullName>
        <description>Prospect DM Change Email to MES</description>
        <protected>false</protected>
        <recipients>
            <recipient>Campaign_Management_Team</recipient>
            <type>group</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/Prospect_DM_Segment_Changes_to_MES</template>
    </alerts>
    <alerts>
        <fullName>Prospect_DM_Change_Email_to_Marketer</fullName>
        <description>Prospect DM Change Email to Marketer</description>
        <protected>false</protected>
        <recipients>
            <type>creator</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>unfiled$public/Prospect_DM_Segment_Changes_to_Marketer</template>
    </alerts>
    <alerts>
        <fullName>SUPPORT_Case_Initiation_Confirmation</fullName>
        <description>SUPPORT: Case Initiation Confirmation</description>
        <protected>false</protected>
        <recipients>
            <type>creator</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Initiation_Confirmation</template>
    </alerts>
    <alerts>
        <fullName>SUPPORT_Case_Reopen_Confirmation</fullName>
        <description>SUPPORT: Case Reopen Confirmation</description>
        <protected>false</protected>
        <recipients>
            <field>ContactEmail</field>
            <type>email</type>
        </recipients>
        <recipients>
            <field>SuppliedEmail</field>
            <type>email</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/SUPPORT_Case_Reopen_Confirmation</template>
    </alerts>
    <alerts>
        <fullName>Send_email_to_OG_Queue</fullName>
        <description>Send email to OG Queue</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>SampleProject_Support/Alert_OG_Support_on_Case_Creation</template>
    </alerts>
    <alerts>
        <fullName>Send_email_to_Team_member</fullName>
        <description>Send email to Team member</description>
        <protected>false</protected>
        <recipients>
            <type>owner</type>
        </recipients>
        <senderType>DefaultWorkflowUser</senderType>
        <template>MSE_Request_Email_Templates/CGT_Team_Member_Notification</template>
    </alerts>
    <alerts>
        <fullName>Submit_for_B35_Approval</fullName>
        <description>Submit for B35 Approval</description>
        <protected>false</protected>
        <recipients>
            <field>Band_35_Email__c</field>
            <type>email</type>
        </recipients>
        <recipients>
            <type>owner</type>
        </recipients>
        <recipients>
            <recipient>MSE_Business_Manager</recipient>
            <type>role</type>
        </recipients>
        <recipients>
            <recipient>MSE_Team_Manager</recipient>
            <type>role</type>
        </recipients>
        <senderType>CurrentUser</senderType>
        <template>MSE_Request_Email_Templates/Submitted_for_B35_Approval</template>
    </alerts>
    <fieldUpdates>
        <fullName>Assign_Case_to_SampleProject_Support</fullName>
        <description>Assigns the Case to the SampleProject Support queue</description>
        <field>OwnerId</field>
        <lookupValue>SampleProject_Support</lookupValue>
        <lookupValueType>Queue</lookupValueType>
        <name>Assign Case to SampleProject Support</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Assign_OG_case_owner_to_queue</fullName>
        <field>OwnerId</field>
        <lookupValue>Offer_Governance_OG_Team</lookupValue>
        <lookupValueType>Queue</lookupValueType>
        <name>Assign OG case owner to queue</name>
        <notifyAssignee>true</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Assigned_To_CGT_Team_mem</fullName>
        <field>Status</field>
        <literalValue>Assigned to CGT team member</literalValue>
        <name>Assigned to CGT Team Member</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Assigned_to_CGT_member</fullName>
        <field>Status</field>
        <literalValue>Assigned to CGT team member</literalValue>
        <name>Assigned to CGT member</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Assigned_to_CGT_team_member</fullName>
        <field>Status</field>
        <literalValue>Assigned to CGT team member</literalValue>
        <name>Assigned to CGT team member</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Blank_Case_Last_Rejected_User_type</fullName>
        <description>Blank out the case last rejected by user type</description>
        <field>Case_Last_Rejected_by_User_Type__c</field>
        <name>Blank Case Last Rejected User type</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Null</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Blank_Last_Case_Rejected_By_Id</fullName>
        <description>Blank out the Case Last Rejected by Id</description>
        <field>Case_Last_Rejected_By_Id__c</field>
        <name>Blank Last Case Rejected By Id</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Null</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Blank_Last_Rejected_By</fullName>
        <description>Blank last rejected by</description>
        <field>Case_Last_Rejected_By__c</field>
        <name>Blank Last Rejected By</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Blank_MSE_Approved_Date</fullName>
        <description>Blank the previous MSE Approved Date in Case of Resubmission</description>
        <field>MSE_Approved_Date_Time__c</field>
        <name>Blank MSE Approved Date</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Null</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>CGT_updates_InProcess</fullName>
        <field>Status</field>
        <literalValue>CGT updates In Process</literalValue>
        <name>CGT updates In Process</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>CGT_updates_In_Process</fullName>
        <field>Status</field>
        <literalValue>CGT updates In Process</literalValue>
        <name>CGT updates In Process</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Case_Owner_BR_Team_Charge</fullName>
        <field>OwnerId</field>
        <lookupValue>Charge_Team</lookupValue>
        <lookupValueType>Queue</lookupValueType>
        <name>Case - Owner BR Team (Charge)</name>
        <notifyAssignee>true</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Case_Owner_BR_Team_CoBrand</fullName>
        <field>OwnerId</field>
        <lookupValue>CoBrand_Team</lookupValue>
        <lookupValueType>Queue</lookupValueType>
        <name>Case - Owner BR Team (CoBrand)</name>
        <notifyAssignee>true</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Case_Owner_BR_Team_GCS</fullName>
        <field>OwnerId</field>
        <lookupValue>OPEN_Corporate_GCS</lookupValue>
        <lookupValueType>Queue</lookupValueType>
        <name>Case - Owner BR Team (GCS)</name>
        <notifyAssignee>true</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Case_Owner_BR_Team_Lending</fullName>
        <field>OwnerId</field>
        <lookupValue>Lending_Team</lookupValue>
        <lookupValueType>Queue</lookupValueType>
        <name>Case - Owner BR Team (Lending)</name>
        <notifyAssignee>true</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Case_Owner_BR_Team_Messages</fullName>
        <field>OwnerId</field>
        <lookupValue>Messages_Team</lookupValue>
        <lookupValueType>Queue</lookupValueType>
        <name>Case - Owner BR Team (Messages)</name>
        <notifyAssignee>true</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Case_Owner_BR_Team_Non_Card</fullName>
        <field>OwnerId</field>
        <lookupValue>Non_Card_Team</lookupValue>
        <lookupValueType>Queue</lookupValueType>
        <name>Case - Owner BR Team (Non-Card)</name>
        <notifyAssignee>true</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Case_Owner_BR_Team_Save_a_Card</fullName>
        <field>OwnerId</field>
        <lookupValue>Save_a_Card_Team</lookupValue>
        <lookupValueType>Queue</lookupValueType>
        <name>Case - Owner BR Team (Save-a-Card)</name>
        <notifyAssignee>true</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Case_Owner_CGT_Team</fullName>
        <field>OwnerId</field>
        <lookupValue>CGT_Queue</lookupValue>
        <lookupValueType>Queue</lookupValueType>
        <name>Case - Owner CGT Team</name>
        <notifyAssignee>true</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Case_Owner_CMT_Team</fullName>
        <field>OwnerId</field>
        <lookupValue>Campaign_Management_Team</lookupValue>
        <lookupValueType>Queue</lookupValueType>
        <name>Case - Owner CMT Team</name>
        <notifyAssignee>true</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Case_Owner_COVE_Team</fullName>
        <field>OwnerId</field>
        <lookupValue>COVE_Team</lookupValue>
        <lookupValueType>Queue</lookupValueType>
        <name>Case - Owner COVE Team</name>
        <notifyAssignee>true</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Case_Status_Approved</fullName>
        <field>Status</field>
        <literalValue>Approved</literalValue>
        <name>Case - Status Approved</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Case_Status_BR_Team_Assignment</fullName>
        <field>Status</field>
        <literalValue>Business Rules Team Assignment</literalValue>
        <name>Case - Status BR Team Assignment</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Case_Status_Channel_Build_Review_and_App</fullName>
        <field>Status</field>
        <literalValue>Channel Build Review &amp; Approval</literalValue>
        <name>Case - Status Channel Build Review &amp; App</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Case_Status_Channel_Build_Screenshots</fullName>
        <field>Status</field>
        <literalValue>Channel Build Screenshots Upload</literalValue>
        <name>Case - Status Channel Build Screenshots</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Case_Status_Closed</fullName>
        <field>Status</field>
        <literalValue>Closed</literalValue>
        <name>Case - Status Closed</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Case_Status_Final_Marketing_Sign_off</fullName>
        <field>Status</field>
        <literalValue>Final Marketing Sign-off to Deploy</literalValue>
        <name>Case - Status Final Marketing Sign-off</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Case_Status_IRD_Review_and_Finalization</fullName>
        <field>Status</field>
        <literalValue>IRD Review &amp; Finalization</literalValue>
        <name>Case - Status IRD Review &amp; Finalization</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Case_Status_New</fullName>
        <field>Status</field>
        <literalValue>New</literalValue>
        <name>Case - Status New</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Case_Sub_Status_Complete</fullName>
        <field>Sub_Status__c</field>
        <literalValue>Complete</literalValue>
        <name>Case - Sub-Status Complete</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Case_Sub_Status_Pending</fullName>
        <field>Sub_Status__c</field>
        <literalValue>Pending</literalValue>
        <name>Case - Sub-Status Pending</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Case_Use_Assignment_Rules</fullName>
        <field>Use_Case_Assignment_Rules__c</field>
        <literalValue>1</literalValue>
        <name>Case - Use Assignment Rules</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Case_is_sent_back_to_CGT</fullName>
        <field>Status</field>
        <literalValue>CGT review In process</literalValue>
        <name>Case is sent back to CGT</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Change_Record_Type_To_CBO_Mods</fullName>
        <field>RecordTypeId</field>
        <lookupValue>Offer_Governance_CBO_Mods</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Change Record Type To CBO/Mods</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Change_Request_Record_Type_Queue_Set</fullName>
        <field>OwnerId</field>
        <lookupValue>Campaign_Management_Team</lookupValue>
        <lookupValueType>Queue</lookupValueType>
        <name>Change Request Record Type Queue Set</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Set_Case_Reported_Date_to_Now</fullName>
        <description>Sets the Reported Date field on a Case to the current date and time using the Now() function.</description>
        <field>Reported_Date__c</field>
        <formula>NOW()</formula>
        <name>Set Case Reported Date to Now</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Set_Case_Status_for_MSE</fullName>
        <description>Set Case Status to Submitted for MSE Approval where the owner is a MSE Queue</description>
        <field>Status</field>
        <literalValue>Submitted for MSE Approval</literalValue>
        <name>Set Case Status to Submitted for MSE</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Set_Case_Status_to_Approved</fullName>
        <field>Status</field>
        <literalValue>Approved</literalValue>
        <name>Set Case Status to Approved</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Set_Case_Status_to_Assigned_Accepted</fullName>
        <description>Sets a Case Status to Assigned/Accepted when a User is set from a Queue</description>
        <field>Status</field>
        <literalValue>Assigned/Accepted</literalValue>
        <name>Set Case Status to Assigned/Accepted</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Set_Case_Status_to_B35_Updates_In_Proces</fullName>
        <field>Status</field>
        <literalValue>B35 Updates In Process</literalValue>
        <name>Set Case Status to B35 Updates In Proces</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Set_Case_Status_to_PIV_Testing_In_Proces</fullName>
        <field>Status</field>
        <literalValue>PIV Testing in Process</literalValue>
        <name>Set Case Status to PIV Testing In Proces</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Set_Case_Status_to_Resolved</fullName>
        <description>Set Case Status to Resolved</description>
        <field>Status</field>
        <literalValue>Resolved</literalValue>
        <name>Set Case Status to Resolved</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Set_Case_Status_to_Submitted_for_CGT_App</fullName>
        <field>Status</field>
        <literalValue>Submitted for CGT approval</literalValue>
        <name>Set Case Status to Submitted for CGT App</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Set_Case_Status_to_Submitted_to_B35_Appr</fullName>
        <field>Status</field>
        <literalValue>Submitted for B35 approval</literalValue>
        <name>Set Case Status to Submitted to B35 Appr</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Set_case_escalation_flag_to_true</fullName>
        <field>IsEscalated</field>
        <literalValue>1</literalValue>
        <name>Set case escalation flag to true</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Submitted_for_B35_Approval</fullName>
        <field>Status</field>
        <literalValue>Submitted for B35 approval</literalValue>
        <name>Submitted for B35 Approval</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Uncheck_Notify_Owner_on_Case</fullName>
        <description>US1204068 - Uncheck Notify Owner on Case</description>
        <field>Notify_Owner_on_Case_Comment__c</field>
        <literalValue>0</literalValue>
        <name>Uncheck Notify Owner on Case</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Assigned_Queue_to_CGT_Queue</fullName>
        <description>Update the assigned Queue to CGT Queue</description>
        <field>Assigned_Queue__c</field>
        <formula>&quot;CGT Queue&quot;</formula>
        <name>Update Assigned Queue to CGT Queue</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Assigned_Queue_to_MSE</fullName>
        <field>Assigned_Queue__c</field>
        <formula>&quot;MSE Queue&quot;</formula>
        <name>Update Assigned Queue to MSE</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_B35_Approved_Date_Time</fullName>
        <description>Update the Band 35 Approved Date Time</description>
        <field>B35_Approved_Date_Time__c</field>
        <formula>NOW()</formula>
        <name>Update B35 Approved Date Time</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_By_Pass_CGT</fullName>
        <description>Update the by pass CGT</description>
        <field>ByPass_CGT_Approval__c</field>
        <literalValue>1</literalValue>
        <name>Update By Pass CGT</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_CGT_Approved_Date_Time</fullName>
        <description>Update the CGT Approved Date Time</description>
        <field>CGT_Approved_Date_Time__c</field>
        <formula>NOW()</formula>
        <name>Update CGT Approved Date Time</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Case_Last_Rejected_User_type</fullName>
        <description>Stamps the user role who rejects the case</description>
        <field>Case_Last_Rejected_by_User_Type__c</field>
        <formula>$UserRole.DeveloperName</formula>
        <name>Update Case Last Rejected User type</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Case_Notifiction_field</fullName>
        <field>Notify_Owner_on_Case_Comment__c</field>
        <literalValue>0</literalValue>
        <name>Update Case Notifiction field</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Case_RecordType_to_Resolved</fullName>
        <description>Update Case RecordType to Resolved Case Support</description>
        <field>RecordTypeId</field>
        <lookupValue>Resolved_Case_Support</lookupValue>
        <lookupValueType>RecordType</lookupValueType>
        <name>Update Case RecordType to Resolved</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Case_Status_to_B35_Approved</fullName>
        <description>Update the case status to B35 Approved</description>
        <field>Status</field>
        <literalValue>B35 Approved</literalValue>
        <name>Update Case Status to B35 Approved</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Case_status_to_Resubmitted_for_CG</fullName>
        <description>Updates the Case status to Resubmitted for CGT approval</description>
        <field>Status</field>
        <literalValue>Resubmitted for CGT approval</literalValue>
        <name>Update Case status to Resubmitted for CG</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Date_Submitted_to_CGT</fullName>
        <description>Update the date when case is submitted/resubmitted to CGT</description>
        <field>Date_Submitted_to_CGT__c</field>
        <formula>Now()</formula>
        <name>Update Date Submitted to CGT</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_MSE_Approved_Date</fullName>
        <description>Stamps the MSE Approved date time on the Case object</description>
        <field>MES_Approved_Date__c</field>
        <formula>NOW()</formula>
        <name>Update MSE Approved Date</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_MSE_Approved_Date_Time</fullName>
        <description>Stamps the Date Time on the case object field</description>
        <field>MSE_Approved_Date_Time__c</field>
        <formula>NOW()</formula>
        <name>Update MSE Approved Date Time</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Status_CGT_Review_in_Process</fullName>
        <description>Update the status on case to CGT Review in Process</description>
        <field>Status</field>
        <literalValue>CGT review In process</literalValue>
        <name>Update Status CGT Review in Process</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Status_Submitted_for_B35_Approval</fullName>
        <description>Update the case status to Submitted for B35 Approval</description>
        <field>Status</field>
        <literalValue>Submitted for B35 approval</literalValue>
        <name>Update Status Submitted for B35 Approval</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Status_Submitted_for_CGT_approval</fullName>
        <description>Update the status to Submitted for CGT approval</description>
        <field>Status</field>
        <literalValue>Submitted for CGT approval</literalValue>
        <name>Update Status Submitted for CGT approval</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
        <reevaluateOnChange>true</reevaluateOnChange>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Status_to_B35_Updates_in_Process</fullName>
        <description>Update the status to B35 Updates in Process</description>
        <field>Status</field>
        <literalValue>B35 Updates In Process</literalValue>
        <name>Update Status to B35 Updates in Process</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Status_to_CGT_Approved</fullName>
        <description>Update the case status to CGT Approved</description>
        <field>Status</field>
        <literalValue>CGT Approved</literalValue>
        <name>Update Status to CGT Approved</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Status_to_CGT_Updates_in_Process</fullName>
        <description>Update the status to CGT Updates in Process</description>
        <field>Status</field>
        <literalValue>CGT updates In Process</literalValue>
        <name>Update Status to CGT Updates in Process</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Status_to_Completed</fullName>
        <description>Updates the status to be completed.</description>
        <field>Status</field>
        <literalValue>Completed</literalValue>
        <name>Update Status to Completed</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Status_to_MSE_Approved</fullName>
        <description>Update Case Status to MSE Approved</description>
        <field>Status</field>
        <literalValue>MSE Approved</literalValue>
        <name>Update Status to MSE Approved</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Status_to_MSE_Updates_in_Process</fullName>
        <field>Status</field>
        <literalValue>MSE updates In process</literalValue>
        <name>Update Status to MSE Updates in Process</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_Status_to_Rejected</fullName>
        <field>Status</field>
        <literalValue>Rejected</literalValue>
        <name>Update Status to Rejected</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Literal</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_channel_end_date</fullName>
        <description>Update the channel end date on the MSE Case.</description>
        <field>Channel_End_Date__c</field>
        <formula>Campaign_Channel__r.Channel_Communication_End_Date__c</formula>
        <name>Update channel end date</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_channel_start_date</fullName>
        <description>Update the channel start date on the MSE Case.</description>
        <field>Channel_Start_Date__c</field>
        <formula>Approval_Collection__r.Asset_Go_Live__c</formula>
        <name>Update channel start date</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_owner_to_CGT_Queue</fullName>
        <field>OwnerId</field>
        <lookupValue>CGT_Queue</lookupValue>
        <lookupValueType>Queue</lookupValueType>
        <name>Update owner to CGT Queue</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_owner_to_CGT_Team_Lead</fullName>
        <description>Update the owner to CGT Team Lead</description>
        <field>OwnerId</field>
        <lookupValue>testuser@myorg.com</lookupValue>
        <lookupValueType>User</lookupValueType>
        <name>Update owner to CGT Team Lead</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>LookupValue</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_the_Case_Last_Approved_By_Id</fullName>
        <description>Stamps the last case approved by id</description>
        <field>Case_Last_Approved_By_Id__c</field>
        <formula>$User.Id</formula>
        <name>Update the Case Last Approved By Id</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <fieldUpdates>
        <fullName>Update_the_case_rejected_by_user_id</fullName>
        <field>Case_Last_Rejected_By_Id__c</field>
        <formula>$User.Id</formula>
        <name>Update the case rejected by user id</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <rules>
        <fullName>Assign OG case owner to queue</fullName>
        <actions>
            <name>Assign_OG_case_owner_to_queue</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <booleanFilter>1 OR 2 OR 3</booleanFilter>
        <criteriaItems>
            <field>Case.RecordTypeId</field>
            <operation>equals</operation>
            <value>Offer Governance Review</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.RecordTypeId</field>
            <operation>equals</operation>
            <value>Offer Governance Support</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.RecordTypeId</field>
            <operation>equals</operation>
            <value>Offer Governance CBO/Mods</value>
        </criteriaItems>
        <triggerType>onCreateOnly</triggerType>
    </rules>
    <rules>
        <fullName>Assign Submitted Support Case</fullName>
        <actions>
            <name>Assign_Case_to_SampleProject_Support</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Case.RecordTypeId</field>
            <operation>equals</operation>
            <value>SampleProject Support</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.Status</field>
            <operation>equals</operation>
            <value>Submitted</value>
        </criteriaItems>
        <description>When a SampleProject Support case Status is set to Submitted assign the Case to the SampleProject Support Queue</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Case Change Request Record Type Queue Set and Email Notification</fullName>
        <actions>
            <name>Change_Request_Record_Type_Email_Notification</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>Change_Request_Record_Type_Queue_Set</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>Sets a Change Request Case&apos;s Owner to the CMT Queue upon creation</description>
        <formula>AND(RecordType.DeveloperName = &apos;Change_Request&apos;, ISBLANK(Owner:Queue.OwnerId))</formula>
        <triggerType>onCreateOnly</triggerType>
    </rules>
    <rules>
        <fullName>Case Initiated</fullName>
        <actions>
            <name>SUPPORT_Case_Initiation_Confirmation</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Case.RecordTypeId</field>
            <operation>equals</operation>
            <value>SampleProject Support</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.Reopened_Case__c</field>
            <operation>equals</operation>
            <value>False</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.Status</field>
            <operation>notEqual</operation>
            <value>Draft</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.Operational_Tier_3__c</field>
            <operation>notEqual</operation>
            <value>Retry Failure</value>
        </criteriaItems>
        <triggerType>onCreateOnly</triggerType>
    </rules>
    <rules>
        <fullName>Case Reopen Confirmation</fullName>
        <actions>
            <name>SUPPORT_Case_Reopen_Confirmation</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Case.RecordTypeId</field>
            <operation>equals</operation>
            <value>SampleProject Support</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.Reopened_Case__c</field>
            <operation>equals</operation>
            <value>True</value>
        </criteriaItems>
        <triggerType>onCreateOnly</triggerType>
    </rules>
    <rules>
        <fullName>Case%3A Prospect Direct Mail Case Created</fullName>
        <actions>
            <name>Case_Prospect_DM_Segment_Change_CMT</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>Case_Prospect_DM_Segment_Change_Marketer</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Case.RecordTypeId</field>
            <operation>equals</operation>
            <value>Prospect Direct Mail</value>
        </criteriaItems>
        <description>Fires whenever a Prospect Direct Mail Case is created.</description>
        <triggerType>onCreateOnly</triggerType>
    </rules>
    <rules>
        <fullName>Change Record Type to Resolved Case Support</fullName>
        <actions>
            <name>Update_Case_RecordType_to_Resolved</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>Change Record Type to Resolved Case Support</description>
        <formula>AND(ISCHANGED(Status) , ISPICKVAL(Status,&quot;Resolved&quot;) )</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Comments added for Case</fullName>
        <actions>
            <name>MSE_Marketer_for_updates</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <description>Send an email to the owner if comments are added to the case</description>
        <formula>ISCHANGED(OwnerId) &amp;&amp; LEFT(OwnerId ,3) = &apos;005&apos; &amp;&amp; RecordType.DeveloperName = &apos;MSE_Request&apos;  &amp;&amp;  NOT(ISBLANK(Latest_Case_Comment__c))</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Create Construct or CBO%2FMod Inquiry</fullName>
        <actions>
            <name>Change_Record_Type_To_CBO_Mods</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <formula>TEXT(Inquiry_Type__c) = &apos;CBO/MODS Inquiry&apos;</formula>
        <triggerType>onCreateOnly</triggerType>
    </rules>
    <rules>
        <fullName>Email channel rejection email</fullName>
        <actions>
            <name>Campaign_Channel_Revision_Required_email_template</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>Action_Needed_Email_Channel_Changes_re_submitted_Due_Immediate</name>
            <type>Task</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Case.Status</field>
            <operation>equals</operation>
            <value>Revision Required,Rollback Revisions Required</value>
        </criteriaItems>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <rules>
        <fullName>Is Owner a Queue</fullName>
        <actions>
            <name>MSE_queue_assignment_for_Case</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>Update_Case_Notifiction_field</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>Send an email to the owner if its a queue and MSE record type.</description>
        <formula>OwnerId  != null &amp;&amp; RecordType.DeveloperName = &apos;MSE_Request&apos; &amp;&amp;  Notify_Owner_on_Case_Comment__c</formula>
        <triggerType>onCreateOnly</triggerType>
    </rules>
    <rules>
        <fullName>Is Owner a User</fullName>
        <actions>
            <name>MSE_Member_to_case_assignment</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <description>Send an email to the owner if its a user and MSE record type.</description>
        <formula>OwnerId  != null &amp;&amp;  LEFT(OwnerId ,3) = &apos;005&apos;  &amp;&amp;             RecordType.DeveloperName = &apos;MSE_Request&apos; &amp;&amp; ISCHANGED(OwnerId) &amp;&amp; ISBLANK(Latest_Case_Comment__c)</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Notify Case Owner of the Case Comment</fullName>
        <actions>
            <name>Notify_Case_Owner</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>Uncheck_Notify_Owner_on_Case</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>US1204068 - Workflow rule to notify the case owner.</description>
        <formula>ISCHANGED(Latest_Case_Comment__c) &amp;&amp;  Notify_Owner_on_Case_Comment__c</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Prospect DM Change Emails</fullName>
        <actions>
            <name>Prospect_DM_Change_Email_to_CMT</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>Prospect_DM_Change_Email_to_MES</name>
            <type>Alert</type>
        </actions>
        <actions>
            <name>Prospect_DM_Change_Email_to_Marketer</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <criteriaItems>
            <field>Case.RecordTypeId</field>
            <operation>equals</operation>
            <value>Campaign Management Team</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.What_can_we_help_you_with__c</field>
            <operation>equals</operation>
            <value>Prospect Direct Mail Changes</value>
        </criteriaItems>
        <triggerType>onCreateOnly</triggerType>
    </rules>
    <rules>
        <fullName>Resubmitted for CGT approval</fullName>
        <actions>
            <name>Update_Case_status_to_Resubmitted_for_CG</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <description>Case status is updated to &apos;Resubmitted for CGT approval&apos; when MSE team member resubmits the Case after it was rejected by CGT Team</description>
        <formula>AND(TEXT(Status) = &apos;Submitted for CGT approval&apos;,TEXT(PRIORVALUE(Status)) = &apos;CGT updates In Process&apos;)</formula>
        <triggerType>onAllChanges</triggerType>
    </rules>
    <rules>
        <fullName>Send Email Alert to Offer Governance Queue</fullName>
        <actions>
            <name>Send_email_to_OG_Queue</name>
            <type>Alert</type>
        </actions>
        <active>true</active>
        <booleanFilter>1 OR 2 OR ( 3 AND 4 )</booleanFilter>
        <criteriaItems>
            <field>Case.RecordTypeId</field>
            <operation>equals</operation>
            <value>Offer Governance Support</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.RecordTypeId</field>
            <operation>equals</operation>
            <value>Offer Governance CBO/Mods</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.RecordTypeId</field>
            <operation>equals</operation>
            <value>Offer Governance Review</value>
        </criteriaItems>
        <criteriaItems>
            <field>Case.Communication_Status__c</field>
            <operation>notEqual</operation>
            <value>OG Approved</value>
        </criteriaItems>
        <description>Alert the Offer Governance Queue when a new OG support case is created</description>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
    <tasks>
        <fullName>Action_Needed_Email_Channel_Changes_re_submitted_Due_Immediate</fullName>
        <assignedTo>Email_Channel_Team</assignedTo>
        <assignedToType>role</assignedToType>
        <dueDateOffset>0</dueDateOffset>
        <notifyAssignee>false</notifyAssignee>
        <priority>High</priority>
        <protected>false</protected>
        <status>Not Started</status>
        <subject>Action Needed:  Email Channel Changes re-submitted. Due: Immediate</subject>
    </tasks>
</Workflow>
