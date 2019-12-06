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
import { formatPipeDelimitedArguments } from '../../src/helpers/runjarHelper';

describe('---------- runjarHelper UNIT ----------', () => {
    describe('formatPipeDelimitedArguments', () => {

        it('converts pipe-delimited string (no quotes) to quoted strings separated by spaces', async () => {
            const result: string = formatPipeDelimitedArguments('abc|123');
            expect(result).to.equal('"abc" "123"');
        });

        it('converts pipe-delimited string (some double-quoted)) to quoted strings separated by spaces', async () => {
            const result: string = formatPipeDelimitedArguments('"my argument"|my second argument');
            expect(result).to.equal('"my argument" "my second argument"');
        });

        it('converts pipe-delimited string (some single-quoted)) to quoted strings separated by spaces', async () => {
            const result: string = formatPipeDelimitedArguments("my argument|'my second argument'|100");
            expect(result).to.equal('"my argument" "my second argument" "100"');
        });
    });
});
