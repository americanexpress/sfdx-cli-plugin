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
import * as fs from 'fs';
import * as low from 'lowdb';
import FileSync = require('lowdb/adapters/FileSync');
import { isNullOrUndefined } from 'util';

const dbWorkflowEmailAlert: string = 'workflowEmailAlert';

/**
 * Creates a new database instance
 * @param dbPath Database file path
 */
export function createDb(dbPath: string) {
    const adapter = new FileSync(dbPath);
    const db = low(adapter);
    db.defaults({workflowEmailAlert: []}).write();
    return db;
}

/**
 * Wrapper function for createDb
 * @param dbPath Database file path
 */
function connect(dbPath: string) {
    return createDb(dbPath);
}

/**
 * Deletes the entire database file
 * @param dbPath Database file path
 */
export function destroy(dbPath: string) {
    if (fs.existsSync(dbPath)) {
        fs.unlinkSync(dbPath);
    }
}

/**
 * Deletes filtered records from the database
 * @param dbPath Database file path
 * @param objectName Name of the object from which to delete records
 * @param filter Filter string
 */
export function deleteRecords(dbPath: string, objectName: string, filter) {
    const db = connect(dbPath);
    db.get(objectName).remove(filter).write();
}

/**
 * Returns an the number of records for the specified object
 * @param dbPath Gets the number of records
 * @param objectName Object for which to count records
 * @returns Integer number of records
 */
export function getTotalObjectCount(dbPath: string, objectName: string) {
    const db = connect(dbPath);
    return db.get(objectName).size().value();
}

export function getWorkflowAlerts(dbPath) {

    const objName: string = dbWorkflowEmailAlert;
    const db = connect(dbPath);
    const data = db.get(objName).value();
    return data;
}

export function upsertWorkflowAlerts(dbPath: string, data: Array<{ fileName: string, typeName: string, alertName: string, senderAddress: string; }>) {

    const db = connect(dbPath);

    const objName: string = dbWorkflowEmailAlert;

    data.forEach(rec => {
        const foundRecs = db.get(objName).find({typeName: rec.typeName, alertName: rec.alertName});
        if (isNullOrUndefined(foundRecs.value())) {
            db.get(objName).push(rec).write();
        } else {
            foundRecs.assign({senderAddress: rec.senderAddress}).write();
        }
    });

    const recCount = db.get(objName).size().value();

    return recCount;
}
