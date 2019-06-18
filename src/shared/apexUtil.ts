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
import * as fs from 'fs';
import * as path from 'path';
import * as cli from './cliCommand';

/**
 * Builds array of commands to run anonymous Apex files
 * @param apexScriptPath Absolute path to the directory containing anonymous apex files to run
 */
export function buildRunCommandsFromPath(username: string, apexScriptPath: string): cli.CLICommand[] {

    const retArr: cli.CLICommand[] = [];
    const anonApexPath = path.normalize(apexScriptPath);
    if (fs.existsSync(anonApexPath)) {

        const files: string[] = fs.readdirSync(anonApexPath);
        files.forEach(file => {
            const filePath = path.normalize(`${anonApexPath}/${file}`);
            const cmd: cli.CLICommand = {
                commandString: 'sfdx force:apex:execute',
                args: ['-u', username, '-f', `"${filePath}"`],
                errors: []};
            retArr.push(cmd);
        });
    }
    return retArr;
}
