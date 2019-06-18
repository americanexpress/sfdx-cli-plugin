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
 * Converts a pipe-delimited string of arguments to a space-delimited string of quoted arguments
 * @param paramString Pipe-delimited argument string
 */
export function formatPipeDelimitedArguments(paramString: string): string {

    const paramArr = paramString.split('|');
    const quotedArr = paramArr.map(ea => {
        let stripped: string = ea;
        const firstChar = ea.charAt(0);
        const quotesArr: string[] = ['"', "'"];
        if (quotesArr.includes(firstChar)) {
            stripped = stripped.substring(1, stripped.length - 1);
        }

        const lastChar = stripped.charAt(stripped.length - 1);
        if (quotesArr.includes(lastChar)) {
            stripped = stripped.substring(0, stripped.length - 2);
        }
        return `"${stripped}"`;
    });
    return quotedArr.join(' ');
}
