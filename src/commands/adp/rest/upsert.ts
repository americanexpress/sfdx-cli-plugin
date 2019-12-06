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
import * as authUtil from '../../../shared/authUtil';

export default class Upsert extends SfdxCommand {
    public static description = 'Executes an Upsert via the REST API';

    public static examples = [
        'sfdx adp:rest:upsert -t User -o \'[{"Ext_Id": "0GQ46000000LA9NGAW", "FirstName": "Xavier"}]\''
            + ' -e https://myinstance.com -a myaccesstoken'
    ];

    protected static flagsConfig = {
        objectjson: flags.string({char: 'o', required: true, description: 'JSON array of objects to upsert'}),
        objecttype: flags.string({char: 't', required: true, description: 'Type of object to upsert'}),
        externalidfield: flags.string({char: 'x', required: true, description: 'Name of external id field'}),
        accesstoken: flags.string({char: 'a', required: true, description: 'OAuth access token with bang (!) escaped'}),
        endpoint: flags.string({char: 'e', required: true, description: 'Salesforce SOAP API endpoint'})
    };

    protected static requiresUsername = false;
    protected static requiresProject = false;

    // tslint:disable-next-line:no-any
    public async run(): Promise<any> {

        const endpoint: string = this.flags.endpoint;
        const json: string = this.flags.objectjson;
        const objType: string = this.flags.objecttype;
        const objJson = JSON.parse(json);
        const externalIdFieldName: string = this.flags.externalidfield;

        const conn = authUtil.createConnection({
            instanceUrl: endpoint,
            accessToken: this.flags.accesstoken.replace('\\!', '!')
        });

        let result;
        await conn.sobject(objType).upsert(
            objJson,
            externalIdFieldName,
            (err, ret) => {
            if (err || !ret.success) {
                result = err;
            }
            result = ret.success;
        });

        return result;
    }
}
