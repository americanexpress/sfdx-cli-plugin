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
import * as org from '../../src/shared/orgUtil';

describe('---------- orgUtil INTEG ----------', () => {
    describe('getActiveScratchOrgs', () => {

        let orgs;
        before('call the function', () => {
            orgs = org.getActiveScratchOrgs();
        });

        it('returns active scratch orgs', () => {
            expect(orgs.length).to.be.greaterThan(0);
        });

        it('name property contains hyphen', () => {
            expect(orgs[0].name).to.contain(' - ');
        });

        it('value contains @', () => {
            expect(orgs[0].name).to.contain('@');
        });
    });

    describe('getActiveSandboxes', () => {

        let sandboxes;
        before('call the function', () => {
            sandboxes = org.getActiveSandboxes();
        });

        it('returns active sandboxes', () => {
            expect(sandboxes.length).to.be.greaterThan(0);
        });

        it('name property contains hyphen', () => {
            expect(sandboxes[0].name).to.contain(' - ');
        });

        it('value contains @', () => {
            expect(sandboxes[0].name).to.contain('@');
        });

    });

    describe('getAllAvailableOrgs', () => {
        let orgs;
        before('call the function', () => {
            orgs = org.getAllAvailableOrgs();
        });

        it ('returns sandboxes and orgs', () => {
            expect(orgs.length).to.be.greaterThan(0);
        });

        it('name property contains hyphen', () => {
            expect(orgs[0].name).to.contain(' - ');
        });

        it('value contains @', () => {
            expect(orgs[0].name).to.contain('@');
        });
    });
});
