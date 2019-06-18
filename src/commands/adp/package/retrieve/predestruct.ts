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
import { execSync } from 'child_process';
import mkdirp = require('mkdirp');

export default class PreDestruct extends SfdxCommand {
    public static description = 'Installs the current package and/or its dependencies';

    public static examples = [
        `sfdx adp:package:retrieve:predestruct
        // Retrieves the "predestruct" package from the org associated with the default username
        `,
        `sfdx adp:package:retrieve:predestruct -u myalias
        // Retrieves the "predestruct" package from the org having username/alias "myalias"
        `
    ];

    protected static requiresUsername = true;
    protected static requiresProject = true;

    // tslint:disable-next-line:no-any
    public async run(): Promise<any> {

        const targetDir = 'deploy/pre/predestruct';
        /**
         * Execute command to retrieve a change set or package called "predestruct" from the org
         * and place the DX-formatted source into targetDir
         */
        mkdirp(targetDir);
        const targetUsername = this.org.getUsername();
        const commandStr = `sfdx adp:package:retrieve -p predestruct -t "${targetDir}" -u ${targetUsername}`;
        execSync(commandStr, {encoding: 'utf8', stdio: 'inherit'});
    }
}
