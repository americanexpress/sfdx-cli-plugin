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
import { ConfigDirOpts } from '../../src/shared/pluginConfig';

describe('---------- pluginConfig UNIT ----------', () => {

    describe('validate', () => {

        it('has the correct error message when properties are missing', () => {
            const result = cfg.validate({
                proxySettings: {
                    httpProxyHost: 'proxy.myorg.com'
                },
                seleniumSettings: {
                    jarDir: '$REPO/testproject-qa-automation/target',
                    jarName: 'testproject-1.0-SNAPSHOT.jar'
                },
                talendSettings: {
                    jarDir: '$REPO/build_project/customJars/',
                    jarDependenciesDir: '$REPO/build_project/customJars/lib/'
                }
            }, ['proxySettings.httpProxyPort', 'seleniumSettings.jarDir', 'talendSettings.uberJar']);
            expect(result).to.equal(
                'Missing configuration(s):'
                + '\nproxySettings.httpProxyPort'
                + '\ntalendSettings.uberJar');
        });

        it('has the correct error message when property types are missing', () => {

            const result = cfg.validate({
                proxySettings: {
                    httpProxyHost: 'my.proxy.com'
                }
            }, ['seleniumSettings', 'talendSettings']);
            expect(result).to.equal(
                'Missing configuration(s):'
                    + '\nseleniumSettings'
                    + '\ntalendSettings');

        });

        it('returns the correct error message if property type is missing', () => {

            const result = cfg.validate({
                proxySettings: {
                    httpProxyHost: 'my.proxy.com'
                }
            }, ['scratchOrgSettings.defaultPassword']);
            expect(result).to.equal('Missing configuration(s):\nscratchOrgSettings.defaultPassword');
        });

        it('returns empty string when specified config values present', () => {
            const result = cfg.validate({
                proxySettings: {
                    httpProxyHost: 'myproxyhost'
                },
                seleniumSettings: {
                    jarDir: '$REPO/testproject-qa-automation/target',
                    jarName: 'testproject-force-1.0-SNAPSHOT.jar'
                },
                talendSettings: {
                    jarDir: '$REPO/build_project/customJars/',
                    jarDependenciesDir: '$REPO/build_project/customJars/lib/'
                }
            }, ['proxySettings.httpProxyHost', 'seleniumSettings.jarDir', 'talendSettings.jarDir']);
            expect(result).to.equal('');
        });
    });

    describe('getConfigDirs', () => {
        let localHiddenDir: string;
        let globalHiddenDir: string;

        before('set local and global config directories', () => {
            localHiddenDir = `${process.env.PWD}/${consts.HIDDEN_DIR_NAME_LOCAL}`;
            globalHiddenDir = `${process.env.HOME}/${consts.HIDDEN_DIR_NAME_GLOBAL}`;
        });

        it('returns both config directories when no options passed', () => {
            const result = cfg.getConfigDirs();
            expect(result.localConfigDir).to.equal(localHiddenDir);
            expect(result.globalConfigDir).to.equal(globalHiddenDir);
        });

        it('returns both config directories when both "only" filters false', () => {
            const opts: ConfigDirOpts = {localOnly: false, globalOnly: false};
            const result = cfg.getConfigDirs(opts);
            expect(result.localConfigDir).to.equal(localHiddenDir);
            expect(result.globalConfigDir).to.equal(globalHiddenDir);
        });

        it('returns the local config directory only if localOnly true', () => {
            const opts: ConfigDirOpts = {localOnly: true, globalOnly: false};
            const result = cfg.getConfigDirs(opts);
            expect(result.localConfigDir).to.equal(localHiddenDir);
            expect(result.globalConfigDir).to.equal(undefined);
        });

        it('returns the global config directory only if globalOnly true', () => {
            const opts: ConfigDirOpts = {localOnly: false, globalOnly: true};
            const result = cfg.getConfigDirs(opts);
            expect(result.localConfigDir).to.equal(undefined);
            expect(result.globalConfigDir).to.equal(globalHiddenDir);
        });

        it('returns both global and local directories if both "only" filters true', () => {
            const opts: ConfigDirOpts = {localOnly: true, globalOnly: true};
            const result = cfg.getConfigDirs(opts);
            expect(result.localConfigDir).to.equal(localHiddenDir);
            expect(result.globalConfigDir).to.equal(globalHiddenDir);
        });
    });
});
