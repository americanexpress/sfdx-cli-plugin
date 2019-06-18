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
import * as fs from 'fs';
import { createBackupFile } from '../../../shared/fileUtil';
import { SourceMember } from '../../../shared/sourceUtil';
import src = require('../../../shared/sourceUtil');
import * as xmlUtil from '../../../shared/xmlUtil';
import { XmlMergeResult } from '../../../shared/xmlUtil';

import chalk from 'chalk';

export default class Destruct extends SfdxCommand {
    public static description = 'Generates a destructiveChanges.xml manifest';

    public static examples = [
        `sfdx adp:source:destruct -u myscratch
        // Generates a destructiveChanges.xml file for metadata deletions on the tracked org
        `
    ];

    protected static flagsConfig = {};

    protected static requiresUsername = true;

    protected static requiresProject = false;

    // tslint:disable-next-line:no-any
    public async run(): Promise<any> {

        const outputFilename: string = 'destructiveChangesPre.xml';

        const username: string = this.org.getUsername();
        this.ux.startSpinner('Retrieving deleted metadata');
        const deleted: SourceMember[] = await src.getDeletedComponents(username);
        this.ux.stopSpinner('done.');

        const outputDir: string = 'destructive';
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        const destructiveXml = `${outputDir}/${outputFilename}`;

        let bkpFilePath: string = '';
        if (fs.existsSync(destructiveXml)) {
            console.log(`Creating backup file for ${destructiveXml}`);
            bkpFilePath = createBackupFile(destructiveXml);
        }

        if (bkpFilePath !== '') {
            console.log(`Merging deleted source members into ${destructiveXml}`);

            const mergeResult: XmlMergeResult = await xmlUtil.mergeSourceMembersToXml(bkpFilePath, deleted);
            const mergedXml: string = await xmlUtil.sourceMembersToXML(mergeResult.sourceMembers);
            fs.writeFileSync(destructiveXml, mergedXml);
        } else {
            const xmlFormatted: string = await xmlUtil.sourceMembersToXML(deleted);
            fs.writeFileSync(destructiveXml, xmlFormatted);
        }

        // this.ux.log(chalk.green(`${deleted.length} components deleted.`));
        this.ux.log(chalk.green(`Generated ${outputFilename} successfully.`));
        return deleted;
    }

    public async showSpinner(msg: string) {
        if (!this.flags.json) {
            this.ux.startSpinner(chalk.gray(msg));
        }
    }

    public async hideSpinner(msg: string) {
        if (!this.flags.json) {
            this.ux.stopSpinner(chalk.gray(msg));
        }
    }
}
