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
import { SfdxCommand } from '@salesforce/command';
import * as fs from 'fs-extra';
import glob = require('glob');
import * as path from 'path';
import * as metadataHelper from '../../../../helpers/metadataHelper';
import * as pkgXmlHelper from '../../../../helpers/packageXmlHelper';
import * as fileUtil from '../../../../shared/fileUtil';
import * as xmlUtil from '../../../../shared/xmlUtil';

export default class Prepare extends SfdxCommand {

    public static description = 'Replaces (*) elements in the destructive package.xml with destructive elements specified by name';

    public static examples = [
        `sfdx adp:source:destructive:prepare -f $POST_DESTRUCT_XML -d $CONVERTED_POST_DESTRUCT_DIR
        // Prepares the destructive xml file specifed by -f based on the converted source directory specified after -d.
        `
    ];

    protected static flagsConfig = {
        destructivexml: { char: 'f', type: 'string', description: 'Destructive XML file to prepare'},
        destructsrcdir: { char: 'd', type: 'string', required: true, description: 'MDAPI-formatted source to destruct'}
    };

    protected static requiresUsername = false;
    protected static requiresProject = false;

    // tslint:disable-next-line:no-any
    public async run(): Promise<any> {

        const absDestructiveFilePath = path.resolve(this.flags.destructivexml);
        const destructiveXml = fileUtil.readXml(absDestructiveFilePath);
        const excludeStarred = true;
        const typesArray: pkgXmlHelper.PackageXmlType[] =
                            pkgXmlHelper.deserializeTypesElements(destructiveXml, excludeStarred);

        const mdCompMaps = metadataHelper.getMetadataComponentNodeMaps();

        // Loop through each map
        for (const compMap of mdCompMaps) {
            // Get the source files based on the map's filepath
            const srcDir = path.normalize(`${this.flags.destructsrcdir}/${compMap.filePath}`);
            const fileNames = glob.sync(srcDir);

            let members: string[] = [];
            // Loop through each file and get the component type names
            for (const fileName of fileNames) {
                const absFilePath = path.resolve(fileName);
                const xml = fileUtil.readXml(absFilePath);
                const componentNames = xmlUtil.findComponentNames(compMap.xpath, xml);
                members = members.concat(componentNames);
            }

            // Add the component type to the total array if not already there
            if (!typesArray.find(t => t.name === compMap.componentType)) {
                const typeElt = { name: compMap.componentType, members };
                typesArray.push(typeElt);
            }
        }

        const newXml: string = pkgXmlHelper.buildPackageXml({ types: typesArray }, true);

        // Create backup of destructive.xml
        fs.writeFileSync(absDestructiveFilePath, newXml);
    }
}
