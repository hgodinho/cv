import { NodeObject } from "react-force-graph-3d";
import { NODE_TYPES } from "./constants";

export function getType(node: NodeObject) {
    let type = NODE_TYPES[node.type];
    if (["Place", "Country", "City"].includes(node.type)) {
        type = NODE_TYPES.Place;
    }
    if (["Role", "OrganizationRole"].includes(node.type)) {
        type = NODE_TYPES.Role;
    }
    if (["Organization", "Project"].includes(node.type)) {
        type = NODE_TYPES.Organization;
    }
    return type as keyof typeof NODE_TYPES;
}
