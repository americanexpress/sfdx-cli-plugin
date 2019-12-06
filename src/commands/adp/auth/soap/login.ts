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
import * as auth from '../../../../shared/authUtil';

export default class Login extends SfdxCommand {
    public static description = 'Authenticates a user via the SOAP API.';

    public static examples = [
        'sfdx adp:auth:soap:login -u myusername -p mypassword'
    ];

    protected static flagsConfig = {
        username: flags.string({char: 'u', description: 'Salesforce username'}),
        password: flags.string({char: 'p', description: 'Salesforce login password'}),
        loginurl: flags.string({char: 'r', description: 'Salesforce login URL'})
    };

    protected static requiresUsername = false;
    protected static requiresProject = false;

    // tslint:disable-next-line:no-any
    public async run(): Promise<any> {

        const username = this.flags.username;
        const password = this.flags.password;
        const loginUrl = this.flags.loginurl;

        const result = await auth.login(username, password, loginUrl);
        return result;
    }
}
