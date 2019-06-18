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
import { AuthInfo, Connection } from '@salesforce/core';

export interface SourceMember {
    IsNameObsolete: boolean;
    MemberName: string;
    MemberType: string;
    MemberId: string;
}

export interface MetadataType {
    name: string;
    members: string[];
}

/**
 * Uses Tooling API to query deletions from the SourceMember object
 * @param username Username (not alias) of the scratch org
 * @returns Array of SourceMember objects
 */
export async function getDeletedComponents(username: string): Promise<SourceMember[]> {

    const conn = await Connection.create(await AuthInfo.create(username));

    const q = 'SELECT IsNameObsolete, MemberIdOrName, MemberName, MemberType, RevisionNum'
                 + ' FROM SourceMember WHERE IsNameObsolete = true'
                 + ' ORDER BY MemberType, MemberName';

    const retVal = await conn.tooling.query(q);
    // const test = retVal.records[0] as SourceMember;
    const sourceMembers = new Array();

    for (const item of retVal.records) {
        sourceMembers.push(item);
    }
    return sourceMembers;

}
