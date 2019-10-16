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
import pkg = require('../../../../helpers/packageHelper');
import * as org from '../../../../shared/orgUtil';

export default class List extends SfdxCommand {
    public static description = 'Compares install package versions with version specified in sfdx-project.json';

    public static examples = [
        `sfdx adp:package:installed:list -u xfrom1
        // Lists the dependencies and the install status of each for the specified target username
        `
    ];

    protected static flagsConfig = {
        allpackages: { char: 'a', type: 'boolean', default: false, description: 'All packages, not just dependencies'}
    };

    protected static requiresUsername = true;
    protected static requiresProject = true;

    // tslint:disable-next-line:no-any
    public async run(): Promise<any> {

        const includeParent: boolean = this.flags.allpackages;
        const username = this.org.getUsername();
        const alias = org.getAliasByUsername(username);

        process.stdout.write('Retrieving package versions for the current project... ');
        const projectJsonObj = await pkg.getProjectJson();
        const dependencies = await pkg.getDependencies({
                                projectJson: projectJsonObj,
                                includeParent,
                                verbose: true,
                                versionBias: null
                            });
        this.ux.log('done.');

        // TODO: Factor this out of the package commands and add to messages.
        if (dependencies === undefined) {
            this.ux.error(chalk.red('Failed to retrieve one or more dependency package versions.\nSee above error message.'));
            return;
        }

        // Retrieve list of installed dependencies based on sfdx-project.json
        process.stdout.write(`Retrieving installed packages from ${chalk.magenta(alias)}... `);
        const installedDepends = await pkg.getInstalledDependencies(dependencies, username);
        this.ux.log('done.');

        // Create the table to display
        const table: pkg.TableData = pkg.buildInstalledTable(installedDepends);
        this.ux.table(table.rows, table.options);
        return installedDepends;
    }
}
