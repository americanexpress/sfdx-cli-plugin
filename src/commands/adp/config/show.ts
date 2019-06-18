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
import * as pluginConfig from '../../../shared/pluginConfig';
import { ConfigDirOpts } from '../../../shared/pluginConfig';

export default class Show extends SfdxCommand {

    public static description = 'Displays global and local configuration settings';

    public static examples = [
        'sfdx adp:config:show',
        'sfdx adp:config:show -g',
        'sfdx adp:config:show -l'
    ];

    protected static flagsConfig = {
        globalonly: { char: 'g', type: 'boolean', description: 'show global config only' },
        localonly: { char: 'l', type: 'boolean', description: 'show local config only'}
    };

    protected static requiresUsername = false;
    protected static requiresProject = false;

    // tslint:disable-next-line:no-any
    public async run(): Promise<any> {

        const configDirOpts: ConfigDirOpts = {localOnly: this.flags.localonly,
                                                globalOnly: this.flags.globalonly};
        const configDirs = pluginConfig.getConfigDirs(configDirOpts);
        const config = pluginConfig.get(configDirs);
        this.ux.logJson(config);
    }
}
