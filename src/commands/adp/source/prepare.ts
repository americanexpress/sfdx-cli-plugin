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
import chalk from 'chalk';
import * as util from 'util';
import * as logger from '../../../shared/logger';
import * as pluginConfig from '../../../shared/pluginConfig';
import * as xmlUtil from '../../../shared/xmlUtil';

export default class Prepare extends SfdxCommand {

    public static description = 'Prepares the source for deployment using the pre-deployment transforms configured in plugin-config.json';

    public static examples = [
        `sfdx adp:source:prepare
        // Transforms the source under force-app as configured in the project plugin-config.json
        `
    ];

    protected static requiresUsername = false;
    protected static requiresProject = false;

    // tslint:disable-next-line:no-any
    public async run(): Promise<any> {

        const configDirs = pluginConfig.getConfigDirs();
        const config = pluginConfig.get(configDirs);

        // Validate configuration
        const configErrorMsg = pluginConfig.validate(config,
            ['metadataTransforms']);
        if (configErrorMsg.trim() !== '') {
            logger.error(chalk.red(configErrorMsg));
            return;
        }

        const transforms = config.metadataTransforms;

        if (!util.isNullOrUndefined(transforms)) {
            for (const transProps of transforms) {
                if (transProps.isActive) {
                    console.log(`Running transform: "${transProps.title}"`);
                    await xmlUtil.transform(transProps);
                } else {
                    console.log(`Skipping deactivated transform: "${transProps.title}"`);
                }
            }
        }
    }
}
