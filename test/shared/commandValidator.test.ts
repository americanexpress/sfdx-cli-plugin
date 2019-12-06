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
import { expect } from '@salesforce/command/lib/test';
import * as cmdval from '../../src/shared/commandValidator';

describe('---------- commandValidator UNIT ---------', () => {

    describe('doValidate', () => {

        it ('returns error message if dev hub org not set', async () => {

            const input = { configReader: { getDefaultDevHubUsername: async () => false} };
            const errors = await cmdval.doValidate(input);
            expect(errors[0]).to.equal('Default Dev Hub username has not been set.'
                                        + '\nUse the command "sfdx force:config:set" to set this value.');
        });
    });
});
