import { BaseModel, VertexModel, EdgeModel, IModelValidationError } from '@Core/models/model';
import { BaseDataContext } from '@Core/contexts/base-data-context';
import { DataContext } from '@Core/contexts/data-context';
import _ from 'lodash';
import { ContractDate } from '@Core/utils/contract-date';

export class ModelUtils {

    /**
     * Identifies if a given item with the same Id exists in the given array.  If the item is present
     * in the array then it is replaced.  If not present it is appended to the end of the array.
     * Return false if the item was added and true it is was replaced.
     * @param array Array of BaseModels
     * @param item The BaseModel to be added or to replace the existing
     */
    static addOrReplace(array: BaseModel[], item: BaseModel): boolean {
        var index: number = _.findIndex(array, { Id: item.Id });

        if (index == -1) {
            array.push(item);
            return false;
        }
        else {
            array.splice(index, 1, item);
            return true;
        }
    }

    /**
     * Creates a DomainId (domain#rid) from a given model object and an Id
     * @param model
     * @param Id
     */
    static createDomainId(model: BaseModel, Id: string): string {
        if (!model || !Id)
            return null;
        return model.Domain + "#" + Id;
    }

    /**
     * Parsed a given DomainId and returns the portion after the #
     * @param domainId
     */
    static getIdFromDomainId(domainId: string): string {
        if (!domainId)
            return domainId; // return what was given

        let index = domainId.indexOf('#');

        // make sure the string has a #
        if (index == -1)
            return domainId; // return what was given

        // make sure the # wasn't the last character
        if (index < domainId.length - 1)
            return domainId.substring(index + 1);

        return domainId; // otherwise, return what was given
    }

    /**
     * Retrieves the data property of each vertex on the opposite end of the relationship
     * @param model the Vertex that owns the relationship
     * @param relationship the name of the relationship to traverse
     * @param context the DataContext that houses the data
     */
    static getVertexDataFromEdges(model: VertexModel, relationship: string, context: DataContext): any[] {
        let results: any[] = [];

        let edges = context.getItems(model[relationship]);

        _.forEach(edges, edge => {
            var vertex = context.get(edge[relationship]);

            if (vertex)
                results.push(vertex.data);
        });

        return results;
    }

    static getVertexIdsFromEdges(model: VertexModel, relationship: string, context: DataContext): string[] {
        let results: string[] = [];

        let edges = context.getItems(model[relationship]);

        _.forEach(edges, edge => {
            let vertexid = edge[relationship];
            if (vertexid)
                results.push(vertexid);
        });

        return results;
    }

    /**
     * Takes an edge and returns a POJO that matches our standard Web Api format from the perspective of the
     * given relationship name.
     * @param edge
     * @param relationshipName
     * @param context
     * @param apiKeyName if the edge connects the vertex to a vertex using an apikey, 
     *                   then that vertex's apikeyname must be supplied to serialize it properly.
     * @param domainType if apiKey is used, apiKeyDomainType should also be specified, 
     *                   so that it can be stripped from the id as part of serialization.
     *                   i.e. Tenant#User:testkey should be converted to "testkey" by specififying "User" in apiKeyDomainType.
     */
    static serializeShallowEdge(edges: EdgeModel[], relationshipName: string) {
        // return undefined for edges that are not explicitly set
        if (edges === null) {
            return undefined;
        }
        const serializedEdgeArray = [];
        for (const edge of edges) {
            if (!edge) continue;
            let data = _.omit(edge.data, ["In", "Out", "Id"]);

            if (edge.Id)
                data["@RelationshipId"] = edge.Id;
            if (!edge[relationshipName]())
                continue;

            let opposingVertex: VertexModel = edge[relationshipName]() as VertexModel;

            let id = ModelUtils.getIdFromDomainId(opposingVertex.DomainId);
            const apiKeyName: string = opposingVertex._APIKEY;
            if (apiKeyName) {
                id = this.getIdFromApiKey(id);
            }

            let opposingData = { [apiKeyName || "Id"]: id };
            opposingData["@Type"] = opposingVertex.Type;

            data["@Relationship"] = opposingData;
            serializedEdgeArray.push(data);
        }

        return serializedEdgeArray;
    }

    /**
     * Takes a list of models and returns an array of deep clones of their underlying data
     * @param models
     */
    static getDataFromListOfModels(models: BaseModel[]): any[] {
        let results: any[] = [];

        _.forEach(models, model => {
            results.push(_.cloneDeep(model.data));
        });

        return results;
    }

    /**
     * Remove undefined properties from model
     * @param models
     */
    static removePropertiesSetToUndefined(obj: object) {
        for (var propName in obj) {
            if (obj[propName] === undefined) {
                delete obj[propName];
            }
        }
    }

    /**
     * Get the Id from an API key
     * @param id
     */
    static getIdFromApiKey(id: string) {
        if (!id) return null;
        return id.substring(id.indexOf(':') + 1);
    }

    static extractModelErrors(errorContainer: any): IModelValidationError[] {
        if (errorContainer && errorContainer.error) {
            errorContainer = errorContainer.error;
        }
        if (errorContainer && errorContainer.Errors) {
            return _.filter<any>(errorContainer.Errors, err => err.Path);
        }
    }

    static getTaskType(task: BaseModel) {
        // Removes Task from the Type, adds spaces before every Uppercase letter, then trims leading and trailing spaces
        return task.Type.substring(4).replace(/([A-Z])/g, ' $1').trim();
    }

    /** Create a POJO (with a 1-based Month) from a ContractDate. */
    public static serializeContractDate(date: ContractDate): any {
        if (date instanceof ContractDate)
            return date.toJSON();

        // Not a ContractDate; just return it.  (Could be nil or already serialized.)
        return date;
    }

    /** Create a ContractDate from a serialized representation (with a 1-based Month). */
    public static deserializeContractDate(rawDate: any): ContractDate {
        if (_.isNil(rawDate) || rawDate instanceof ContractDate)
            return rawDate;

        if (_.isString(rawDate))
            rawDate = JSON.parse(<string>rawDate)

        if (rawDate.Year && rawDate.Month && rawDate.Day)
            return new ContractDate(rawDate.Year, rawDate.Month - 1, rawDate.Day);

        return null;
    }

    static deserializeVertex<T extends BaseModel>(model: T, input: Object, datacontext: BaseDataContext,
        inRelationships: EdgeRelationship[], outRelationships: EdgeRelationship[], superDeserialize: (input, datacontext) => void): T {
        if (!input)
            return model;
        if (model.Type !== input['@Type']) {
            let derivedTypes = (model.constructor as typeof VertexModel).DerivedTypes;
            let derivedType = derivedTypes.find(t => t.className === input['@Type']);
            if (!derivedType) {
                throw `Could not find a derived type of ${input['@Type']} for base type ${model.Type} in domain ${model.Domain}`;
            }
            const derivedModel = derivedType.type;
            model = new derivedModel() as T;
            model.deserialize(input, datacontext);
            return model;
        }
        let domainId: string;
        // The domainId hasn't been parsed yet, so we use the modelutils version here
        if (model._APIKEY) {
            domainId = ModelUtils.createDomainId(model, model.Type + ":" + input["#Key"]);
        } else {
            domainId = ModelUtils.createDomainId(model, input["Id"]);
        }

        var otherVerticesToDeserialize: { type: new () => BaseModel, vertex: any}[] = []; 
        var existingModel = datacontext.get(domainId);
        for (const inRel of inRelationships) {
            var inVerticesToDeserialize = this.deserializeRelationships(inRel, input, datacontext, model, domainId, true, existingModel);
            otherVerticesToDeserialize = otherVerticesToDeserialize.concat(inVerticesToDeserialize);
        }
        for (const outRel of outRelationships) {
            var outVerticesToDeserialize = this.deserializeRelationships(outRel, input, datacontext, model, domainId, false, existingModel);
            otherVerticesToDeserialize = otherVerticesToDeserialize.concat(outVerticesToDeserialize);

        }
        if (model._APIKEY) {
            input["Id"] = model.Type + ":" + input["#Key"];
        }
        superDeserialize.bind(model, input, datacontext)();

        // If there were any deep edges, we waited until after to deserialize the other vertex
        // so we don't mess with the edge deserialization. Deserialize those vertices now.
        _.forEach(otherVerticesToDeserialize, vertex => {
            new vertex.type().deserialize(vertex.vertex, datacontext); 
        });
        return model;
    }

    static deserializeEdge<T extends EdgeModel>(model: T, input: any, datacontext: BaseDataContext,
        superDeserialize: (input, datacontext) => void): T {
        if (!input)
            return model;

        if (model.Type !== input['@Type']) {
            let derivedTypes = (model.constructor as typeof EdgeModel).DerivedTypes;
            let derivedType = derivedTypes.find(t => t.className === input['@Type']);
            if (!derivedType) {
                throw `Could not find a derived type of ${input['@Type']} for base type ${model.Type} in domain ${model.Domain}`;
            }
            const derivedModel = derivedType.type;
            model = new derivedModel() as T;
            model.deserialize(input, datacontext);
            return model;
        }

        var id = input["Id"] ?? input["@RelationshipId"];
        let domainId: string = ModelUtils.createDomainId(model, id);

        var existingModel = datacontext.get(domainId);

        if (!existingModel || 
            !existingModel.ObjectVersionNumber ||
            existingModel.ObjectVersionNumber < model.ObjectVersionNumber) {
            var inVertexId = input.InIdPair?.Id;
            var inVertexDomainId = ModelUtils.createDomainId(model, inVertexId);
            model.In = inVertexDomainId;
            if (inVertexId) {
                var inVertex = datacontext.get(inVertexDomainId) as VertexModel;
                if (inVertex) {
                    var rel = _.find(inVertex.inRelationships, rel => model instanceof rel.edgeType);
                    let _propertyName = `_${rel.propertyName}`;
                    if (!inVertex[_propertyName].has(domainId))
                        inVertex[_propertyName].add(domainId);
                }
                
            }
    
            var outVertexId = input.OutIdPair?.Id;
            var outVertexDomainId = ModelUtils.createDomainId(model, outVertexId);
            model.Out = outVertexDomainId;
            if (outVertexId) {
                var outVertex = datacontext.get(outVertexDomainId) as VertexModel;
                if (outVertex) {
                    var rel = _.find(outVertex.outRelationships, rel => model instanceof rel.edgeType);
                    let _propertyName = `_${rel.propertyName}`;
                    if (!outVertex[_propertyName].has(domainId))
                        outVertex[_propertyName].add(domainId);
                }            
            }
        }

        superDeserialize.bind(model, input, datacontext)();

        return model;
    }

    private static deserializeRelationships(rel: EdgeRelationship, input: object, baseDataContext: BaseDataContext, 
        model: BaseModel, domainId: string, inRelationship: boolean, existingModel: BaseModel): any[] {
        let propertyName = rel.propertyName;
        let _propertyName = `_${propertyName}`;
        let property = input[propertyName];
        let oppositePropertyName = rel.otherVertexPropertyName;    
        var otherVerticesToDeserialize : { type: new () => BaseModel, vertex: any}[] = []; 

        if (property) {
            delete input[propertyName];
            if (_.isArray(property) && baseDataContext) {
                var oldEdgeIds = (existingModel ? existingModel[_propertyName] : new Set<string>()) as Set<string>;
                // Clear out existing relationships of this type
                model[_propertyName] = new Set<string>();
                _.forEach(property, obj => {
                    let edgeModel = new rel.edgeType();
                    let edge = edgeModel.deserialize(obj, baseDataContext);
                    let relationship = obj['@Relationship'];
                    if (relationship) {
                        const vertexObject = rel.otherVertexType.DerivedTypes.find(t => t.className === relationship['@Type']);
                        let vertexModel: new () => BaseModel;
                        if (!vertexObject) {
                            vertexModel = rel.otherVertexType as any;
                        } else {
                            vertexModel = vertexObject.type;
                        }

                        // does this relationship have any properties other than Id and @Type?
                        if (_.keys(relationship).length > 2) {
                            otherVerticesToDeserialize.push({ type: vertexModel, vertex: relationship});
                            edge[_propertyName] = ModelUtils.createDomainId(new vertexModel() as BaseModel, relationship.Id);
                        }
                        else {
                            // just record the reference to the other vertex
                            edge[_propertyName] = ModelUtils.createDomainId(new vertexModel() as BaseModel, relationship.Id); 
                        }

                        // create the back reference on the other vertex if it is not already there.
                        if (baseDataContext.has(edge[_propertyName])) {
                            var backref = baseDataContext.get(edge[_propertyName]);
                            if (backref && !backref[`_${oppositePropertyName}`].has(edge.DomainId))
                                backref[`_${oppositePropertyName}`].add(edge.DomainId);
                        }
                    }
                    // Set the back reference on the edge
                    edge[`_${oppositePropertyName}`] = domainId;

                    // add the edge to the relationship set
                    if (!model[_propertyName].has(edge.DomainId))
                        model[_propertyName].add(edge.DomainId);
                    
                    oldEdgeIds.delete(edge.DomainId);
                });

                // Any old edge ids that were not included in the new set should be removed
                // from the context. 
                _.forEach(Array.from(oldEdgeIds), id => {
                    (baseDataContext as DataContext)?.remove(id);
                });
            }
        } else {
            if (existingModel && existingModel[_propertyName] && existingModel[_propertyName].length) {
                model[_propertyName] = existingModel[_propertyName];          
            } else {
                var dataContext = baseDataContext as DataContext;
                if (dataContext && dataContext.getStore) {
                    var edgeStore = dataContext.getStore<EdgeModel>(new rel.edgeType);            
                    
                    // Filter the edges where the Id matches on the correct side of the edge
                    var foundEdges = edgeStore.values.value.filter(e => (e.In == domainId && inRelationship) 
                        || (e.Out == domainId && !inRelationship));
                    if (foundEdges.length > 0) {
                        foundEdges.forEach(foundEdge => {                        
                            model[_propertyName].add(foundEdge.DomainId);
                        });                
                    }                                            
                }
            }
            
        }
        return otherVerticesToDeserialize;
    }
}

export interface EdgeRelationship {
    edgeType: new () => EdgeModel;
    propertyName: string;
    otherVertexPropertyName: string;
    dEdges?: Map<string, new () => BaseModel>;
    otherVertexType?: typeof BaseModel;
}
export interface MapInterface<K, V> extends Map<K, V> {
}
export const _Map = Map;