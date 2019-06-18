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
import * as authUtil from '../../../shared/authUtil';

export default class Query extends SfdxCommand {
    public static description = 'Executes a SOQL query via the Tooling API';

    public static examples = [
        'sfdx adp:rest:query -e https://myinstance.com -a myaccesstoken -q "SELECT Id, Name FROM Account limit 5"',
        'sfdx adp:rest:query -e https://myinstance.com -a myaccesstoken -q "SELECT Id, Name FROM Account limit 5" -m 100'
    ];

    protected static flagsConfig = {
        query: {type: 'string', char: 'q', required: true, description: 'SOQL query string'},
        maxfetch: {type: 'number', char: 'm', required: false, description: 'Max records to fetch'},
        accesstoken: {type: 'string', char: 'a', required: true, description: 'OAuth access token with bang (!) escaped'},
        endpoint: {type: 'string', char: 'e', required: true, description: 'Salesforce SOAP API endpoint'}
    };

    protected static requiresUsername = false;
    protected static requiresProject = false;

    // tslint:disable-next-line:no-any
    public async run(): Promise<any> {

        const query = this.flags.query;
        const records = [];
        const maxFetch = this.flags.maxfetch ? this.flags.maxfetch : 25;

        const conn = authUtil.createConnection({
            instanceUrl: this.flags.endpoint,
            accessToken: this.flags.accesstoken.replace('\\!', '!')
        });

        await conn.query(query)
            .on('record', record => {
                records.push(record);
            })
            .on('error', error => {
                console.log('Error from query:', error);
            })
            .run({ autoFetch: true, maxFetch });

        return records;
    }
}
