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
import * as fs from 'fs';
import rimraf = require('rimraf');

const tempDir = 'temp_mdapi_out';

export default class Get extends SfdxCommand {

    public static description = 'Retrieves a developer package, converts, and merges it into the local source';

    public static examples = [
        `sfdx adp:package:retrieve -p MyPackage -u OrgUserName
      // pulls the specified package from the org and converts/merges it into force-app
      `,
        `sfdx adp:package:retrieve -p MyPackage -u OrgUserName -t TargetDir
      // pulls a package from the org and converts/merges it into /TargetDir
      `,
        `sfdx adp:package:retrieve -p MyPackage -u OrgUserName -q
      // performs the retrieve-unzip-convert in Quiet mode, i.e without feedback
        `
    ];

    protected static requiresUsername = true;
    protected static requiresProject = true;

    // Note: Below descriptions should pull from JSON file under messages. XF

    protected static flagsConfig = {
        package: flags.string({ required: true, char: 'p', description: 'Package or change set to retrieve' }),
        quietmode: flags.boolean({ char: 'q', description: 'bypasses all user interaction', required: false }),
        target: flags.string({ char: 't', default: 'force-app', description: 'Destination directory for conversion output. Defaults to force-app.' })
    };

    // tslint:disable-next-line:no-any
    public async run(): Promise<any> {

        const quietMode: boolean = this.flags.quietmode;

        // Retrieve the package
        const retrieveCommand = `sfdx force:mdapi:retrieve -s -p "${this.flags.package}" -u ${this.org.getUsername()}  -r ./${tempDir} -w 10`;
        if (!quietMode) this.ux.startSpinner(chalk.gray('Retrieving developer package, ') + chalk.magenta(this.flags.package));

        try {
            execSync(retrieveCommand, { maxBuffer: 1000000 * 1024, encoding: 'utf8' });
        } catch (err) {
            console.log(err.message);
        }

        if (!quietMode) this.ux.stopSpinner(chalk.gray('done.'));

        // Unzip the package
        if (!quietMode) this.ux.startSpinner(chalk.gray('Unzipping the package'));
        execSync(`unzip -qqo ./${tempDir}/unpackaged.zip -d ./${tempDir}`, { encoding: 'utf8' });

        // Delete the zip file
        fs.unlinkSync(`${tempDir}/unpackaged.zip`);
        if (!quietMode) this.ux.stopSpinner(chalk.gray('done.'));

        // Convert to DX
        if (!quietMode) this.ux.startSpinner(chalk.gray('Converting to DX format'));

        const targetDir = this.flags.target;
        const commandStr = `sfdx force:mdapi:convert -r ./${tempDir} -d "${targetDir}"`;
        const convertResult = execSync(commandStr, { encoding: 'utf8' });

        if (!quietMode) this.ux.stopSpinner(chalk.gray('done.'));

        if (!quietMode && convertResult) {
            this.ux.log(convertResult);
        }

        // Delete temp directory
        rimraf(`./${tempDir}`, () => {
            // do nothing
        });

        return convertResult;
    }
}
