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
import * as statusChecker from '../../../shared/statusChecker';

export default class Install extends SfdxCommand {
    public static description = 'Installs the current package and/or its dependencies';

    public static examples = [
        'sfdx adp:package:install',
        'sfdx adp:package:install -u xfrom1',
        'sfdx adp:package:install -u xfrom1 -l'
    ];

    protected static flagsConfig = {
        allpackages: { char: 'a', type: 'boolean', default: false, description: 'All packages, not just dependencies'},
        forcelatest: {char: 'l', type: 'boolean', default: false,
                        description: 'forces install of UN-released, latest package'},
        noprompt: {type: 'boolean', description: 'disables all prompts'}
    };

    protected static requiresUsername = true;

    protected static requiresProject = true;

    // tslint:disable-next-line:no-any
    public async run(): Promise<any> {

        const username = this.org.getUsername();
        const alias = org.getAliasByUsername(username);
        let continueInstall: boolean = true;

        if (!this.flags.noprompt) {

            const responses = await inquirer.prompt([{
                name: 'confirmContinue',
                message: buildConfirmMessage(this.flags, alias),
                type: 'confirm',
                default: true
            }]);
            continueInstall = responses.confirmContinue;
        }

        if (!continueInstall) {
            return;
        }

        const includeParent: boolean = this.flags.allpackages;
        const forceLatest: boolean = this.flags.forcelatest;

        const verbose = true;
        this.ux.startSpinner(chalk.gray('Retrieving package versions'));
        const projectJsonObj = await pkg.getProjectJson();
        const dependencies = await pkg.getDependencies({
            projectJson: projectJsonObj,
            includeParent,
            verbose,
            latestVersions: forceLatest
        });
        this.ux.stopSpinner(chalk.gray('done.'));

        // TODO: Factor this out of the package commands and add to messages.
        if (dependencies === undefined) {
            this.ux.error(chalk.red('Failed to retrieve one or more dependency package versions.\nSee above error message.'));
            return;
        }

        this.ux.startSpinner(chalk.gray(`Retrieving installed dependencies from ${alias}`));
        const dependencyVersions = await pkg.getInstalledDependencies(dependencies, username);
        this.ux.stopSpinner(chalk.gray('done.'));

        this.ux.log('Starting installation...');

        const errors: string[] = new Array();

        // Loop through the dependencies
        for (const pkgVersion of dependencyVersions) {

            const releasedStr = pkg.buildReleasedDisplayString(pkgVersion.released, pkgVersion.latestBuildNumber);

            if (pkgVersion.installed) {
                // Skip the install
                this.ux.log(`Skipped ${pkgVersion.name} v${pkgVersion.installedVersion} ${releasedStr}. Already installed.`);
            } else {
                // Install or upgrade the package
                this.ux.log(`Installing ${pkgVersion.name} v${pkgVersion.latestVersion} ${releasedStr}...`);
                const installCmd = `sfdx force:package:install -p ${pkgVersion.id} -u ${username} --json`;
                const installRespJson = childproc.execSync(installCmd, {encoding: 'utf8'});
                const installResp = JSON.parse(installRespJson);
                const requestId: string = installResp.result.Id;
                process.stdout.write('  Polling install status:    ');

                const statusCmd = `sfdx force:package:install:report -i ${requestId}  -u ${username} --json`;

                statusChecker.checkStatusUntilDone (statusCmd, () => { errors.push(pkgVersion.name); },
                    { maxTries: 25, taskName: 'Installation'});
            }
        } // end for

        // Display end-of-process message
        const endMsgStart: string = 'Installation completed';
        let endMsg: string = '';
        if (errors.length > 0) {
            endMsg = chalk.red(`${endMsgStart} with errors.`);
        } else {
            endMsg = chalk.green(`${endMsgStart} successfully.`);
        }
        this.ux.log(endMsg);
    }
}

function buildConfirmMessage(flags, alias: string) {

    let message: string = '';

    if (!flags.noprompt) {
        if (flags.allpackages && flags.forcelatest) {
            message = `About to install ALL LATEST packages, including parent on ${chalk.magenta(alias)}. Confirm?`;
        } else if (flags.allpackages) {
            message = `About to install ALL RELEASED package, including parent on ${chalk.magenta(alias)}. Confirm?`;
        } else if (flags.forcelatest) {
            message = `About to install LATEST DEPENDENCY packages on ${chalk.magenta(alias)}. Confirm?`;
        } else {
            message = `About to install RELEASED DEPENDENCY packages on ${chalk.magenta(alias)}. Confirm?`;
        }
    }

    return message;
}
