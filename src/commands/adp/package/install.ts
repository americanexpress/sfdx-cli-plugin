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
import { isNullOrUndefined } from 'util';
import pkg = require('../../../helpers/packageHelper');
import * as org from '../../../shared/orgUtil';

export default class Install extends SfdxCommand {
    public static description = 'Installs the current package and/or its dependencies';

    public static examples = [
        'sfdx adp:package:install',
        'sfdx adp:package:install -u xfrom1',
        'sfdx adp:package:install -u xfrom1 -l'
    ];

    protected static flagsConfig = {
        allpackages: { char: 'a', type: 'boolean', default: false, description: 'All packages, not just dependencies'},
        versionbias: {
            char: 'b', type: 'enum', description: 'Type of bias to use when determining package versions (Latest|Released)',
            options: ['Latest', 'Released']
        },
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

        const verbose = true;
        console.log('Retrieving package versions');
        const projectJsonObj = await pkg.getProjectJson();
        const dependencies = await pkg.getDependencies({
            projectJson: projectJsonObj,
            includeParent,
            verbose,
            versionBias: this.flags.versionbias
        });

        // TODO: Factor this out of the package commands and add to messages.
        if (dependencies === undefined) {
            this.ux.error(chalk.red('Failed to retrieve one or more dependency package versions.\nSee above error message.'));
            return;
        }

        process.stdout.write(`Retrieving installed dependencies from ${alias}... `);
        const dependencyVersions = await pkg.getInstalledDependencies(dependencies, username);
        console.log('done.');

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
                // Install or upgrade the package
                const versionOrId = isNullOrUndefined(pkgVersion.installationVersion) ? pkgVersion.installationVersionId : `v${pkgVersion.installationVersion}`;
                process.stdout.write(`Installing ${pkgVersion.name} ${versionOrId} ${releasedStr}... `);
                const installCmd = `sfdx force:package:install -r -p ${pkgVersion.installationVersionId} -u ${username} --json --wait 20`;
                let installRespJson;
                try {
                    installRespJson = childproc.execSync(installCmd, { encoding: 'utf8', stdio: 'pipe'});
                    const installResp = JSON.parse(installRespJson);
                    if (installResp.status === 0 && installResp.result.Status.toUpperCase() === 'SUCCESS') {
                        console.log('done.');
                    }
                } catch (e) {
                    console.log(chalk.red('failed.'));
                    errors.push(installRespJson);
                    break;
                }
            }
        } // end for

        // Display end-of-process message
        const endMsgStart: string = 'Installation';
        let endMsg: string = '';
        if (errors.length > 0) {
            endMsg = chalk.red(`${endMsgStart} completed with errors.`);
        } else {
            endMsg = chalk.green(`${endMsgStart} completed successfully.`);
        }
        this.ux.log(endMsg);
    }
}

function buildConfirmMessage(flags, alias: string) {

    let message: string = '';

    if (!flags.noprompt) {
        if (flags.allpackages && flags.versionbias === 'Latest') {
            message = `About to install ALL LATEST packages, including parent on ${chalk.magenta(alias)}. Cotinue?`;
        } else if (flags.allpackages && flags.versionbias === 'Released') {
            message = `About to install ALL LATEST RELEASED package, including parent on ${chalk.magenta(alias)}. Continue?`;
        } else if (flags.versionbias === 'Latest') {
            message = `About to install LATEST DEPENDENCY packages on ${chalk.magenta(alias)}. Continue?`;
        } else if (flags.versionbias === 'Released') {
            message = `About to install LATEST RELEASED DEPENDENCY packages on ${chalk.magenta(alias)}. Continue?`;
        } else if (flags.allpackages) {
            message = `About to install ALL packages AS CONFIGURED on ${chalk.magenta(alias)}. Continue?`;
        } else {
            message = `About to install DEPENDENCY packages AS CONFIGURED on ${chalk.magenta(alias)}. Continue?`;
        }
    }

    return message;
}
