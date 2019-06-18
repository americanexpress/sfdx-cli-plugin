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
import * as fs from 'fs';
import { createBackupFile, getBackupFiles } from '../../src/shared/fileUtil';

describe('---------- fileUtil INTEG ----------', () => {
    describe('createBackupFile', () => {

        before('delete test backup files', () => {
            const backupFiles = getBackupFiles('test/resources/destructive');
            for (const bkpFile of backupFiles) {
                fs.unlinkSync(`test/resources/destructive/${bkpFile}`);
            }
        });

        it('creates a backup file with name of the form filename.ext.0.bkp when none exists', () => {
            const backupFile: string = 'test/resources/destructive/testdestructive1.xml.0.bkp';
            const existedBefore: boolean = fs.existsSync(backupFile);

            createBackupFile('test/resources/destructive/testdestructive1.xml');

            const existsAfter: boolean = fs.existsSync(backupFile);
            expect(existedBefore).to.equal(false);
            expect(existsAfter).to.equal(true);
        });

        it('returns the name of the new backup file', () => {

            const result = createBackupFile('test/resources/destructive/testdestructive1.xml');
            expect(result).to.include('test/resources/destructive/testdestructive1.xml');
            expect(result).to.include('.bkp');
        });

        after('delete test backup files', () => {
            const backupFiles = getBackupFiles('test/resources/destructive');
            for (const bkpFile of backupFiles) {
                fs.unlinkSync(`test/resources/destructive/${bkpFile}`);
            }
        });
    });
});
