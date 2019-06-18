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
import chalk from 'chalk';
import { execSync } from 'child_process';
import { ScratchOrg } from '../shared/orgUtil';

export interface StatusCheckOptions {
    maxTries: number;
    taskName: string;
}

/**
 * Executes a status command until a successful result is returned
 * @param statusCommand SFDX status command to execute
 * @param onError Callback function to call when an error occurs
 * @param options StatusCheckOptions object
 */
export function checkStatusUntilDone(statusCommand: string, onError, options?: StatusCheckOptions) {

    let tryCount = 0;
    let keepTrying = true;
    const maxTries = options.maxTries ? options.maxTries : 25;

    // Poll report until success
    do {
        tryCount++;
        const LSHIFT = '\b\b\b';
        process.stdout.write(`${LSHIFT}${tryCount.toLocaleString('en', { minimumIntegerDigits: 2 })} `);

        let statusRespJson = null;
        try {
            statusRespJson = execSync(statusCommand, {encoding: 'utf8'});

            const statusResp = JSON.parse(statusRespJson);
            const status = statusResp.result.Status;

            const ucaseStatus = status.toUpperCase();
            if (ucaseStatus === 'SUCCESS') {
                console.log(chalk.green(ucaseStatus));
                keepTrying = false;
            } else if (tryCount >= maxTries) {
                onError();
                console.log(chalk.red(`${LSHIFT}Failed after ${tryCount} status checks. Check email for error.`));
                keepTrying = false;
            }

        } catch (err) {
            let taskName = 'Task';
            if (options && options.taskName) {
                taskName = options.taskName;
            }
            console.log(chalk.red(`${taskName} failed. Check your email for error details.`));
            onError();
            keepTrying = false;
        }

    } while (keepTrying);
}

/**
 * Checks for a new org returned by force:org:list
 * @param initialUsernames Usernames returned by force:org:list initially
 * @param maxPolls Max number of times to check
 * @param quietMode Prevents output to console if TRUE
 */
export function checkOrgCountUntilIncremented(initialUsernames, maxPolls: number, quietMode: boolean) {

    let tryCount = 0;
    let keepTrying = true;
    const maxTries = maxPolls > 0 ? maxPolls : 10000;
    const initialOrgCount = initialUsernames.length;

    // Poll report until success
    let newScratchOrg;
    let resultScratchOrg: ScratchOrg;
    do {
        tryCount++;

        let orgCount: number = 0;
        const LSHIFT = '\b\b\b\b';
        if (!quietMode) process.stdout.write(`${LSHIFT}${tryCount.toLocaleString('en', { minimumIntegerDigits: 3 })} `);

        let orgListRespJson = null;
        try {
            orgListRespJson = execSync('sfdx force:org:list --json', { encoding: 'utf8' });
            const orgListResp = JSON.parse(orgListRespJson);
            const scratchOrgs = orgListResp.result.scratchOrgs;
            orgCount = scratchOrgs.length;

            if (orgCount > initialOrgCount) {
                // Get the new username
                newScratchOrg = scratchOrgs.filter(org => !initialUsernames.includes(org.signupUsername))[0];
                resultScratchOrg = {
                    instanceUrl: newScratchOrg.instanceUrl,
                    username: newScratchOrg.signupUsername,
                    password: null,
                    alias: null
                };
                writeLog(chalk.green('SUCCESS'), quietMode);
                keepTrying = false;
            } else if (tryCount >= maxTries) {
                writeLog(chalk.red(`${LSHIFT}Max status check count exceeded: ${maxTries}`), quietMode);
                keepTrying = false;
                return;
            }

        } catch (err) {
            const taskName = 'Scratch Org creation';
            writeLog(chalk.red(`${taskName} timed out.`), quietMode);
            keepTrying = false;
        }

    } while (keepTrying);

    return resultScratchOrg;

}

/**
 * Wrapper function for console.log
 * @param message Message to write
 * @param quietMode Bypasses output to console if TRUE
 */
function writeLog(message: string, quietMode: boolean) {
    if (!quietMode) {
        console.log(message);
    }
}
