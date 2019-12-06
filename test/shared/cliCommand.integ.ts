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
import * as cli from '../../src/shared/cliCommand';
import * as fileUtil from '../../src/shared/fileUtil';

describe('---------- cliCommand INTEG ----------', () => {
    describe('getOverride', () => {

        it('gets the override value from commandOverrides setting if exists', async () => {

            await fileUtil.copyDir('test/resources/.epsf', './.epsf');
            const result = cli.getOverride('/full/path/to/adp/source/deploy.ts'); // command derived from this path
            expect(result.commandString).to.equal('~/.epsf/dependencies/sfdx-cli-plugin/resources/bash/build.sh');
        });
    });
});
