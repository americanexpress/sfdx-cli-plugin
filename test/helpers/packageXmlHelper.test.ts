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
import * as helper from '../../src/helpers/packageXmlHelper';

describe('---------- packageXmlHelper UNIT ----------', () => {

    describe('removeStarredComponents', () => {

        it ('removes types elements containing members elements whose textContent is star', () => {
            const result = helper.removeStarredComponents(testDestructiveXml, false);
            expect(result).to.include('<types><name>Workflow</name><members>Case</members><members>Contact</members></types>');
            expect(result).not.to.include('<types><name>WorkflowFieldUpdate</name><members>*</members></types>');
        });
    });

    describe ('buildPackageXml', () => {
        it ('starts with proper XML and Package elements', () => {
            const result = helper.buildPackageXml({}, false);
            expect(result).to.contain('<?xml version="1.0" encoding="UTF-8"?>');
            expect(result).to.contain('<Package xmlns="http://soap.sforce.com/2006/04/metadata">');
        });

        it ('contains correct XML when one specific and one star element', () => {
            const result = helper.buildPackageXml({
                types: [
                    {
                        name: 'Workflow',
                        members: ['Case']
                    },
                    {
                        name: 'WorkflowFieldUpdate',
                        members: ['*']
                    }
                ]
            }, false);
            expect(result).to.contain('<types><name>Workflow</name><members>Case</members></types>');
            expect(result).to.contain('<types><name>WorkflowFieldUpdate</name><members>*</members></types>');
        });

        it ('contains correct XML when multiple member names', () => {
            const result = helper.buildPackageXml({
                types: [
                    {
                        name: 'Workflow',
                        members: ['Case', 'Contact', 'Account']
                    }
                ]
            }, false);
            expect(result).to.contain('<types>'
                        + '<name>Workflow</name>'
                        + '<members>Case</members>'
                        + '<members>Contact</members>'
                        + '<members>Account</members>'
                        + '</types>');
        });
    });

    describe('deserializeTypesElements', () => {

        it('deserializes to array of PackageXmlType', () => {
            const result = helper.deserializeTypesElements(testDestructiveXml);
            expect(result.length).to.equal(3);
            expect(result[0].members[1]).to.equal('Contact');
            expect(result[1].members[0]).to.equal('*');
        });

        it ('omits starred types when true passed in', () => {
            const result = helper.deserializeTypesElements(testDestructiveXml, true);
            expect(result.length).to.equal(1);
        });

        it ('removes duplicate types elements', () => {
            const result = helper.deserializeTypesElements(testDestructiveXmlWithDupes);
            expect(result.length).to.equal(2);

        });
    });
});

const testDestructiveXml: string = `<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
  <types>
    <name>Workflow</name>
    <members>Case</members>
    <members>Contact</members>
  </types>
  <types>
    <name>WorkflowFieldUpdate</name>
    <members>*</members>
  </types>
  <types>
    <name>WorkflowKnowledgePublish</name>
    <members>*</members>
  </types>
</Package>
`;

const testDestructiveXmlWithDupes: string = `<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
  <types>
    <name>Workflow</name>
    <members>Case</members>
  </types>
  <types>
    <name>Workflow</name>
    <members>Case</members>
  </types>
  <types>
    <name>WorkflowFieldUpdate</name>
    <members>*</members>
  </types>
  <types>
    <name>WorkflowFieldUpdate</name>
    <members>*</members>
  </types>
</Package>
`;
