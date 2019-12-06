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
import { buildCommand } from '../../../../src/commands/adp/shell/run';

describe('---------- adp:shell:run ----------', () => {
    describe('buildCommand', () => {

        it ('has commandString set to <projectbashpath>/build.sh when in project and file not specified', () => {

            const result = buildCommand('/my/project/path', { file: null });
            expect(result.commandString).to.equal('/my/project/path/.epsf/bash/build.sh');
        });

        it ('has commandString set to <projectbashpath>/<bashfile> when in project and file specified', () => {

            const result = buildCommand('/my/project/path', { file: 'test.sh'});
            expect(result.commandString).to.equal('/my/project/path/.epsf/bash/test.sh');
        });

        it ('has commandString set to "<projectbashpath>/<bashfile>" arg1 arg2 when arguments specified', () => {

            const result = buildCommand('/my/project/path', {file: 'test.sh', args: 'arg1 arg2'});
            expect(result.commandString).to.equal('/my/project/path/.epsf/bash/test.sh');
            expect(result.args[0]).to.equal('arg1 arg2');
        });

        it ('has commandString set to full path when not in project and full path specified', () => {

            const result = buildCommand(null, { file: '/full/path/to/my/bash/script.sh'});
            expect(result.commandString).to.equal('/full/path/to/my/bash/script.sh');
        });

        it ('has correct error when not in project and file option not set', () => {

            const result = buildCommand(null, { file: null});
            expect(result.errors[0]).to.equal('--file option is required when outside of a DX project.');
        });

    });
});
