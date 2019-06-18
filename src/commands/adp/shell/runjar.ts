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
import { execSync } from 'child_process';
import { formatPipeDelimitedArguments } from '../../../helpers/runjarHelper';
import * as pluginConfig from '../../../shared/pluginConfig';

export default class RunJar extends SfdxCommand {
    public static description = 'Executes a JAR file with the specified pipe-delimited parameters.';

    public static examples = [
        `sfdx adp:shell:runjar -j MyJarFile.jar
        // Executes jar file MyJarFile.jar with no arguments
        `,
        `sfdx adp:shell:runjar -j MyJarFile.jar -a 3500
        // Executes jar file MyJarFile.jar with a single argument that does not contain spaces
        `,
        `sfdx adp:shell:runjar -j MyJarFile.jar -a 'My first arg'
        // Passing a single argument that contains spaces
        `,
        `sfdx adp:shell:runjar -j MyJarFile.jar -a "My first arg|1000"
        // Passing 2 arguments when one or more contains spaces
        `
    ];

    protected static flagsConfig = {
        jarfile: {char: 'j', type: 'string', description: 'path to jar file', required: true},
        classpath: {type: 'string',
            description: 'a colon(:)-delimited list of directories, JAR archives or ZIP archives to search for class files',
            required: false},
        arguments: {char: 'a', type: 'string', description: 'pipe-delimited jar file arguments', required: false}
    };

    protected static requiresUsername = false;

    protected static requiresProject = false;

    // tslint:disable-next-line:no-any
    public async run(): Promise<any> {

        // Load config file plugin-config.json and validate
        const configDirs = pluginConfig.getConfigDirs();
        const adpCfg = pluginConfig.get(configDirs); // project not needed since there are no local configurations
        if (adpCfg.error) {
            console.log(chalk.red(adpCfg.error));
            return;
        }

        const proxySettings = adpCfg.proxySettings;
        const jarParams: string = this.flags.arguments ? formatPipeDelimitedArguments(this.flags.arguments) : '';
        let jarCommand = `java -Dhttp.proxyPort=${proxySettings.httpProxyPort}`
                        + ` -Dhttp.proxyHost=${proxySettings.httpProxyHost}`;

        if (this.flags.classpath) {
            jarCommand += ` -cp ${this.flags.classpath}`;
        }
        jarCommand += ` -jar ${this.flags.jarfile} ${jarParams}`;

        const retVal = execSync(jarCommand, { encoding: 'utf8' });
        return retVal;
    }
}
