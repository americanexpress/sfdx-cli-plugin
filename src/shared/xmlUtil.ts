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
import glob = require('glob');
import util = require('util');
import xml2js = require('xml2js');
import * as builder from 'xmlbuilder';
import * as fileUtil from './fileUtil';
import { SourceMember } from './sourceUtil';

// tslint:disable-next-line:no-var-requires
const dom = require('xmldom').DOMParser;
// tslint:disable-next-line:no-var-requires
const xpath = require('xpath');

const parser = new xml2js.Parser();
const parseString = util.promisify(parser.parseString);

const xmlBuilder = new xml2js.Builder({
    xmldec: {encoding: 'UTF-8'},
    renderOpts: {pretty: true, indent: '    ', newline: '\n'}
});

export interface XmlMergeResult {
    memberTypes: string[];
    sourceMembers: SourceMember[];
}

export interface XmlTransform {
    title: string;
    isActive: boolean;
    operation: string;
    pattern: string;
    nodeName: string;
    maxDepth?: number;
}

/**
 * Merges deleted source member records with passed in XML file into a single object representation
 * @param xmlFilePath Path to XML file
 * @param sourceMembers Source member records to merge
 * @returns XmlMergeResult object
 */
export async function mergeSourceMembersToXml(xmlFilePath: string, sourceMembers: SourceMember[]) {

    const opts = { encoding: 'utf-8' };
    const xml: string = fs.readFileSync(xmlFilePath, opts);
    const parsed = await parseString(xml);
    const root = 'Package';
    const packageElt = parsed[root];

    const allMemberTypes: string[] = new Array();
    const allMemberNames: string[] = new Array();
    const mergedSourceMembers: SourceMember[] = new Array();

    for (const memberType of packageElt.types) {
        const memberTypeName = memberType.name[0];

        for (const memberName of memberType.member) {
            if (!allMemberNames.includes(memberName)) {
                allMemberNames.push(memberName);
                const sourceMember: SourceMember = {
                    IsNameObsolete: true,
                    MemberType: memberTypeName,
                    MemberName: memberName,
                    MemberId: null
                };
                mergedSourceMembers.push(sourceMember);
            }
        }

        if (!allMemberTypes.includes(memberTypeName)) {
            allMemberTypes.push(memberTypeName);
        }
    }

    for (const sourceMember of sourceMembers) {

        const memberTypeName = sourceMember.MemberType;
        const memberName = sourceMember.MemberName;

        if (!allMemberTypes.includes(memberTypeName)) {
            allMemberTypes.push(memberTypeName);
        }

        if (!allMemberNames.includes(memberName)) {
            allMemberNames.push(memberName);
            const mergedSourceMember: SourceMember = {
                IsNameObsolete: true,
                MemberType: memberTypeName,
                MemberName: memberName,
                MemberId: null
            };
            mergedSourceMembers.push(mergedSourceMember);
        }
    }

    const retVal = {
        memberTypes: allMemberTypes,
        sourceMembers: mergedSourceMembers
    };
    return retVal;
}

/**
 * Merges two metadata XML files into a single object representation
 * @param xmlFilePath1 Path to first file to merge
 * @param xmlFilePath2 Path to second file to merge
 * @returns XmlMergeResult object
 */
export async function mergeXmlFiles(xmlFilePath1: string, xmlFilePath2: string) {

    const opts = { encoding: 'utf-8' };
    const xml1: string = fs.readFileSync(xmlFilePath1, opts);
    const xml2: string = fs.readFileSync(xmlFilePath2, opts);
    const parsed1 = await parseString(xml1);
    const parsed2 = await parseString(xml2);
    const root = 'Package';
    const package1 = parsed1[root];
    const package2 = parsed2[root];

    const allMemberTypes: string[] = new Array();
    const allMemberNames: string[] = new Array();
    const sourceMembers: SourceMember[] = new Array();

    for (const memberType of package1.types) {
        const memberTypeName = memberType.name[0];

        for (const memberName of memberType.member) {
            if (!allMemberNames.includes(memberName)) {
                allMemberNames.push(memberName);
                const sourceMember: SourceMember = {
                    IsNameObsolete: true,
                    MemberType: memberTypeName,
                    MemberName: memberName,
                    MemberId: null
                };
                sourceMembers.push(sourceMember);
            }
        }

        if (!allMemberTypes.includes(memberTypeName)) {
            allMemberTypes.push(memberTypeName);
        }
    }

    for (const memberType of package2.types) {
        const memberTypeName = memberType.name[0];
        for (const memberName of memberType.member) {
            if (!allMemberNames.includes(memberName)) {
                allMemberNames.push(memberName);
                const sourceMember: SourceMember = {
                    IsNameObsolete: true,
                    MemberType: memberTypeName,
                    MemberName: memberName,
                    MemberId: null
                };
                sourceMembers.push(sourceMember);
            }
        }
        if (!allMemberTypes.includes(memberTypeName)) {
            allMemberTypes.push(memberTypeName);
        }
    }

    const retVal = {
        memberTypes: allMemberTypes,
        sourceMembers
    };
    return retVal;
}

/**
 * Converts source members records to XML
 * @param sourceMembers Source member records to convert
 * @returns XML string
 */
export async function sourceMembersToXML(sourceMembers: SourceMember[]) {

    const memberTypes: string[] = new Array();
    for (const mbr of sourceMembers) {
        if (!memberTypes.includes(mbr.MemberType)) {
            memberTypes.push(mbr.MemberType);
        }
    }

    const doc = builder.create('Package').att('xmlns', 'http://soap.sforce.com/2006/04/metadata');
    for (const mbrType of memberTypes) {
        const typesEle = doc.ele('types');
        const filtered = sourceMembers.filter(item => item.MemberType === mbrType);
        for (const itm of filtered) {
            typesEle.ele('member', itm.MemberName);
        }
        typesEle.ele('name', mbrType);
    }
    return doc.toString({ pretty: true });
}

/**
 * Searches for OrgWideEmailAddress alerts in Workflows
 * @param xml Workflow metadata XML file
 * @returns Array of XML nodes
 */
export function findOrgWideEmailAlerts(xml: string) {

    const xpathQuery = '/Workflow/alerts[senderType="OrgWideEmailAddress"]/' +
                        '*[self::fullName or self::senderAddress]';

    const nodes = findNodes(xpathQuery, xml);
    const arr = [];
    for (const node of nodes) {
        if (node.nodeName === 'fullName') {
           arr.push({fullName: node.textContent});
        } else if (node.nodeName === 'senderAddress') {
            arr[arr.length - 1].senderAddress = node.textContent;
        }
    }
    return arr;
}

export function findComponentNames(componentXPath: string, xml: string): string[] {
    const nameXPath = `${componentXPath}/fullName`;
    const nodes = findNodes(nameXPath, xml);
    const result: string[] = [];
    for (const node of nodes) {
        result.push(node.textContent);
    }
    return result;
}

/**
 * Returns node list based on the xpath provided
 * @param xpathQuery XPath expression
 * @param xmlStr XML to search
 */
export function findNodes(xpathQuery: string, xmlStr: string) {
    const xmlNoNS = xmlStr.replace(' xmlns="http://soap.sforce.com/2006/04/metadata"', '');

    const doc = new dom().parseFromString(xmlNoNS, 'text/xml');
    const nodes = xpath.select(xpathQuery, doc);
    return nodes;
}

/**
 * Transforms metadata XML according to transform properties passed
 * @param transformProps XmlTransform object that specifies how the transformation will be performed
 */
export async function transform(transformProps: XmlTransform) {

    const t = transformProps;

    // Check operation is valid
    const validOperations: string[] = ['removeElements'];
    if (util.isNullOrUndefined(t.operation) || !validOperations.includes(t.operation)) {
        throw new Error(`Invalid operation: "${t.operation}"`);
    }

    // Build metadata files to edit
    const fileNames = glob.sync(`${t.pattern}`);

    // Edit each file
    for (const fileName of fileNames) {
        const xml = fileUtil.readXml(fileName);
        if (!util.isNullOrUndefined(xml) && xml.length > 0) {
            const result = await this.removeElements(t.nodeName, xml, transformProps.maxDepth);
            if (result.changeCount > 0) {
                fs.writeFile(fileName, result.transformedXml + '\n', err => {
                    console.log(`Writing to ${fileName}`);
                    if (err) {
                        console.log(`Error while writing to ${fileName}`);
                    }
                });
            }
        }
    }
}

/**
 * Removes specified elements from an XML string
 * @param elementName Name of element to remove
 * @param xml XML string from which to remove specified element
 * @param maxDepth Maximum tree depth to search
 */
export async function removeElements(elementName: string, xml: string, maxDepth?) {

    const xmlAsJson = await parseString(xml);
    const changeCount = removeElement(elementName, xmlAsJson, 0, maxDepth ? maxDepth : 5, 0);
    const newXml = await xmlBuilder.buildObject(xmlAsJson);
    return { transformedJson: xmlAsJson, transformedXml: newXml, changeCount };
}

/**
 * Recursive function to remove a single XML element
 * @param name Element name
 * @param obj JSON object representation of XML
 * @param depth current depth of the element
 * @param maxDepth Maximum tree depth
 * @param removalCount Number of deletions
 * @returns Number of deletions
 */
function removeElement(name, obj, depth, maxDepth, removalCount?) {

    if (depth > maxDepth) {
        return removalCount;
    }

    depth++;
    for (const prop in obj) {
        if (prop === name) {
            delete obj[prop];
            removalCount++;
        } else if (typeof obj[prop] === 'object') {
            removalCount += removeElement(name, obj[prop], depth, maxDepth, removalCount);
        }
    }
    return removalCount;
}
