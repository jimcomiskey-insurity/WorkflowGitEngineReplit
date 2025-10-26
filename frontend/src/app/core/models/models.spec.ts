import { DataStore } from "@Core/models/codegen/configuration.models";


describe('Configuration Codegened Models class', () => {
    describe('DataStore serialize()', () => {
        it('should not serialize undefined properties or empty edges', () => {
            let model = new DataStore();
            model.Name = "Test";
            model.Description = undefined;
            model.Aliases = null;
            model.IsStoredFor(null);
            model.setContains([]);
            let serializedModel = (model as DataStore).serialize();
            
            Object.getOwnPropertyNames(serializedModel).forEach(m => {
                expect(serializedModel[m]).toBeDefined();
                if (m != "Aliases")
                    expect(serializedModel[m]).not.toBeNull();
            });
            expect(serializedModel.Contains).toEqual([]);
            expect(serializedModel.IsStoredFor).toBeUndefined();
            expect(serializedModel.Aliases).toBeNull();
        });
    });
});