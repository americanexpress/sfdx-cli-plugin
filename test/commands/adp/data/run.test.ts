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
import { validateFlags } from '../../../../src/commands/adp/data/run';
import * as consts from '../../../../src/shared/constants';

describe('---------- adp:data:run ----------', () => {
    describe('validateFlags', () => {
        it('if sandbox, throws an error when classname flag set without password', () => {

            let errorMsg: string = '';
            try {
                validateFlags({classname: 'myclassname'}, consts.ORG_TYPE_SANDBOX);
            } catch (err) {
                errorMsg = err.message;
            }
            expect(errorMsg).to.equal('Flag sandboxpassword (-p) is required when classname flag is set.');
        });
    });

    describe('validateFlags', () => {
        it('if sandbox, throws an error when sandboxpassword flag set without classname', () => {

            let errorMsg: string = '';
            try {
                validateFlags({sandboxpassword: 'mypassword'}, consts.ORG_TYPE_SANDBOX);
            } catch (err) {
                errorMsg = err.message;
            }
            expect(errorMsg).to.equal('Flag classname (-c) is required when sandboxpassword flag is set.');
        });
    });
});
