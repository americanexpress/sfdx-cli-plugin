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
import { ConfigAggregator } from '@salesforce/core';

export interface ValidatorInput {
    configReader: ConfigReader;
}

class ConfigReaderImpl extends ConfigAggregator implements ConfigReader {

    constructor() {
        super();
    }

    public async getDefaultDevHubUsername() {
        const config  = await ConfigAggregator.create();
        return config.getPropertyValue('defaultdevhubusername');
    }
}

export interface ConfigReader {
    getDefaultDevHubUsername();
}

export async function validate(): Promise<string[]> {
    const cfgReader: ConfigReader = new ConfigReaderImpl();
    return await doValidate({ configReader: cfgReader });
}

export async function doValidate(input: ValidatorInput): Promise<string[]> {

    const dfltDevHubUsername = await input.configReader.getDefaultDevHubUsername();

    const errors = [];
    if (!dfltDevHubUsername) {
        const errorMsg: string = 'Default Dev Hub username has not been set.'
                                    + '\nUse the command "sfdx force:config:set" to set this value.';
        errors.push(errorMsg);
    }

    return errors;
}
