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
import * as dh from '../../src/helpers/talendHelper';

describe('---------- talendHelper INTEG ----------', () => {

    describe('readMainClassesFromJar', () => {
        it ('returns array of class file paths from the specified project folder', async () => {

            const result = await dh.readMainClassesFromJar('test/resources/talend-test.jar', 'mytalendproject');
            // Uncomment when JAR file is available
            console.log(result);
            // expect(result.length).to.equal(28);
            // expect(result[0]).to.equal('mytalendproject/a1_get_visibility_rules_0_1/a1_get_visibility_rules.class');
        });
    });
});
