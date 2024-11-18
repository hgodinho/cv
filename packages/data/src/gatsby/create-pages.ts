import path from "path";
import { GatsbyNode } from "gatsby";
import fs from "fs";
import { PageQueryResponse } from "../types";
import { getType } from "../utils";

export const createPages: GatsbyNode["createPages"] = async (
    gatsbyApi,
    pluginOptions
) => {
    const { reporter, actions } = gatsbyApi;
    const { createPage } = actions;

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

    createPage({
        path: `/`,
        component: path.resolve(`./src/templates/Home.tsx`),
        context: {
            site,
            locales,
            properties,
            classes,
            graph,
            meta,
        },
    });

    Object.keys(locales).forEach((locale) => {
        const context = {
            site,
            locale: locale,
            locales,
            properties,
            classes,
            graph,
        };
        createPage({
            path: `/${locale}`,
            component: path.resolve(`./src/templates/Home.tsx`),
            context,
        });
        createPage({
            path: `/${locale}/text`,
            component: path.resolve(`./src/templates/Text.tsx`),
            context,
        });
    });

    Object.entries(graph.nodes).forEach(([locale, nodes]) => {
        for (const node of nodes) {
            let type = getType(node);
            if (node.path) {
                createPage({
                    path: `/${locale}/${node.path}`,
                    component: path.resolve(
                        `./src/templates/nodes/${type}.tsx`
                    ),
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
                        meta,
                    },
                });
            }
        }
    });

    if (pluginOptions?.redirects) {
        (
            pluginOptions.redirects as { fromPath: string; toPath: string }[]
        ).forEach((redirect) => {
            // createRedirect(redirect);
            const indexPath = path.join(
                path.resolve(),
                "public",
                redirect.fromPath,
                "index.html"
            );

            if (!fs.existsSync(indexPath.replace("index.html", ""))) {
                fs.mkdirSync(indexPath.replace("index.html", ""), {
                    recursive: true,
                });
            }

            fs.writeFileSync(indexPath, redirectHtml({ to: redirect.toPath }));
            reporter.info(
                `[@hgod-in/data] Created redirect from ${redirect.fromPath} to ${redirect.toPath} file: ${indexPath}`
            );
        });
    }
};

export function redirectHtml({ to }: { to: string }) {
    return `<!DOCTYPE html>
<meta charset="utf-8">
<title>${to}</title>
<meta http-equiv="refresh" content="0; URL=${to}">
<link rel="canonical" href="${to}">`;
}
