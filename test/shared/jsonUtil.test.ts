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
import { expect } from '@salesforce/command/dist/test';
import * as jsonUtil from '../../src/shared/jsonUtil';

describe('---------- jsonUtil UNIT ----------', () => {
    describe('merge', () => {
        it('merges json objects into one', () => {

            const result = jsonUtil.merge(
                {
                    settingsSectionLocal: {
                        localSetting1: 'local 1',
                        localSetting2: 'local 2'
                    }
                },
                {
                    settingsSectionGlobal: {
                        globalSetting1: 'global 1',
                        globalSetting2: 'global 2'
                    }
                }
            );

            expect(result.settingsSectionLocal.localSetting1).not.to.equal(undefined);
            expect(result.settingsSectionLocal.localSetting2).not.to.equal(undefined);
            expect(result.settingsSectionGlobal.globalSetting1).not.to.equal(undefined);
            expect(result.settingsSectionGlobal.globalSetting1).not.to.equal(undefined);
        });

        it ('properly merges when settings are arrays', () => {
            const result = jsonUtil.merge(
                {
                    settingsSectionLocal: ['item1', 'item2']
                },
                {
                    settingsSectionGlobal: ['item3', 'item4']
                }
            );

            expect(Array.isArray(result.settingsSectionLocal)).to.equal(true);
            expect(Array.isArray(result.settingsSectionGlobal)).to.equal(true);
            expect(result.settingsSectionLocal.length).to.equal(2);
            expect(result.settingsSectionGlobal.length).to.equal(2);
        });
    });
});
