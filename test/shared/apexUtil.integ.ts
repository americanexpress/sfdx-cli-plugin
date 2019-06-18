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
import * as path from 'path';
import * as apexUtil from '../../src/shared/apexUtil';
import * as cli from '../../src/shared/cliCommand';

describe('---------- apexUtil INTEG ----------', () => {
    describe('buildRunCommandsFromPath', () => {

        const apexFileDir = `${process.env.REPO}/sfdx-cli-plugin/test/resources/testproject/deploy/pre/anonymous`;
        const username = 'testusername';
        let result: cli.CLICommand[];
        before('Call the function', () => {

            result = apexUtil.buildRunCommandsFromPath(username, apexFileDir);
        });

        it('returns 4 CLICommand objects when 4 files exist, regardless of extension', () => {
            expect(result.length).to.equal(4);
        });

        it('has third command properly formatted', () => {

            expect(result[2].commandString).to.equal('sfdx force:apex:execute');
            expect(result[2].args[0]).to.equal('-u');
            expect(result[2].args[1]).to.equal('testusername');
            expect(result[2].args[2]).to.equal('-f');
            const expectedFilePath = path.normalize(apexFileDir + '/anon3.apex');
            expect(result[2].args[3]).to.equal(`"${expectedFilePath}"`);
        });

        it('returns empty array if directory does not exist', () => {
            const nonExistentPostDir = `${process.env.REPO}/sfdx-cli-plugin/test/resources/testproject/deploy/post/anonymous`;
            const emptyResult = apexUtil.buildRunCommandsFromPath(username, nonExistentPostDir);
            expect(emptyResult.length).to.equal(0);
        });

    });
});
