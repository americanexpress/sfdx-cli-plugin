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

/**
 * Wrapper function for console.log
 * @param message Message to log
 */
export function info(message: string) {
    if (!__dirname.includes('/test/')) {
        console.log(message);
    }
}

/**
 * Wrapper function for console.error
 * @param message Error message
 */
export function error(message: string) {
    console.error(message);
}

export function start(message: string) {
    process.stdout.write(`${message}... `);
}

export function done() {
    console.log('done');
}
