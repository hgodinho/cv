import jsonld from 'jsonld';
import { JsonLD } from '../types';

async function getJsonLD(data: jsonld.JsonLdDocument): Promise<JsonLD> {
    const expanded = await jsonld.expand(data);
    const compacted = await jsonld.compact(data, data["@context"]);
    const flattened = await jsonld.flatten(data);
    const nquads = await jsonld.toRDF(data);

    return {
        raw: data,
        expanded,
        compacted,
        flattened,
        nquads,
    };
}

export { getJsonLD };
