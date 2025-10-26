import { ModelUtils } from '@Core/utils/model-utils';
import { ContractDate } from '@Core/utils/contract-date';
import { Account, PolicySet, Workflow, Program, SMIdentity } from '@Core/models/codegen/area.models';

describe('ModelUtils class', () => {
    describe('serializeContractDate()', () => {
        it('should a serialize a ContractDate to a POJO, adding 1 to the Month', () => {
            let model: any = {
                id: '123',
                cDate: ModelUtils.serializeContractDate(new ContractDate(2020, 0, 1))
            };
            let stringModel = '{"id":"123","cDate":{"Year":2020,"Month":1,"Day":1}}';
            expect(JSON.stringify(model)).toBe(stringModel);
        });
        it('should not modify a POJO', () => {
            let pojo = JSON.parse('{"Year": 2020, "Month": 1, "Day": 1}');
            let model: any = {
                id: '123',
                cDate: ModelUtils.serializeContractDate(pojo)
            };
            let stringModel = '{"id":"123","cDate":{"Year":2020,"Month":1,"Day":1}}';
            expect(JSON.stringify(model)).toBe(stringModel);
        });
        it('should not modify undefined', () => {
            let pojo = ModelUtils.serializeContractDate(undefined)
            expect(pojo).toBe(undefined);
        });
        it('should not modify null', () => {
            let pojo = ModelUtils.serializeContractDate(null)
            expect(pojo).toBe(null);
        });
    });

    describe('deserializeContractDate()', () => {
        it('should create a Contract date from a POJO, subtracting 1 from the Month', () => {
            let pojo = {"Year": 2020, "Month": 1, "Day": 1};
            let contractDate: ContractDate = ModelUtils.deserializeContractDate(pojo);
            expect(contractDate.Year).toBe(2020);
            expect(contractDate.Month).toBe(0);
            expect(contractDate.Day).toBe(1);
        });
        it('should create a Contract date from a string, subtracting 1 from the Month', () => {
            let dateString = '{"Year": 2020, "Month": 1, "Day": 1}';
            let contractDate: ContractDate = ModelUtils.deserializeContractDate(dateString);
            expect(contractDate.Year).toBe(2020);
            expect(contractDate.Month).toBe(0);
            expect(contractDate.Day).toBe(1);
        });
        it('should return null if the object lacks the required properties', () => {
            let dateString = '{"Year": 2020, "Day": 1}';
            let contractDate: ContractDate = ModelUtils.deserializeContractDate(dateString);
            expect(contractDate).toBeNull();

            let date = {Month: 1};
            contractDate = ModelUtils.deserializeContractDate(date);
            expect(contractDate).toBeNull();
        });
        it('should not modify a ContractDate', () => {
            let oldDate = new ContractDate(2020, 0, 1);
            let contractDate: ContractDate = ModelUtils.deserializeContractDate(oldDate);
            expect(contractDate).toBe(oldDate);
            expect(contractDate.Year).toBe(2020);
            expect(contractDate.Month).toBe(0);
            expect(contractDate.Day).toBe(1);
        });
        it('should not modify undefined', () => {
            let contractDate: ContractDate = ModelUtils.deserializeContractDate(undefined);
            expect(contractDate).toBe(undefined);
        });
        it('should not modify null', () => {
            let contractDate: ContractDate = ModelUtils.deserializeContractDate(null);
            expect(contractDate).toBe(null);
        });
    });
    
    describe('removePropertiesSetToUndefined()', () => {
        it('should only remove undefined properties', () => {
            let pojo = {"TestNull": null, "TestFull": 123, "TestUndefined": undefined};
            ModelUtils.removePropertiesSetToUndefined(pojo);
            Object.getOwnPropertyNames(pojo).forEach(m => {
                expect(pojo[m]).toBeDefined();
            });
            expect(pojo.TestNull).toBeNull();
            expect(pojo.TestFull).toBe(123);
        });
    });    
});