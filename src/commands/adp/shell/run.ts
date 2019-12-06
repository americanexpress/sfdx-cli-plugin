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
import { flags, SfdxCommand } from '@salesforce/command';
import { SfdxProject } from '@salesforce/core';
import * as util from 'util';
import * as g from '../../../globals';
import * as cli from '../../../shared/cliCommand';

export default class Run extends SfdxCommand {
    public static description = 'Runs shell script';

    public static examples = [
        `sfdx adp:shell:run
        // Runs <project>/.epsf/bash/build.sh
        `,
        `sfdx adp:shell:run -f "test.sh"
        // Runs shell script from <project>/.epsf/bash
        `,
        `sfdx adp:shell:run -f "test/resources/bash/test.sh"
        // Runs the specified shell script (outside of DX project)
        `,
        `sfdx adp:shell:run -f "test.sh cow moon"
        // Runs script with parameters
        `
    ];

    protected static flagsConfig = {
        file: flags.string({char: 'f', description: 'shell script file to run', required: false}),
        args: flags.string({char: 'a', description: 'argument list', required: false})
    };

    protected static requiresUsername = false;
    protected static requiresProject = false;

    // tslint:disable-next-line:no-any
    public async run(): Promise<any> {

        let projectPath;
        try {
            projectPath = await SfdxProject.resolveProjectPath();
        } catch (err) {
            console.log(err.message);
        }

        const cmd: cli.CLICommand = buildCommand (
            projectPath,
            this.flags
        );

        if (cmd.errors.length === 0) {
            cli.run(cmd);
        } else {
            cmd.errors.forEach(msg => {
                console.error(msg);
            });
        }
    }
}

export function buildCommand(projectPath: string, flags): cli.CLICommand {

    let scriptFile = 'build.sh';
    let args = '';

    const errorMessages: string[] = [];
    if (util.isNullOrUndefined(projectPath)) {
        // Not in project
        if (util.isNullOrUndefined(flags.file)) {
            errorMessages.push('--file option is required when outside of a DX project.');
        } else {
            scriptFile = `${flags.file}`;
        }
    } else {
        // In DX project
        const bashPath = `${projectPath}/${g.LOCAL_HIDDEN_DIR}/bash`;
        if (util.isNullOrUndefined(flags.file)) {
            // No file set
            scriptFile = `${bashPath}/build.sh`;
        } else {
            scriptFile = `${bashPath}/${flags.file}`;
        }
    }

    if (flags.args) {
        args = flags.args;
    }

    const retVal: cli.CLICommand = {
        commandString: scriptFile,
        encloseInQuotes: true,
        args: [args],
        errors: errorMessages
    };

    return retVal;
}
