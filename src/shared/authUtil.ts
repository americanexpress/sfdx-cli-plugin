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
import * as bluebird from 'bluebird';
import * as fs from 'fs-extra';
import * as jsforce from 'jsforce';
import * as g from '../globals';
import * as fileUtil from './fileUtil';

export interface AuthInfo {
    username: string;
    connection: jsforce.Connection;
    userId: string;
    orgId: string;
}
export interface ConnInfo {
    loginUrl?: string;
    instanceUrl?: string;
    accessToken?: string;
}

export function createConnection(input?: ConnInfo): jsforce.Connection {
    let conn: jsforce.Connection;
    if (input) {
        conn = new jsforce.Connection(input);
    } else {
        conn = new jsforce.Connection({});
    }
    return conn;
}

export function persistCredentials(credentials: AuthInfo) {
    const filePath = `${g.GLOBAL_CONFIG_DIR}/${credentials.username}`;
    fileUtil.writeObjectToFile(filePath, credentials);
}

export function findConnection(username: string) {
    const filePath = `${g.GLOBAL_CONFIG_DIR}/${username}`;
    const jsonString: string = fs.readFileSync(filePath, { encoding: 'utf-8' });
    const creds = JSON.parse(jsonString);
    const conn = new jsforce.Connection({
        instanceUrl: creds.instanceUrl,
        accessToken: creds.sessionId
    });
    return conn;
}

export function newConnection(username: string, password: string, loginUrl?: string) {
    let conn;
    if (loginUrl) {
        conn = new jsforce.Connection({loginUrl});
    } else {
        conn = new jsforce.Connection({});
    }
    return conn;
}

export async function login(username: string, password: string, loginUrl?: string) {

    const conn = newConnection(username, password, loginUrl);
    bluebird.promisifyAll(Object.getPrototypeOf(conn));
    const result = await conn.login(username, password);
    const authInfo: AuthInfo = {
        connection: conn,
        username,
        userId: result.id,
        orgId: result.organizationId
    };
    return authInfo;
}
