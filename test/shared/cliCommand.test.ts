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
import * as sinon from 'sinon';
import * as cli from '../../src/shared/cliCommand';
import * as logger from '../../src/shared/logger';

describe('---------- cliCommand UNIT ----------', () => {
    describe('runAll', () => {

        let fakeRun;
        let stubLoggerInfo;

        beforeEach('Setup test doubles', () => {
            // Stubs
            fakeRun = sinon.fake();
            stubLoggerInfo = sinon.stub(logger, 'info');
        });

        afterEach('Cleanup test doubles', () => {
            // Cleanup
            stubLoggerInfo.restore();
        });

        it('calls run() method twice', () => {

            cli.runAll([
                {commandString: 'some command', args: []},
                {commandString: 'some command', args: ['arg1=zzz']}
            ], fakeRun);

            expect(fakeRun.callCount).to.equal(2);
        });

        it('logs correct message if there are no commands to run', () => {

            // runAll with no commands
            cli.runAll([], fakeRun);

            expect(fakeRun.callCount).to.equal(0);
            expect(stubLoggerInfo.calledWith('No commands to run.')).to.equal(true);
        });

    });

    describe('run', () => {

        let fakeRun;

        beforeEach('before', () => {
            fakeRun = sinon.fake();
        });

        it ('Argument to runCmd has command string enclosed in quotes when encloseInQuotes option set to TRUE', () => {
            cli.run({commandString: '/path to/my/shell/script.sh', encloseInQuotes: true, args: []}, fakeRun);
            expect(fakeRun.calledWith('"/path to/my/shell/script.sh"')).to.equal(true);
        });
    });

    describe('runCmd', () => {

        let spiedInfo;

        beforeEach('before', () => {
            spiedInfo  = sinon.stub(logger, 'info');
        });

        it ('calls console.log with correct message prior to executing the command', () => {
            process.env.SYSTEM_DEBUG = 'true';
            cli.runCmd('testcommand force:org:list');
            expect(spiedInfo.calledWith('Running CLI command: testcommand force:org:list')).to.equal(true);
        });

        afterEach('clean up', () => {
            spiedInfo.restore();
        });
    });

    describe('hasOverride', () => {
        it('returns TRUE if override configured', () => {
            const result = cli.hasOverride('/sfdx-cli-plugin/src/commands/adp/source/deploy.ts', { commandOverrides: [
                {command: 'adp:source:deploy', overrideWith: 'build.sh'}
            ]});
            expect(result).to.equal(true);
        });

        it('returns FALSE section missing', () => {
            const result = cli.hasOverride('/full/path/adp/source/deploy.ts', {});
            expect(result).to.equal(false);
        });

        it ('returns FALSE if command override not found', () => {
            const result = cli.hasOverride('/full/path/adp/source/deploy.ts', { commandOverrides: []});
            expect(result).to.equal(false);
        });
    });

    describe('getOverride', () => {
        it('returns configured override if exists', () => {
            const result = cli.getOverride('/full/path/adp/source/deploy.ts', { commandOverrides: [
                    {command: 'adp:source:deploy', overrideWith: {commandString: 'build.sh'}
                }
            ]});
            expect(result.commandString).to.equal('build.sh');
        });

        it('returns undefined if not exists', () => {
            const result = cli.getOverride('/full/path/adp/source/deploy.ts', { commandOverrides: []});
            expect(result).to.equal(undefined);
        });
    });
});
