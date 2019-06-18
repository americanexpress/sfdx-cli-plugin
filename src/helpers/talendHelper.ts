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
import * as path from 'path';
import { isNullOrUndefined } from 'util';
import * as zip from 'yauzl';

/**
 * Interface for JAR command arguments
 */
export interface DataJobArgs {
    classPath?: string;
    orgType: string;
    dataTypes: string[];
    instanceUrl: string;
    jobType: string;
    sfUsername: string;
    sfPassword: string;
    argValidator: (args: DataJobArgs) => void;
}

/**
 * Available data related operations
 */
export enum JobType {
    AdminDataGet = 'Get',
    AdminDataPut = 'Put',
    AdminDataDelete = 'Delete',
    OrgSetupData = 'Org Setup Data'
}

export enum OrgType {
    Sandbox = 'Sandbox',
    ScratchOrg = 'Scratch Org'
}

/**
 * Searches for .class files inside a JAR under the specified top-level folder
 * @param jarFilePath Path to JAR file
 * @param folderName Top-level folder in which to search
 * @returns Array of file names
 */
export function readMainClassesFromJar(jarFilePath: string, folderName: string): Promise<string[]> {
    return new Promise((fullfill, reject) => {

        const jarPath = jarFilePath;
        const paths: string[] = [];
        zip.open(jarPath, { lazyEntries: true }, (err, zipfile) => {
            if (err) reject(err);

            zipfile.readEntry();
            zipfile.on('entry', entry => {
                const regex = RegExp(`${folderName}/[\\w_/]+.class$`);
                if (regex.test(entry.fileName)) {
                    paths.push(entry.fileName);
                }
                zipfile.readEntry();
            });
            zipfile.once('end', () => fullfill(paths));
        });
    });

}

/**
 * Validates data job arguments and ensures data "puts" do not run in higher environments
 * @param args Data job arguments
 */
// TODO: Make upperEnvironments read from configuration file
export function validateArgs(args: DataJobArgs) {

    // Validate inputs
    if (!args.jobType && !args.classPath) {
        throw new Error('A valid job type or class path is required.');
    } else if (!args.classPath) {
        if (args.jobType !== JobType.OrgSetupData) {
            validateDataJobType(args.jobType);
        }
    }

    // Other validations
    if (args.jobType !== JobType.OrgSetupData && isNullOrUndefined(args.dataTypes)) {
        throw new Error('A valid data type is required.');
    }
    if (isNullOrUndefined(args.sfUsername)) throw new Error('A valid username is required.');
    if (isNullOrUndefined(args.sfPassword)) throw new Error('A valid password is required.');
    if (args.orgType === OrgType.ScratchOrg && isNullOrUndefined(args.instanceUrl)) {
        throw new Error('Instance URL is missing.');
    }
}

/**
 * Checks that admin data is not pushed to a restricted org
 * @param args Data job arguments
 * @param restrictedOrgs Array of restricted org usernames
 */
export function validateTargetOrg(args: DataJobArgs, restrictedOrgs: string[]) {

    // Ensure no data updates to higher environments
    if (!(args.jobType === JobType.AdminDataGet || args.jobType === JobType.OrgSetupData)
        && restrictedOrgs.includes(args.sfUsername)) {
        throw new Error('Data updates to higher environments is not allowed.');
    }
}

/**
 * Builds command string to run a Talend-generated JAR file
 * @param input Object containing command argument values
 * @param config Configuration settings
 */
export function buildTalendJarCommand(input: DataJobArgs, config): string {

    input.argValidator(input);
    const proxySettings = config.proxySettings;
    const talendSettings = config.talendSettings;

    if (input.orgType === OrgType.ScratchOrg && isNullOrUndefined(talendSettings.soapApiVersion)) {
        throw new Error('Missing Talend setting: soapApiVersion');
    }

    if (isNullOrUndefined(talendSettings.orgSetupDataClass)) {
        throw new Error('Missing Talend setting: orgSetupDataClass');
    }

    let mainClassPath = input.dataTypes ? input.dataTypes[0] : '';
    if (!mainClassPath) {
        mainClassPath = input.classPath;
    }
    const mainClassName = mainClassPath.replace(/\//g, '.').replace('.class', '');

    let cmd = `java -Dhttp.proxyPort=${proxySettings.httpProxyPort} -Dhttp.proxyHost=${proxySettings.httpProxyHost}`
        + ` -cp "${path.normalize(talendSettings.jarDependenciesDir)}`
        + `:${path.normalize(talendSettings.jarDir + '/' + talendSettings.uberJar)}"`
        + ` ${mainClassName}`
        + ` --context_param projDir=${path.normalize(talendSettings.projectDir + '/')}`;

    if (input.instanceUrl) {
        const webServiceUrl = `${input.instanceUrl}services/Soap/u/${talendSettings.soapApiVersion}`;
        cmd += ` --context_param Salesforce_WebServiceUrl=${webServiceUrl}`;
    }

    if (input.orgType === OrgType.ScratchOrg) {
        cmd += ' --context_param Salesforce_Suffix=.scratch';
    } else {
        const sb = input.sfUsername.split('.');
        cmd += ` --context_param Salesforce_Suffix=.${sb[sb.length - 1 ]}`;
    }
    cmd += ` --context_param Salesforce_UserName=${input.sfUsername}`
        + ` --context_param Salesforce_Password="${input.sfPassword}"`;

    return cmd;
}

/**
 * Converts absolute file paths to filtered list of cleaned data job display names
 * @param classPaths Absolute file paths
 * @param jobType Type of data job, e.g. get, put, delete
 */
export function buildAdminDataClassArray(classPaths: string[], jobType: string) {
    const filteredByJobType = classPaths.filter(cp => cp.indexOf(jobType.toLowerCase()) > -1);
    const hidePrefix = 'zz';
    const visible = filteredByJobType.filter(cp => !cp.includes(`/${hidePrefix}`));
    const validDataTypes = visible.map(cp => {
        const displayName = toDataTypeDisplayName(cp, jobType);
        return { name: displayName, value: cp };
    });
    return validDataTypes;
}

export function filterClassPathsByName(classPaths: string[], className: string) {
    const filteredByClassName = classPaths.filter(cp => cp.indexOf(className.toLowerCase()) > -1);
    return filteredByClassName[0];
}

/**
 * Converts a class file directory path to a display name to enable user selection
 * @param classPath Class path taken from JAR file
 * @param jobType The job type
 */
export function toDataTypeDisplayName(classPath: string, jobType: string) {

    let displayName = path.parse(classPath).name.replace(jobType.toLowerCase() + '_', '/');
    displayName = path.parse(displayName).name.replace(/_/g, ' ');
    const toTitleCase = s => s.split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
    displayName = toTitleCase(displayName);
    return displayName;
}

/**
 * Converts items in the JobType enum to an array of job types
 * @returns Array of strings
 */
export function buildAdminDataJobTypeArray(): string[] {
    const jobTypeArr = [];
    for (const key in JobType) {
        if (!isNullOrUndefined(key) && key.startsWith('AdminData')) {
            jobTypeArr.push(JobType[key]);
        }
    }
    return jobTypeArr;
}

/**
 * Converts OrgType enum items to an array of anonymous name-value objects
 */
export function buildOrgTypeArray() {
    const arr = [];
    for (const key in OrgType) {
        if (!/^\d+$/.test(key)) {
            const displayName = OrgType[key];
            arr.push({ name: displayName, value: displayName });
        }
    }
    return arr;
}

/**
 * Checks that the job type entered is considered valid.
 * @param jobType Job type to check
 */
function validateDataJobType(jobType: string) {
    const jobTypeArr: string[] = buildAdminDataJobTypeArray();
    if (!jobTypeArr.includes(jobType)) {
        throw new Error(`Invalid job type: ${jobType}`);
    }
}

/**
 * Builds data job status message
 * @param args DataJobArgs object
 * @param settings Configuration file ettings
 */
export function buildStatusString(args: DataJobArgs, config): string {
    let retVal = '';
    let action;
    let preposition;
    const dataDir = config.talendSettings.projectDir;
    const lcaseJobType = args.jobType.toLowerCase();
    switch (lcaseJobType) {
        case 'get':
            action = 'Retrieving';
            preposition = 'into';
            break;
        case 'put':
            action = 'Pushing';
            preposition = 'from';
            break;
        case 'delete':
            action = 'Deleting';
            preposition = 'from';
            retVal = `${action} data ${preposition} ${args.sfUsername}`;
            break;
        default:
            action = '';
            preposition = '';
    }

    if (retVal === '') {
        retVal = `${action} data ${preposition} ${dataDir} folder`;
    }

    return retVal;
}
