import path from "path";
import { GatsbyNode } from "gatsby";
import { getType } from "./utils";
import { PageQueryResponse } from "./types";

export const createPages: GatsbyNode["createPages"] = async (gatsbyApi) => {
    const { createPage } = gatsbyApi.actions;

    const result = await gatsbyApi.graphql<PageQueryResponse>(`
    query graph {
        graph {
            nodes {
                _id
                type
                name
                id
            }
            links {
                object
                predicate
                subject
                target {
                    _id
                    name
                    type
                    id
                }
                source {
                    _id
                    name
                    type
                    id
                }
            }
        }
        properties {
            list
        }
        site {
            siteMetadata {
                title
                siteUrl
                description
            }
        }
    }`);

    const nodes = result.data?.graph.nodes;
    const links = result.data?.graph.links;
    const properties = result.data?.properties.list;
    const site = result.data?.site.siteMetadata;

    for (const node of nodes) {
        let type = getType(node);

        createPage({
            path: `/${node._id}`,
            component: path.resolve(`./src/templates/${type}.tsx`),
            context: {
                id: node._id,
                name: node.name,
                type: node.type,
                properties,
                nodes,
                links,
                site,
            },
        });
    }
};
