import { BaseModel } from '@Core/models/model';

export abstract class BaseDataContext {

    addOrReplace(model: BaseModel): void {
        throw new Error("'addOrReplace' must be implemented by the child class")
    }

    has(domainid: string): boolean {
        throw new Error("'has' must be implemented by the child class");
    }

    get<T extends BaseModel>(domainid: string): T {
        throw new Error("'get' must be implemented by the child class");
    }

    clearAll(){
        // This only needs to be overridden for NewDataContexts
    }
}