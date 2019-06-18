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
import * as fs from 'fs-extra';
import * as path from 'path';

/**
 * Creates a backup file in the same directory
 * @param filePath File path
 * @returns Path to backup file
 */
export function createBackupFile(filePath: string): string {
    const backupExt: string = '.bkp';
    let newBkpFilePath: string = '';

    if (fs.existsSync(filePath)) {
        const dirPath: string = path.dirname(filePath);
        const backupFiles: string[] = getBackupFiles(dirPath);
        const index: number = backupFiles.length;

        newBkpFilePath = `${filePath}.${index}${backupExt}`;
        fs.copyFileSync(filePath, newBkpFilePath);
    }
    return newBkpFilePath;
}

/**
 * Retrieves names of backup files in specified directory
 * @param dirPath Directory path from which to get backup files
 * @returns Array of backup file names
 */
export function getBackupFiles(dirPath: string): string[] {
    const backupExt: string = '.bkp';
    const filenames: string[] = fs.readdirSync(dirPath);
    const backupFiles = filenames.filter(fileName => {
        return fileName.includes('.xml') && fileName.endsWith(backupExt);
    });
    return backupFiles;
}

/**
 * Recursively copies a directory
 * @param targetDir Directory to copy
 * @param destinationDir Destination directory
 */
export async function copyDir(targetDir, destinationDir) {

    await fs.copy(targetDir, destinationDir, err => {
        if (err) {
            console.error(err);
        }
    });
    console.log(`Copied ${targetDir} to ${destinationDir}`);
}

/**
 * Reads the contents of an XML file
 * @param xmlFile File to read
 * @returns File contents as string
 */
export function readXml(xmlFile: string): string {
    const xml: string = fs.readFileSync(xmlFile, { encoding: 'utf-8' });
    return xml;
}

/**
 * Writes a JSON object to a file
 * @param filePath Path to the file
 * @param jsonObject Object to persist
 */
export function writeObjectToFile(filePath, jsonObject) {
    const content = JSON.stringify(jsonObject, null, 2);
    const dirPath: string = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, {recursive: true});
    }
    fs.writeFileSync(filePath, content);
}
