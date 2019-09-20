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
import * as consts from '../../src/shared/constants';
import * as cfg from '../../src/shared/pluginConfig';

describe('---------- pluginConfig INTEG ----------', () => {
    describe('get', () => {

        it('returns merged global and local configs when no specific props specified', () => {

            const globalConfigDir = `${process.env.HOME}/${consts.GLOBAL_CONFIG_DIR}`;
            const projectDir = `${process.env.REPO}/sfdx-cli-plugin`;
            const configDirs = cfg.getConfigDirs();
            const result = cfg.get(configDirs);
            const globalConfigFile = `${globalConfigDir}/plugin-config.json`;
            const projConfigFile = `${projectDir}/${consts.LOCAL_HIDDEN_DIR}`;

            expect(result.proxySettings, `${globalConfigFile}.proxySettings not found`).not.to.equal(undefined);
            expect(result.talendSettings, `${globalConfigFile}.talendSettings not found`).not.to.equal(undefined);
            expect(result.restrictedOrgs, `${globalConfigFile}.restrictedOrgs not found`).not.to.equal(undefined);
            expect(result.commandOverrides, `${projConfigFile}.commandOverrides not found`).not.to.equal(undefined);
            expect(result.metadataTransforms, `${projConfigFile}.metadataTransforms`).not.to.equal(undefined);
        });

        it('result contains error messages when neither global nor local configs found', () => {
            const result = cfg.get({localConfigDir: '../dummyproject',
                                    globalConfigDir: '../dummyglobal'});
            expect(result.errors[0]).to.equal('Configuration file not found: ../dummyproject/plugin-config.json');
            expect(result.errors[1]).to.equal('Configuration file not found: ../dummyglobal/plugin-config.json');
        });

        it('result contains config data and error message if local config file not found', () => {
            const configDirs = {localConfigDir: '../dummyproject',
                                globalConfigDir: `${process.env.REPO}/sfdx-cli-plugin/test/resources/.epsf`};
            const result = cfg.get(configDirs);
            expect(result.errors[0]).to.equal('Configuration file not found: ../dummyproject/plugin-config.json');
        });

        it ('result contains config data and error message if global config file not found', () => {
            const configDirs = {localConfigDir: `${process.env.REPO}/sfdx-cli-plugin/.epsf`,
                                globalConfigDir: '../dummyglobal'};
            const result = cfg.get(configDirs);
            expect(result.errors[0]).to.equal('Configuration file not found: ../dummyglobal/plugin-config.json');
            expect(result.proxySettings).to.equal(undefined);
            expect(result.commandOverrides).not.to.equal(undefined);

        });
    });
});
