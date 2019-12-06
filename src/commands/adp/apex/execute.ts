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
import * as path from 'path';
import * as apexUtil from '../../../shared/apexUtil';
import * as cli from '../../../shared/cliCommand';
import * as project from '../../../shared/project';

export default class Execute extends SfdxCommand {
    public static description = 'Iterates through and executes apex files in the specified directory';

    public static examples = [
        `sfdx adp:apex:execute -d deploy/scripts -u myorg
        // Executes the files in the scripts directory for the target alias, myorg
        `
    ];

    protected static flagsConfig = {
        directory: flags.boolean({char: 'd', required: true, default: false,
                            description: 'path to directory containing Apex code files'})
    };

    protected static requiresUsername = true;
    protected static requiresProject = true;

    // tslint:disable-next-line:no-any
    public async run(): Promise<any> {

        const username = this.org.getUsername();

        // Get apex directory absolute path
        const projectPath = await project.getAbsolutePath();
        const apexPath = path.normalize(`${projectPath}/${this.flags.directory}`);

        const commandsToRun: cli.CLICommand[] = [];
        const apexCommands = apexUtil.buildRunCommandsFromPath(username, apexPath);
        apexCommands.forEach(cmd => commandsToRun.push(cmd));
        cli.runAll(commandsToRun, cli.runCmd);
    }
}
