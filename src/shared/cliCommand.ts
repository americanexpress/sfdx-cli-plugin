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
import * as childProc from 'child_process';
import * as path from 'path';
import { isNullOrUndefined } from 'util';
import { info } from './logger';
import * as cfg from './pluginConfig';

export interface CLICommand {
    commandString: string;
    encloseInQuotes?: boolean;
    args?: string[];
    errors?: string[];
}

/**
 * Wrapper function for running multiple CLI commands
 * @param commands Array of command objects to run
 * @param runner Optional alternate function to run the commands
 */
export function runAll(commands: CLICommand[], runner?) {

    if (commands.length > 0) {
        commands.forEach(cmd => {
            run(cmd, runner);
        });
    } else {
        info('No commands to run.');
    }
}

/**
 * Wrapper function for running a CLI command
 * @param cmd Command object to run
 * @param runner Optional alternate function to run command
 */
export function run(cmd: CLICommand, runner?) {
    let commandStr = cmd.commandString;

    commandStr = path.normalize(commandStr.replace('$REPO', process.env.REPO).replace('~', process.env.HOME));

    if (cmd.encloseInQuotes) {
        commandStr = `"${commandStr}"`;
    }
    if (!isNullOrUndefined(cmd.args) && cmd.args.length > 0) {
        commandStr += ` ${cmd.args.join(' ')}`;
    }

    if (runner) {
        runner(commandStr);
    } else {
        runCmd(commandStr);
    }
}

export function runCmd(command: string, noInherit?: boolean) {
    info(`Running CLI command: ${command}`);
    let retVal;
    if (!command.startsWith('testcommand')) {
        if (noInherit) {
            retVal = childProc.execSync(command, {encoding: 'utf8'});
        } else {
            retVal = childProc.execSync(command, {encoding: 'utf8', stdio: 'inherit'});
        }
    }
    return retVal;
}

export function hasOverride(commandFile: string, config) {

    const command = fileToCommand(commandFile);
    let retVal = false;
    if (!isNullOrUndefined(config.commandOverrides)) {
        retVal = config.commandOverrides.find(ovr => ovr.command === command) !== undefined;
    }
    return retVal;
}

function fileToCommand(filePath: string): string {
    return filePath.slice(filePath.indexOf('/adp/') + 1, filePath.lastIndexOf('.')).replace(/\//g, ':');
}

/**
 * Retrieves configured overrides if they exist
 * @param commandFile Script file to override command with
 * @param pluginConfig Optional plugin configuration settings
 */
export function getOverride(commandFile: string, pluginConfig?): CLICommand {
    const command = fileToCommand(commandFile);
    let config;
    if (pluginConfig) {
        config = pluginConfig;
    } else {
        const configDirs = cfg.getConfigDirs();
        config = cfg.get(configDirs);
    }

    let retVal: CLICommand;
    if (hasOverride(commandFile, config)) {
        retVal = config.commandOverrides.find(ovr => ovr.command === command).overrideWith;
    }
    return retVal;
}
