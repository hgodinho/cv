const jsonld = require("jsonld");

async function getJsonLD(data, context) {
    const expanded = await jsonld.expand(data);
    const compacted = await jsonld.compact(data, context);
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

module.exports = { getJsonLD };
