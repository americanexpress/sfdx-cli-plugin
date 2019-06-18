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

export default class PostDestruct extends SfdxCommand {
    public static description = 'Installs the current package and/or its dependencies';

    public static examples = [
        `sfdx adp:package:retrieve:postdestruct
        // Retrieves the "postdestruct" package from the org associated with the default username
        `,
        `sfdx adp:package:retrieve:postdestruct -u myalias
        // Retrieves the "postdestruct" package from the org having username/alias "myalias"
        `
    ];

    protected static requiresUsername = true;
    protected static requiresProject = true;

    // tslint:disable-next-line:no-any
    public async run(): Promise<any> {

        /**
         * Execute command to retrieve a change set or package called "postdestruct" from the org
         * and place the DX-formatted source into targetDir
         */
        const targetDir = 'deploy/post/postdestruct';
        mkdirp(targetDir);
        const targetUsername = this.org.getUsername();
        const commandStr = `sfdx adp:package:retrieve -p postdestruct -t "${targetDir}" -u ${targetUsername}`;
        execSync(commandStr, {encoding: 'utf8', stdio: 'inherit'});
    }
}
