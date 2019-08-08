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
import * as path from 'path';
import { isUndefined } from 'util';
import * as consts from './constants';
import * as jsonUtil from './jsonUtil';

export interface PluginConfigDirs {
    appConfigDir?: string;
    localConfigDir?: string;
    globalConfigDir?: string;
}

export interface ConfigDirOpts {
    globalOnly: boolean;
    localOnly: boolean;
}

/**
 * Gets the absolute paths to the global and local configuration directories
 * @param localOnly Only return the local config directory
 * @param globalOnly Only return the global config directory
 * @returns PluginConfigDirs object
 */
export function getConfigDirs(opts?: ConfigDirOpts): PluginConfigDirs {
    const localHiddenDir: string = `${process.env.PWD}/${consts.HIDDEN_DIR_NAME_LOCAL}`;
    const pluginHome: string = __dirname.substring(0, __dirname.indexOf('sfdx-cli-plugin') + 'sfdx-cli-plugin'.length);
    const globalHiddenDir: string = path.normalize(`${pluginHome}`);
    const appConfigDir: string = path.normalize(`${pluginHome}/config`);
    let configDirs: PluginConfigDirs = {localConfigDir: localHiddenDir,
                                        globalConfigDir: globalHiddenDir,
                                        appConfigDir};

    if (opts) {
        if (!opts.localOnly && !opts.globalOnly || opts.localOnly && opts.globalOnly) {
            configDirs = {localConfigDir: localHiddenDir,
                            globalConfigDir: globalHiddenDir};
        } else if (opts.localOnly) {
            configDirs = {localConfigDir: localHiddenDir};
        } else if (opts.globalOnly) {
            configDirs = {globalConfigDir: globalHiddenDir};
        }
    }
    return configDirs;
}

/**
 * Gets the combined project and global configuration
 * @param configDirs Defines the directories for which the configuration should be retrieved
 * @returns JSON object
 */
// tslint:disable-next-line:no-any
export function get(configDirs: PluginConfigDirs): any {

    const configFileName = 'plugin-config.json';
    const localConfig = getConfig(configDirs.localConfigDir, configFileName);
    const globalConfig = getConfig(configDirs.globalConfigDir, configFileName);

    let mergedConfig;
    if (configDirs.localConfigDir && configDirs.globalConfigDir) {

        if (globalConfig.error && localConfig.error) {
            mergedConfig = {
                errors: [localConfig.error, globalConfig.error]
            };
        } else if (globalConfig.error) {
            mergedConfig = localConfig;
            mergedConfig['errors'] = [globalConfig.error];

        } else if (localConfig.error) {
            mergedConfig = globalConfig;
            mergedConfig['errors'] = [localConfig.error];
        } else {
            mergedConfig = jsonUtil.merge(localConfig, globalConfig);
        }
    } else if (configDirs.localConfigDir) {
        if (localConfig.error) {
            mergedConfig = {errors: [localConfig.error]};
        } else {
            mergedConfig = localConfig;
        }
    } else if (configDirs.globalConfigDir) {
        if (globalConfig.error) {
            mergedConfig = {errors: [globalConfig.error]};
        } else {
            mergedConfig = globalConfig;
        }
    }

    return mergedConfig;
}

/**
 * Gets the combined project and global configuration
 * @param projectPath Path to the project
 * @param globalConfigDir Directory containing the global configuration file
 * @returns JSON object
 */
export function getByDir(localConfigDir: string, globalConfigDir: string) {

    const configFileName = 'plugin-config.json';
    const localConfig = getConfig(localConfigDir, configFileName);
    const globalConfig = getConfig(globalConfigDir, configFileName);

    let mergedConfig;
    if (globalConfig.error && localConfig.error) {
        mergedConfig = {
            errors: [globalConfig.error, localConfig.error]
        };
    } else if (globalConfig.error) {
        mergedConfig = localConfig;
        mergedConfig['errors'] = [globalConfig.error];
    } else if (localConfig.error) {
        mergedConfig = globalConfig;
        mergedConfig['errors'] = [localConfig.error];
    } else {
        mergedConfig = jsonUtil.merge(globalConfig, localConfig);
    }
    return mergedConfig;
}

/**
 * Gets the configuration JSON object from the specified directory
 * @param configDir Directory in which to search for config file
 * @returns JSON object
 */
export function getConfig(configDir: string, configFileName: string) {

    const configFile = path.normalize(`${configDir}/${configFileName}`);
    let config;
    try {
        // tslint:disable-next-line:no-var-requires
        config = require(configFile);
    } catch (err) {
        let errorMsg: string;
        if (err.code === 'MODULE_NOT_FOUND') {
            errorMsg = `Configuration file not found: ${configFile}`;
        } else {
            errorMsg = 'Invalid JSON detected. Ensure configuration files are properly formatted.';
        }

        config = {
            error: errorMsg
        };
    }
    return config;
}

/**
 * Checks that the specified properties are present in the config file
 * @param configObj Configuration JSON object to validate
 * @param toValidateArr Array of properties to check
 * @returns Error message if properties missing, otherwise empty string
 */
export function validate(configObj, toValidateArr: string[]): string {
    const errors: string[] = [];
    toValidateArr.forEach(tv => {

        if (tv.includes('.')) {
            const configItemArr = tv.split('.');
            const configType = configItemArr[0];
            if (isUndefined(configObj[configType])) {
                errors.push(tv);
            } else {
                const configSetting = configItemArr[1];
                if (isUndefined(configObj[configType][configSetting])) {
                    errors.push(tv);
                }
            }
        } else {
            if (isUndefined(configObj[tv])) {
                errors.push(tv);
            }
        }
    });
    let errorMsg = '';
    if (errors.length > 0) {
        errorMsg = `Missing configuration(s):\n${errors.join('\n').trim()}`;
    }
    return errorMsg;
}
