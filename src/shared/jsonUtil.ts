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
// tslint:disable-next-line:no-any
export function merge(obj1: object, obj2: object): any {
    const combined = {};
    objCombine(obj1, combined);
    objCombine(obj2, combined);
    return combined;
}

function objCombine(obj, variable) {
    for (const key of Object.keys(obj)) {
        if (!variable[key]) {
            if (Array.isArray(obj[key])) {
                variable[key] = [];
            } else {
                variable[key] = {};
            }
        }

        for (const innerKey of Object.keys(obj[key])) {
            if (!Array.isArray(obj[key])) {
                variable[key][innerKey] = obj[key][innerKey];
            } else {
                variable[key].push(obj[key][innerKey]);
            }
        }
    }
}
