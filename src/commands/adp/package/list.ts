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
import pkg = require('../../../helpers/packageHelper');

export default class List extends SfdxCommand {
    public static description = 'Lists the current package and all its dependencies';

    public static examples = [
        `sfdx adp:package:list
        // Lists the current package and all its dependent packages
        `,
        `sfdx adp:package:list -v
        // Lists the packages with extended details, e.g. actual version number, release status and subscriber version ID
        `,
        `sfdx adp:package:list -v -b my_branch
        // Lists the packages belonging to the specified branch`
    ];

    protected static flagsConfig = {
        allpackages: { char: 'a', type: 'boolean', default: false, description: 'all packages, not just dependencies'},
        versionbias: { char: 'b', type: 'enum', description: 'type of bias to use when determining package versions (Latest|Released)',
                options: ['Latest', 'Released']},
        verbose: { char: 'v', type: 'boolean', default: false, description: 'display extended package version details' }
    };

    protected static requiresUsername = false;
    protected static requiresProject = true;

    // tslint:disable-next-line:no-any
    public async run(): Promise<any> {

        const includeParent: boolean = this.flags.allpackages;
        this.ux.startSpinner('Retrieving package versions');
        const projectJsonObj = await pkg.getProjectJson();
        const dependencies = await pkg.getDependencies({
            projectJson: projectJsonObj,
            includeParent,
            versionBias: this.flags.versionbias,
            verbose: this.flags.verbose
        });
        this.ux.stopSpinner('done.');

        // TODO: Factor this out of the package commands and add to messages.
        if (!dependencies) {
            this.ux.error(chalk.red('Failed to retrieve one or more dependency package versions.\nSee above error message.'));
            return;
        }

        let table: pkg.TableData;

        if (this.flags.verbose) {
            table = pkg.buildVerboseTable(dependencies);
        } else {
            table = pkg.buildBasicTable(dependencies);
        }

        this.ux.table(table.rows, table.options);
        if (dependencies.findIndex(p => p.id.indexOf('0Ho') > -1) > -1) {
            this.ux.log(chalk.yellow('It is recommended to use the "04t" ID to specify all dependency versions.'));
        }
        return dependencies;
    }
}
