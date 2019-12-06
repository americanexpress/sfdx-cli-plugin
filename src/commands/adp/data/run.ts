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
import { flags, SfdxCommand } from '@salesforce/command';
import chalk from 'chalk';
import { execSync } from 'child_process';
import * as inquirer from 'inquirer';
import * as path from 'path';
import * as th from '../../../helpers/talendHelper';
import * as cliCommand from '../../../shared/cliCommand';
import * as consts from '../../../shared/constants';
import * as logger from '../../../shared/logger';
import * as orgUtil from '../../../shared/orgUtil';
import * as pluginConfig from '../../../shared/pluginConfig';

export default class Run extends SfdxCommand {
    public static description = `Runs a job to retrieve from or push data to an org.
Available Job Types: get, put, delete
`;

    public static examples = [
        `sfdx adp:data:run
        // Runs job in interactive mode (easiest)
        `,
        `sfdx adp:data:run -c a1_get_visibility_rules -p mypassword
        // Runs job without user interaction
        `
    ];

    protected static flagsConfig = {
        classname: flags.string({ char: 'c', description: 'Java class name of job to run'}),
        sandboxpassword: flags.string({ char: 'p', description: 'Password for target org if sandbox' })
    };

    protected static requiresUsername = true;
    protected static requiresProject = false;

    // tslint:disable-next-line:no-any
    public async run(): Promise<any> {

        const args: th.DataJobArgs = {
            orgType: null,
            dataTypes: [],
            instanceUrl: null,
            jobType: null,
            sfUsername: null,
            sfPassword: null,
            argValidator: null
        }

        // Load config file plugin-config.json and validate
        logger.start('Reading configuration information');
        const configDirs = pluginConfig.getConfigDirs();
        const adpCfg = pluginConfig.get(configDirs);
        logger.done();

        if (adpCfg.error) {
            this.ux.log(chalk.red(adpCfg.error));
            return;
        }
        const configErrorMsg = pluginConfig.validate(adpCfg, ['talendSettings']);
        if (configErrorMsg.trim() !== '') {
            this.ux.log(chalk.red(configErrorMsg));
            return;
        }

        // Get the individual job directories
        const devDir = process.env.REPO;
        const uberJar = adpCfg.talendSettings.uberJar;
        const jarPath = path.normalize(adpCfg.talendSettings.jarDir.replace('$REPO', devDir) + uberJar);
        const talendProjectName = adpCfg.talendSettings.talendProjectName;
        const classPaths = await th.readMainClassesFromJar(jarPath, talendProjectName);
        let retVal;

        const username = this.org.getUsername();

        // Collect input values
        if (this.flags.classname || this.flags.sandboxpassword) {

            logger.start('Reading org list');
            const orgJson = orgUtil.runForceOrgList();
            const orgType: string = orgUtil.getOrgTypeByUsername(username, orgJson);
            logger.done();

            validateFlags(this.flags, orgType);

            args.orgType = orgType;
            args.classPath = th.filterClassPathsByName(classPaths, this.flags.classname);
            args.jobType = this.flags.jobtype;
            args.dataTypes[0] = this.flags.datatype;
            args.argValidator = th.validateArgs;
            args.sfUsername = username;
            args.sfPassword = this.flags.sandboxpassword;

            if (orgType === consts.ORG_TYPE_SANDBOX) {
                args.sfPassword = this.flags.sandboxpassword;
            } else if (orgType === consts.ORG_TYPE_SCRATCH) {
                const scratchOrgDetail = orgUtil.getScratchOrgDetail(args.sfUsername);
                args.instanceUrl = scratchOrgDetail.instanceUrl;
            } else {
                throw new Error('Org not found.');
            }

            // Build the command string
            logger.start('Building Talend JAR command');
            const commandStr: string = th.buildTalendJarCommand(args, adpCfg);
            logger.done();

            // Execute the command synchronously
            cliCommand.runCmd(commandStr);

        } else {

            // Prompt all inputs
            const orgTypes = th.buildOrgTypeArray();
            const validJobTypes = th.buildAdminDataJobTypeArray();
            const responses = await inquirer.prompt([{
                name: 'orgType',
                message: 'Select org type: ',
                type: 'list',
                choices: orgTypes
            },
            {
                name: 'scratchOrg',
                message: 'Select scratch org: ',
                type: 'list',
                choices: resp => {
                    let choices = [{name: 'none', value: 'none'}];
                    if (resp.orgType === th.OrgType.ScratchOrg) {
                        this.ux.startSpinner('Retrieving active scratch orgs');
                        choices = orgUtil.getActiveScratchOrgs();
                        this.ux.stopSpinner('done');
                    }
                    return choices;
                },
                when: resp => resp.orgType === th.OrgType.ScratchOrg
            },
            {
                name: 'jobType',
                message: 'Select job type: ',
                type: 'list',
                choices: validJobTypes
            },
            {
                name: 'dataType',
                message: 'Select a data type: ',
                type: 'checkbox',
                choices: resp => th.buildAdminDataClassArray(classPaths, resp.jobType),
                validate: x => {
                    return x.length === 0 ? 'Select at least 1 data type' : true;
                }
            },
            {
                name: 'sfUsername',
                message: 'Enter SF username: ',
                default: adpCfg.talendSettings.dataOrgUsername,
                type: 'input',
                when: resp => resp.orgType === th.OrgType.Sandbox
            },
            {
                name: 'sfPassword',
                message: 'Enter SF password: ',
                type: 'password',
                validate: x => {
                    return x === '' ? 'SF password is required' : true;
                },
                when: resp => resp.orgType === th.OrgType.Sandbox
            }
            ]);

            args.orgType = responses.orgType;
            args.jobType = responses.jobType;
            args.dataTypes = responses.dataType;
            args.argValidator = th.validateArgs;
            args.sfPassword = responses.sfPassword;
            if (responses.orgType === th.OrgType.Sandbox) {
                // Sandbox
                args.sfUsername = responses.sfUsername;
            } else {
                // Scratch Org
                const scratchOrgDetail = orgUtil.getScratchOrgDetail(responses.scratchOrg);
                args.instanceUrl = scratchOrgDetail.instanceUrl;
                args.sfUsername = scratchOrgDetail.username;
            }

            th.validateArgs(args);
            th.validateTargetOrg(args, adpCfg.restrictedOrgs);
            const status: string = th.buildStatusString(args, adpCfg);
            console.log(`${status}...`);

            let jobCount = 0;
            const dataJobErrors: Array<[string, string]> = new Array();

            // Loop through data types (class paths)
            for (const dataType of args.dataTypes) {

                ++jobCount;

                args.dataTypes[0] = dataType;

                // Build the command string
                const commandStr: string = th.buildTalendJarCommand(args, adpCfg);
                const displayDataType = th.toDataTypeDisplayName(dataType, args.jobType);

                // Execute the command asynchronously
                this.ux.startSpinner(`Starting job ${jobCount} of ${args.dataTypes.length} - ${chalk.cyan(displayDataType)}`);

                let doneMessage: string = chalk.green('SUCCESS');
                try {
                    retVal = execSync(commandStr, { encoding: 'utf8' });
                } catch (error) {
                    dataJobErrors.push([displayDataType, error.message]);
                    doneMessage = chalk.red('ERROR');
                }

                this.ux.stopSpinner(doneMessage);

            }// end for

            if (dataJobErrors.length === 0) {
                this.ux.log(chalk.green('Jobs completed successfully.'));
            } else {
                this.ux.log(chalk.red(`Jobs completed with errors. See below.
                `));
                for (const err of dataJobErrors) {
                    this.ux.log(chalk.red(err[0]));
                    this.ux.log(err[1].replace(/Password=.+/, 'Password=*********'));
                }
            }
        }// end if

        return retVal;
    }
}

export function validateFlags(flags, orgType: string) {
    if (flags.classname && !flags.sandboxpassword) {
        throw new Error('Flag sandboxpassword (-p) is required when classname flag is set.');
    }

    if (!flags.classname && flags.sandboxpassword) {
        throw new Error('Flag classname (-c) is required when sandboxpassword flag is set.');
    }
}
