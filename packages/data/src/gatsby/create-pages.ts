import path from "path";
import { GatsbyNode } from "gatsby";
import { PageQueryResponse } from "../types";
import { getType } from "../utils";

export const createPages: GatsbyNode["createPages"] = async (gatsbyApi) => {
    const { createPage } = gatsbyApi.actions;

    const result = await gatsbyApi.graphql<PageQueryResponse>(`
    query Page {
        graph {
            nodes {
                en {
                    _id
                    _type
                    id
                    name
                    path
                }
                es {
                    _id
                    _type
                    id
                    name
                    path
                }
                pt_br {
                    _id
                    _type
                    id
                    name
                    path
                }
            }
            links {
                en {
                    object
                    predicate
                    subject
                    target {
                        _id
                        _type
                        id
                        name
                    }
                }
                es {
                    object
                    predicate
                    subject
                    target {
                        _id
                        _type
                        id
                        name
                    }
                }
                pt_br {
                    object
                    predicate
                    subject
                    target {
                        _id
                        _type
                        id
                        name
                    }
                }
            }
        }
        meta {
            en {
                endpoint
                type
                meta {
                    allowed_types
                    description
                    title
                    type
                }
            }
            es {
                endpoint
                type
                meta {
                    allowed_types
                    description
                    title
                    type
                }
            }
            pt_br {
                endpoint
                type
                meta {
                    allowed_types
                    description
                    title
                    type
                }
            }
        }
        locales {
            en {
                lang
                name
                icon
            }
            es {
                lang
                name
                icon
            }
            pt_br {
                lang
                name
                icon
            }
        }
        properties {
            en
            es
            pt_br
        }
        classes {
            en
            es
            pt_br
        }
        site {
            siteMetadata {
                description
                siteUrl
                title
            }
        }
    }`);

    const site = result.data?.site.siteMetadata;
    const locales = result.data?.locales;
    const properties = result.data?.properties;
    const classes = result.data?.classes;
    const graph = result.data?.graph;
    const meta = result.data?.meta;

    Object.entries(graph.nodes).forEach(([locale, nodes]) => {
        for (const node of nodes) {
            let type = getType(node);
            if (node.path) {
                createPage({
                    path: `/${locale}/${node.path}`,
                    component: path.resolve(`./src/templates/${type}.tsx`),
                    context: {
                        site,
                        id: node.id,
                        slug: node.path,
                        name: node.name,
                        type: node.type,
                        locale,
                        locales,
                        properties,
                        classes,
                        graph,
                        meta
                    },
                });
            }
        }
    });
};
