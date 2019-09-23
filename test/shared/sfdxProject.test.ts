import { expect } from '@salesforce/command/dist/test';
import * as sfdxProj from '../../src/shared/sfdxProject';

// tslint:disable-next-line:no-var-requires
const testJson = require('../resources/test-project.json');
// tslint:disable-next-line:no-var-requires
// const noDefaultJson = require('../resources/test-project-no-default.json');

describe('---------- sfdxProject UNIT ----------', () => {

    describe('getMainPackage', () => {
        let mainPackage;
        before(async () => {
            mainPackage = await sfdxProj.getMainPackage({testJson}.testJson);
        });

        it('returns package with correct attributes', async () => {
            expect(mainPackage.packageName).to.equal('d_trigger_framework');
            expect(mainPackage.isMainPackage).to.equal(true);
            expect(mainPackage.isMainContractPackage).to.equal(false);
        });

    });

    describe('getPackageDependencies', () => {
        let packages;
        before(() => {
            packages = sfdxProj.getPackageDependencies({testJson}.testJson);
        });

        it('returns 8 dependencies with no contracts', () => {
            expect(packages.length).to.equal(8);
        });

        it('returns isVersionSpecified value of true if package ID starts with "04t"', () => {
            expect(packages.find(pkg => pkg.packageName === 'd_trigger_monitor').isVersionIdSpecified).to.equal(true);
        });

        it ('populates the version number correctly', () => {
            expect(packages.find(pkg => pkg.packageName === 'd_trigger_monitor').versionNumber).to.equal('1.0.0.3');
            expect(packages.find(pkg => pkg.packageName === 'd_generic_apex').versionNumber).to.equal('1.4.0.LATEST');
        });

        it ('correctly sets isMainContractPackage flag', () => {
            expect(packages.find(pkg => pkg.packageName === 'd_trigger_framework_contracts').isMainContractPackage).to.equal(true);
            expect(packages.find(pkg => pkg.packageName === 'd_generic_apex').isMainContractPackage).to.equal(false);
        });
    });
});