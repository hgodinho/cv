import { NodeObject } from "react-force-graph-3d";
import { NODE_TYPES } from "./constants";

export function getType(node: NodeObject) {
    let type = NODE_TYPES[node.type];
    const lower =
        typeof node.type !== "undefined"
            ? node.type.toLowerCase()
            : typeof node._type !== "undefined"
                ? node._type.toLowerCase()
                : "";

    if (["person"].includes(lower)) {
        type = NODE_TYPES.Person;
    }
    if (
        ["place", "country", "city", "civicstructure", "museum"].includes(lower)
    ) {
        type = NODE_TYPES.Place;
    }
    if (
        [
            "intangible",
            "thing",
            "language",
            "computerlanguage",
            "educationaloccupationalprogram",
            "rating",
            "aggregaterating",
            "occupation",
            "role",
            "organizationrole",
        ].includes(lower)
    ) {
        type = NODE_TYPES.Intangible;
    }
    if (["credential", "educationaloccupationalcredential"].includes(lower)) {
        type = NODE_TYPES.Credential;
    }
    if (
        [
            "creativeWork",
            "scholarlyarticle",
            "chapter",
            "course",
            "visualartwork",
            "website",
            "softwareapplication",
        ].includes(lower)
    ) {
        type = NODE_TYPES.CreativeWork;
    }
    if (["event", "eventseries", "exhibitionevent"].includes(lower)) {
        type = NODE_TYPES.Event;
    }
    if (
        [
            "organization",
            "educationalorganization",
            "collegeoruniversity",
            "project",
        ].includes(lower)
    ) {
        type = NODE_TYPES.Organization;
    }
    return type as keyof typeof NODE_TYPES;
}
