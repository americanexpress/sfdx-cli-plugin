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
import * as fs from 'fs';
import * as g from '../../../globals';
import * as apexUtil from '../../../shared/apexUtil';
import * as cli from '../../../shared/cliCommand';
import * as fileUtil from '../../../shared/fileUtil';
import * as logger from '../../../shared/logger';
import * as project from '../../../shared/project';

export default class Deploy extends SfdxCommand {
    public static description = 'Deploys the source to a non-tracked org';

    public static examples = [
        `sfdx adp:source:deploy
        // Runs sequence of commands required to deploy the monolith based on default username`,
        `sfdx adp:source:deploy -u myalias
        // Runs sequence of commands required to deploy the monolith to the specified org/alias`,
        `sfdx adp:source:deploy -c
        // Performs validation deploy only`,
        `sfdx adp:source:deploy -l NoTestRun
        // Deploys without tests`,
        `sfdx adp:source:deploy -b
        // Runs the deployment in debug mode`,
        `sfdx adp:source:deploy --noanonymous
        // Excludes pre and post anonymous Apex execution commands (not passed to override)`,
        `sfdx adp:source:deploy --nodestructives
        // Excludes pre and post destructive metadata (not passed to override)`
    ];

    protected static flagsConfig = {
        debugmode: {type: 'boolean', char: 'b', required: false, default: false,
                            description: 'performs mdapi conversion but skips deployment'},
        checkonly: {type: 'boolean', char: 'c', required: false, default: false,
                            description: 'validate deploy but don’t save to the org'},
        noanonymous: {type: 'boolean', required: false, default: false,
                        description: 'exclude pre and post anonymous Apex execution commands (excluded from override)'},
        nodestructives: {type: 'boolean', required: false, default: false,
                        description: 'exclude pre and post destructive commands (excluded from override)'},
        nomain: {type: 'boolean', required: false, default: false,
                            description: 'exclude main payload deployment'},
        testlevel: {type: 'string', char: 'l', required: false, default: 'RunAllTestsInOrg',
                    description: 'NoTestRun|RunSpecifiedTests|RunLocalTests|RunAllTestsInOrg'}
    };

    protected static requiresUsername = true;
    protected static requiresProject = true;
    // tslint:disable-next-line:no-any
    public async run(): Promise<any> {

        const _override: cli.CLICommand = cli.getOverride(__filename);
        const testLevel = this.flags.testlevel;

        // Override command with bash script if one has been configured
        if (_override) {
            _override.encloseInQuotes = true;
            let argStr = `-u ${this.org.getUsername()} -m ${g.META_DIRNAME}`;
            argStr = this.flags.checkonly ? `${argStr} -c` : argStr;
            argStr = testLevel ? `${argStr} -l ${testLevel}` : argStr;
            argStr = this.flags.debugmode ? `${argStr} -b ${this.flags.debugmode}` : argStr;
            _override.args = [argStr];
            cli.run(_override);
            return;
        }

        // This return is temporary to ensure non-override code does not get executed for now.
        logger.info('Override not found!');
        return;

        const projectDir = await project.getAbsolutePath();
        const preDeployDir = `${projectDir}/deploy/pre`;
        const postDeployDir = `${projectDir}/deploy/post`;

        const commandsToRun: cli.CLICommand[] = [];

        // Add "pre" anonymous execution
        if (!this.flags.noanonymous) {
            const preAnonymousCommands = apexUtil.buildRunCommandsFromPath('dummy', `${projectDir}/deploy/pre/anonymous`);
            preAnonymousCommands.forEach(cmd => commandsToRun.push(cmd));
        }

        // Add "pre" destructives command
        const preDestructDir = `${preDeployDir}/destruct`;
        const preDestructTempDir = `${preDeployDir}/.temp`;
        if (!this.flags.nodestructives && fs.existsSync(preDestructDir)) {
            // Copy destruct to a temp folder
            console.log('Creating temp pre-destructive directory...');
            await fileUtil.copyDir(preDestructDir, preDestructTempDir);
            const preDestructCmd: cli.CLICommand = {
                commandString: 'sfdx force:source:delete',
                args: ['-p', preDestructTempDir, '-r'],
                errors: []
            };
            commandsToRun.push(preDestructCmd);
        }

        // Add deploy command
        if (!this.flags.nomain) {
            const deployCmd: cli.CLICommand = {
                commandString: 'sfdx force:source:deploy',
                args: ['-p', `${projectDir}/force-app`],
                errors: []
            };
            commandsToRun.push(deployCmd);
        }

        // Add "post" anonymous execution
        if (!this.flags.noanonymous) {
            const postAnonymousCommands = apexUtil.buildRunCommandsFromPath('dummy', `${projectDir}/deploy/post/anonymous`);
            postAnonymousCommands.forEach(cmd => commandsToRun.push(cmd));
        }

        // Add "post" destructives command
        const postDestructDir = `${postDeployDir}/destruct`;
        const postDestructTempDir = `${postDeployDir}/.temp`;
        if (!this.flags.nodestructives && fs.existsSync(postDestructDir)) {
            // Copy destruct to a temp folder
            console.log('Creating temp post-destructive directory...');
            await fileUtil.copyDir(postDestructDir, postDestructTempDir);
            const postDestructCmd: cli.CLICommand = {
                commandString: 'sfdx force:source:delete',
                args: ['-p', postDestructDir, '-r'],
                errors: []
            };
            commandsToRun.push(postDestructCmd);
        }
        cli.runAll(commandsToRun, cli.runCmd);
    }
}
