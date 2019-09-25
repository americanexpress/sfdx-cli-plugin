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

    describe('isLaterVersion', () => {

        it('returns TRUE when 0.0.0.1 and 1.0.0.0 are passed', () => {
            expect(sfdxProj.isLaterVersion('0.0.0.1', '1.0.0.0')).to.equal(true);
        });

        it('returns TRUE when 0.0.0.1 and 0.0.0.2 are passed', () => {
            expect(sfdxProj.isLaterVersion('0.0.0.1', '0.0.0.2')).to.equal(true);
        });

        it('returns TRUE when 0.0.1.1 and 0.0.0.23 are passed', () => {
            expect(sfdxProj.isLaterVersion('0.0.1.1', '0.0.0.23')).to.equal(true);
        });

        it('returns FALSE when 2.1.1.1 and 2.1.1.0 are passed', () => {
            expect(sfdxProj.isLaterVersion('2.1.1.1', '2.1.1.0')).to.equal(false);
        });

        it('returns FALSE when 1.0.0.LATEST and 1.0.0.0 are passed', () => {
            expect(sfdxProj.isLaterVersion('1.0.0.LATEST', '1.0.0.0')).to.equal(false);
        });
    });
});
