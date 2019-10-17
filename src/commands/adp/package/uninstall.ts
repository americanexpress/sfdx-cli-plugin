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
import { SfdxCommand } from '@salesforce/command';
import chalk from 'chalk';
import childproc = require('child_process');
import * as inquirer from 'inquirer';
import pkg = require('../../../helpers/packageHelper');
import * as org from '../../../shared/orgUtil';

export default class Uninstall extends SfdxCommand {
    public static description = 'Uninstalls the current package and/or its dependencies';

    public static examples = [
        'sfdx adp:package:uninstall',
        'sfdx adp:package:uninstall -u xfrom1',
        'sfdx adp:package:uninstall --noprompt'
    ];

    protected static flagsConfig = {
        noprompt: {type: 'boolean', description: 'disables all prompts'}
    };

    protected static requiresUsername = true;

    protected static requiresProject = true;

    // tslint:disable-next-line:no-any
    public async run(): Promise<any> {

        const username = this.org.getUsername();
        const alias = org.getAliasByUsername(username);

        this.ux.log('Retrieving installed packages... ');

        // Get the list of installed packages in uninstall order
        const uninstallArr: pkg.PackageVersionBasic[] = await org.getInstalledPackages(username);

        if (uninstallArr.length === 0) {
            this.ux.log('Nothing to uninstall.');
            return;
        }

        // Display to the user
        if (!this.flags.noprompt) {
            for (const pv of uninstallArr) {
                this.ux.log(`${pv.name} - ${pv.version}`);
            }
        }

        let continueConfirmed: boolean = true;

        // Show confirm prompt
        if (!this.flags.noprompt) {

            const responses = await inquirer.prompt([{
                name: 'confirmContinue',
                message: `Uninstall the above packages from ${chalk.magenta(alias)}?`,
                type: 'confirm',
                default: true
            }]);
            continueConfirmed = responses.confirmContinue;
        }

        if (!continueConfirmed) {
            return;
        }

        this.ux.log(chalk.gray('Uninstalling unlocked packages...'));

        const errors: string[] = new Array();

        // Loop through the package versions to uninstall
        for (const toUninstall of uninstallArr) {

            // Build the uninstall command
            process.stdout.write(`Uninstalling ${toUninstall.name} v${toUninstall.version}... `);
            const uninstallCmd = `sfdx force:package:uninstall -p ${toUninstall.id} -u ${username} --json -w 30`;
            let uninstallRespJson;
            try {
                // Try to execute the uninstall command
                uninstallRespJson = childproc.execSync(uninstallCmd, {encoding: 'utf8'});
                const uninstallResp = JSON.parse(uninstallRespJson);
                if (uninstallResp.status === 0 && uninstallResp.result.Status.toUpperCase() === 'SUCCESS') {
                    this.ux.log('done.');
                }
            } catch (err) {
                // Display error message
                this.ux.log();
                const consolidatedErrMsg = 'Component is in use by another component';
                if (err.message.includes(consolidatedErrMsg)) {
                    this.ux.error(chalk.red(`Unable to uninstall. ${consolidatedErrMsg}.`));
                } else {
                    this.ux.error('Unexpected error.');
                }
                return;
            }
        }
        // Display end-of-process message
        const endMsgStart: string = 'Uninstall completed';
        let endMsg: string = '';
        if (errors.length > 0) {
            endMsg = chalk.red(`${endMsgStart} with errors.`);
        } else {
            endMsg = chalk.green(`${endMsgStart} successfully.`);
        }
        this.ux.log(endMsg);
    }
}
