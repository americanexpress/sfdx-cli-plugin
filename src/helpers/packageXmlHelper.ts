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

import * as builder from 'xmlbuilder';
import * as xmlUtil from '../shared/xmlUtil';

export interface MetadataComponentNodeMap {
    metadataType: string;
    componentType: string;
    xpath: string;
    filePath: string;
}

export interface PackageXmlType {
    name: string;
    members: string[];
}

export function deserializeTypesElements(xml: string, excludeStarred?: boolean): PackageXmlType[] {
    // Get all types

    const result: PackageXmlType[] = [];
    const starredTypesNodes = xmlUtil.findNodes('/Package/types[members="*"]/*[self::name]', xml);
    const explicitTypesNodes = xmlUtil.findNodes('/Package/types[members!="*"]', xml);

    const typeNames: string[] = [];

    for (const typesElt of explicitTypesNodes) {
        const explicitType = {
            name: '',
            members: []
        };

        const typeName: string = typesElt.getElementsByTagName('name')[0].textContent;
        explicitType.name = typeName;
        if (!typeNames.includes(typeName)) {
            const members = Array.from(typesElt.getElementsByTagName('members'));
            for (const member of members) {
                const memberName = member['textContent'];
                explicitType.members.push(memberName);
            }
            result.push(explicitType);
            typeNames.push(typeName);
        }
    }

    if (!excludeStarred) {
        for (const typesElt of starredTypesNodes) {
            const typeName = typesElt.textContent;
            const starredType = {
                name: typeName,
                members: ['*']
            };
            if (!typeNames.includes(typeName)) {
                typeNames.push(typeName);
                result.push(starredType);
            }
        }
    }

    return result;
}

export function removeStarredComponents(xml: string, pretty: boolean): string {

    const explicitTypesNodes = xmlUtil.findNodes('/Package/types[members!="*"]', xml);
    const explicitTypes: PackageXmlType[] = [];

    for (const typesElt of explicitTypesNodes) {
        const explicitType = {
            name: '',
            members: []
        };
        explicitType.name = typesElt.getElementsByTagName('name')[0].textContent;
        const members = Array.from(typesElt.getElementsByTagName('members'));
        for (const member of members) {
            const memberName = member['textContent'];
            explicitType.members.push(memberName);
        }
        explicitTypes.push(explicitType);
    }

    const retXml = buildPackageXml({ types: explicitTypes }, pretty);
    return retXml;
}

/**
 * Builds xml string for a a package.xml file
 * @param content JSON object from which to populate the packageXml
 * @param pretty Determines whether to prettify the XML output string
 */
export function buildPackageXml(content, pretty: boolean) {
    const root = builder.create('Package', { encoding: 'UTF-8' })
        .att('xmlns', 'http://soap.sforce.com/2006/04/metadata');
    if (content.types) {
        for (const tp of content.types) {
            const types = root.ele('types')
                .ele('name', tp.name).up();
            for (const member of tp.members) {
                types.ele('members', member).up();
            }
        }
    }
    // TODO: make version configurable. Pass in content.
    return root.ele('version', '45.0').end({ pretty });
}
