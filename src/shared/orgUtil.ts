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
import child_process = require('child_process');
import { execSync } from 'child_process';
import util = require('util');
import pkg = require('../helpers/packageHelper');
import * as consts from './constants';

const exec = util.promisify(child_process.exec);

export interface InstalledPackage {
    Id: string;
    SubscriberPackageId: string;
    SubscriberPackageName: string;
    SubscriberPackageNamespace: string;
    SubscriberPackageVersionId: string;
    SubscriberPackageVersionName: string;
    SubscriberPackageVersionNumber: string;
}

export interface ScratchOrg {
    instanceUrl: string;
    username: string;
    password: string;
    alias: string;
}

/**
 * Determines dependencies that have been installed on the targe org
 * @param username Username for the target org
 * @returns Array of PackageVersionBasic objects
 */
export async function getInstalledPackages(username: string) {

    const installedResp = await exec(`sfdx force:package:installed:list -u ${username} --json`);
    const installed: InstalledPackage[] = await JSON.parse(installedResp.stdout).result;
    const withParent = true;
    const projectJsonObj = await pkg.getProjectJson();
    const dependencies = await pkg.getDependencies({
        projectJson: projectJsonObj,
        includeParent: withParent
    });

    const filePackageInfo: pkg.FilePackageInfo[] = dependencies.map(p => {
        return { package: p.name, versionNumber: p.version };
    });

    const retArr: pkg.PackageVersionBasic[] = buildOrderedUninstallArray(filePackageInfo, installed);
    return retArr;
}

/**
 * Builds the array needed to uninstall dependency packages in the correct order
 * @param declaredDependencies Dependencies
 * @param installed Array of installed packages
 * @returns Array of PackageVersionBasic objects
 */
export function buildOrderedUninstallArray(
    declaredDependencies: pkg.FilePackageInfo[], installed: InstalledPackage[]): pkg.PackageVersionBasic[] {

    const uninstallArr: pkg.PackageVersionBasic[] = new Array();
    for (const dep of declaredDependencies) {
        const installedVersion = installed.filter(i => i.SubscriberPackageName === dep.package);
        if (installedVersion.length > 0) {
            const toUninstall: pkg.PackageVersionBasic = {
                id: installedVersion[0].SubscriberPackageVersionId,
                name: installedVersion[0].SubscriberPackageName,
                version: installedVersion[0].SubscriberPackageVersionNumber
            };
            uninstallArr.push(toUninstall);
        }
    }
    return uninstallArr.reverse();
}

/**
 * Wrapper functiion for force:org:list
 */
export function runForceOrgList() {
    const resp = execSync('sfdx force:org:list --json', { encoding: 'utf8' });
    const orgListResp = JSON.parse(resp);
    return orgListResp;
}

/**
 * Wrapper function for force:alias:list
 */
export function getAliases() {
    const resp = execSync('sfdx force:alias:list --json', { encoding: 'utf8' });
    const aliases = JSON.parse(resp);
    return aliases;
}

/**
 * Gets an org's alias from the username
 * @param username Username for which to find alias
 * @returns The alias or the username if none exists
 */
export function getAliasByUsername(username: string) {
    const aliases = getAliases();
    const aliasList = aliases.result;
    const found = aliasList.find(a => a.value === username);
    return found ? found.alias : username;
}

/**
 * Returns only connected sandboxes and activer scratch orgs
 */
export function getAllAvailableOrgs() {

    const orgListResp = runForceOrgList();
    const sandboxes = filterConnectedSandboxesForDisplay(orgListResp);
    const scratches = filterActiveScratchOrgsForDisplay(orgListResp);
    const all = sandboxes.concat(scratches);
    return all;
}

/**
 * Filters response from force:org:list to only include Connected sandboxes
 * @param forceOrgListResp JSON response from force:org:list
 * @returns Array of name-value objects
 */
function filterConnectedSandboxesForDisplay(forceOrgListResp) {
    const scratchOrgs = forceOrgListResp.result.nonScratchOrgs;

    // Return connected, non-devhub entries only
    return scratchOrgs.filter(org => !org.isDevHub && org.connectedStatus === 'Connected').map(org => {
        const alias = util.isNullOrUndefined(org.alias) ? 'NA' : org.alias;
        return { name: `${alias} - ${org.username}`, value: org.username };
    });
}

/**
 * Filters the response from force:org:list to only include Active scratch orgs
 * @param forceOrgListResp
 * @retruns Array of name-value objects
 */
function filterActiveScratchOrgsForDisplay(forceOrgListResp) {

    const scratchOrgs = forceOrgListResp.result.scratchOrgs;

    return scratchOrgs.filter(org => org.status === 'Active').map(org => {
        const alias = util.isNullOrUndefined(org.alias) ? 'NA' : org.alias;
        return { name: `${alias} - ${org.username}`, value: org.username };
    });
}

export function getActiveScratchOrgs() {

    const orgListResp = runForceOrgList();
    return filterActiveScratchOrgsForDisplay(orgListResp);
}

/**
 * Wrapper function for force:org:display
 * @param username Target org username
 */
export function getScratchOrgDetail(username: string) {

    const resp = execSync(`sfdx force:org:display -u ${username} --json`, {encoding: 'utf8'});
    const orgDetailResp = JSON.parse(resp);
    return orgDetailResp.result;
}

/**
 * Gets the Active sandboxes
 */
export function getActiveSandboxes() {
    const orgListResp = runForceOrgList();
    return filterConnectedSandboxesForDisplay(orgListResp);
}

/**
 * Retrieves the username suffix
 * @param username Target org username
 */
export function parseEnvironmentFromUsername(username: string): string {
    const env = username.substring(username.lastIndexOf('.'));
    return env.includes('.') ? env : `.${env}`;
}

/**
 * Checks if username is for a sandbox
 * @param username Username to check
 */
export function isSandboxUsername(username: string): boolean {
    return !(username.indexOf('test-') > -1
                && username.indexOf('@example.com') > -1);
}

/**
 * Computes the type of org from the alias
 * @param alias Alias of org to compute type for
 * @param orgListJson JSON output from force:org:list
 * @returns "devhub", "sandbox", "scratch" or "notfound"
 */
export function getOrgTypeByAlias(alias: string, orgListJson): string {

    let orgType: string;

    // Check the non-scratch orgs
    const nonScratchOrgs = orgListJson.result.nonScratchOrgs.filter(nso => nso.alias === alias);
    orgType = getTypeOfSandbox(nonScratchOrgs);
    if (orgType === consts.ORG_TYPE_NOTFOUND) {
        // Check the scratch orgs
        const scratchOrgs = orgListJson.result.scratchOrgs.filter(so => so.alias === alias);
        orgType = getTypeOfScratch(scratchOrgs);
    }
    return orgType;
}

function getTypeOfSandbox(nonScratchOrgs): string {

    let orgType = consts.ORG_TYPE_NOTFOUND;
    if (nonScratchOrgs.length > 0) {
        orgType = consts.ORG_TYPE_SANDBOX;
        const nonScratchOrg = nonScratchOrgs[0];
        if (nonScratchOrg.isDevHub) {
            orgType = consts.ORG_TYPE_DEVHUB;
        }
        return orgType;
    }
    return orgType;
}

function getTypeOfScratch(scratchOrgs): string {
    let orgType = consts.ORG_TYPE_NOTFOUND;
    if (scratchOrgs.length > 0) {
        orgType = consts.ORG_TYPE_SCRATCH;
    }
    return orgType;
}

/**
 * Computes the type of org from the username
 * @param username Username of org to compute type for
 * @param orgListJson JSON output from force:org:list
 * @returns "devhub", "sandbox", "scratch" or "notfound"
 */
export function getOrgTypeByUsername(username: string, orgListJson): string {

    let orgType: string;

    // Check the non-scratch orgs
    const nonScratchOrgs = orgListJson.result.nonScratchOrgs.filter(nso => nso.username === username);
    orgType = getTypeOfSandbox(nonScratchOrgs);
    if (orgType === consts.ORG_TYPE_NOTFOUND) {
        // Check the scratch orgs
        const scratchOrgs = orgListJson.result.scratchOrgs.filter(so => so.username === username);
        orgType = getTypeOfScratch(scratchOrgs);
    }
    return orgType;
}
