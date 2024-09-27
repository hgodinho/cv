import { GatsbyNode, NodeInput } from "gatsby";

import { LinkObject, NodeObject } from "react-force-graph-3d";
import { CACHE_KEYS, NODE_TYPES } from "../constants";
import {
    Base,
    JsonLD,
    Locale,
    Locales,
    LOCALES,
    NodeBuilderArgs,
    NodeType,
} from "../types";

import jsonld from "jsonld";
import { fetchData, getJsonLD } from "../api";
import { getType } from "../utils";

let isFirstSource = true;

export const sourceNodes: GatsbyNode[`sourceNodes`] = async (
    gatsbyApi
    // pluginOptions: PluginOptions
) => {
    const { actions, reporter, cache, getNodes } = gatsbyApi;
    const { touchNode } = actions;

    /**
     * It's good practice to give your users some feedback on progress and status. Instead of printing individual lines, use the activityTimer API.
     * This will give your users a nice progress bar and can you give updates with the .setStatus API.
     * In the end your users will also have the exact time it took to source the data.
     * @see https://www.gatsbyjs.com/docs/reference/config-files/node-api-helpers/#reporter
     */
    const sourcingTimer = reporter.activityTimer(
        `[@hgod-in/data] Sourcing from API`
    );
    sourcingTimer.start();

    if (isFirstSource) {
        /**
         * getNodes() returns all nodes in Gatsby's data layer
         */
        getNodes().forEach((node) => {
            /**
             * "owner" is the name of your plugin, the "name" you defined in the package.json
             */
            if (node.internal.owner !== `plugin`) {
                return;
            }

            /**
             * Gatsby aggressively garbage collects nodes between runs. This means that nodes that were created in the previous run but are not created in the current run will be deleted. You can tell Gatsby to keep old, but still valid nodes around, by "touching" them.
             * For this you need to use the touchNode API.
             *
             * However, Gatsby only checks if a node has been touched on the first sourcing. This is what the "isFirstSource" variable is for.
             * @see https://www.gatsbyjs.com/docs/reference/config-files/actions/#touchNode
             */
            touchNode(node);
        });

        isFirstSource = false;
    }

    /**
     * If your API supports delta updates via e.g. a timestamp or token, you can store that information via the cache API.
     *
     * The cache API is a key-value store that persists between runs.
     * You should also use it to persist results of time/memory/cpu intensive tasks.
     * @see https://www.gatsbyjs.com/docs/reference/config-files/node-api-helpers/#cache
     */
    // const lastFetchedDate: number = await cache.get(CACHE_KEYS.Timestamp);
    const lastFetchedDateCurrent = Date.now();

    /**
     * The reporter API has a couple of methods:
     * - info: Print a message to the console
     * - warn: Print a warning message to the console
     * - error: Print an error message to the console
     * - panic: Print an error message to the console and exit the process
     * - panicOnBuild: Print an error message to the console and exit the process (only during "gatsby build")
     * - verbose: Print a message to the console that is only visible when the "verbose" flag is enabled (e.g. gatsby build --verbose)
     * @see https://www.gatsbyjs.com/docs/reference/config-files/node-api-helpers/#reporter
     *
     * Try to keep the terminal information concise and informative. You can use the "verbose" method to print more detailed information.
     * You don't need to print out every bit of detail your plugin is doing as otherwise it'll flood the user's terminal.
     */
    try {
        const locales = (await fetchData(
            "locales",
            () => {
                reporter.info("[@hgod-in/data] Fetching locales");
            },
            (response) => {
                reporter.success(
                    `[@hgod-in/data] Found ${response.data.length
                    } locales: ${response.data
                        .map((l: any) => l.lang)
                        .join(", ")}`
                );
            }
        )) as Locale[];

        const graph = Object.fromEntries(
            await Promise.all(
                locales.map(async (locale) => {
                    const data = (await fetchData(
                        `${locale.lang}/ld-graph`,
                        () => {
                            reporter.info(
                                `[@hgod-in/data] Fetching graph for "${locale.name}"`
                            );
                        },
                        () => {
                            reporter.success(
                                `[@hgod-in/data] Graph for "${locale.name}" fetched with success`
                            );
                        }
                    )) as jsonld.JsonLdDocument;
                    const ld = await getJsonLD(data);
                    return [locale.lang, ld];
                })
            )
        ) as Record<LOCALES, JsonLD>;

        const properties = Object.fromEntries(
            await Promise.all(
                locales.map(async (locale) => {
                    return [
                        locale.lang,
                        await fetchData(
                            `${locale.lang}/properties`,
                            () => {
                                reporter.info(
                                    `[@hgod-in/data] Fetching properties for "${locale.name}"`
                                );
                            },
                            (response) => {
                                reporter.success(
                                    `[@hgod-in/data] Found ${response.data.length} properties for "${locale.name}"`
                                );
                            }
                        ),
                    ];
                })
            )
        ) as Record<LOCALES, string[]>;

        const classes = Object.fromEntries(
            await Promise.all(
                locales.map(async (locale) => {
                    return [
                        locale.lang,
                        await fetchData(
                            `${locale.lang}/classes`,
                            () => {
                                reporter.info(
                                    `[@hgod-in/data] Fetching classes for "${locale.name}"`
                                );
                            },
                            (response) => {
                                reporter.success(
                                    `[@hgod-in/data] Found ${response.data.length} classes for "${locale.name}"`
                                );
                            }
                        ),
                    ];
                })
            )
        ) as Record<LOCALES, string[]>;

        const nodes = Object.entries(graph).reduce((acc, [locale, ld]) => {
            acc[locale] = (ld.compacted["@graph"] as NodeObject<Base>[]).map(
                (node) => {
                    const formatted = {
                        _context: ld.compacted["@context"],
                        "@type": node.type,
                        ...Object.fromEntries(
                            Object.entries(node).map(([key, value]) => {
                                if (
                                    [
                                        "type",
                                        "_id",
                                        "id",
                                        "path",
                                        "name",
                                    ].includes(key)
                                ) {
                                    return [key, value];
                                }
                                return [
                                    key,
                                    Array.isArray(value)
                                        ? value
                                        : [value.toString()],
                                ];
                            })
                        ),
                    };
                    return formatted;
                }
            );
            return acc;
        }, {} as Record<LOCALES, NodeObject[]>);

        const links = Object.entries(graph).reduce((acc, [locale, ld]) => {
            if (Array.isArray(ld.nquads)) {
                acc[locale] = ld.nquads.reduce((acc, link) => {
                    const foundSubject = nodes[locale].find(
                        (n) => n["id"] === link.subject.value
                    );
                    const foundObject = nodes[locale].find(
                        (n) => n["id"] === link.object.value
                    );

                    if (foundObject && foundSubject) {
                        const linkNode = {
                            subject: link.subject.value,
                            object: link.object.value,
                            predicate: link.predicate.value.replace(
                                "http://schema.org/",
                                ""
                            ),
                            value: 10,
                            source: foundSubject,
                            target: foundObject,
                        };
                        acc.push(linkNode);
                    }

                    return acc;
                }, []);
            }
            return acc;
        }, {} as Record<LOCALES, LinkObject[]>);

        /**
         * Gatsby's cache API uses LMDB to store data inside the .cache/caches folder.
         *
         * As mentioned above, cache the timestamp of last sourcing.
         * The cache API accepts "simple" data structures like strings, integers, arrays.
         * For example, passing a Set or Map won't work because the "structuredClone" option is purposefully not enabled:
         * https://github.com/kriszyp/lmdb-js#serialization-options
         */
        await cache.set(CACHE_KEYS.Timestamp, lastFetchedDateCurrent);

        /**
         * Up until now the terminal output only showed "Sourcing from plugin API" and a timer. Via the "setStatus" method you can add more information to the output.
         * It'll then print "Sourcing from plugin API - Processing X posts and X authors"
         */
        sourcingTimer.setStatus(`Processing ${locales.length} locales`);

        /**
         * Create nodes
         */
        nodeBuilder({
            gatsbyApi,
            id: "Locales",
            input: {
                type: NODE_TYPES.Locales,
                data: locales.reduce((acc, locale) => {
                    acc[locale.lang] = locale;
                    return acc;
                }, {} as Locales),
            },
        });

        sourcingTimer.setStatus(
            `Processing ${nodes.en.length} nodes and ${links.en.length} links for ${locales.length} locales`
        );
        /**
         * Create nodes
         */
        nodeBuilder({
            gatsbyApi,
            id: "Graph",
            input: {
                type: NODE_TYPES.Graph,
                data: {
                    nodes,
                    links,
                },
            },
        });

        sourcingTimer.setStatus(
            `Processing ${properties.en.length} properties`
        );
        nodeBuilder({
            gatsbyApi,
            id: "Properties",
            input: {
                type: NODE_TYPES.Properties,
                data: properties,
            },
        });

        sourcingTimer.setStatus(`Processing ${classes.en.length} classes`);
        nodeBuilder({
            gatsbyApi,
            id: "Classes",
            input: {
                type: NODE_TYPES.Classes,
                data: classes,
            },
        });

        Object.entries(nodes).forEach(([locale, nodes]) => {
            for (const node of nodes) {
                let type = getType(node);
                nodeBuilder({
                    gatsbyApi,
                    id: `${locale}/${node["path"]}`,
                    input: {
                        type: type as NodeType,
                        data: { locale, ...node },
                    },
                });
            }
        });

        sourcingTimer.end();
    } catch (error) {
        throw new Error(`Error sourcing data: ${error}`);
    }
};

export function nodeBuilder({ gatsbyApi, input, ...args }: NodeBuilderArgs) {
    const id = gatsbyApi.createNodeId(`${input.type}-${args.id}`);

    const node = {
        ...input.data,
        id,
        parent: null,
        children: [],
        internal: {
            type: input.type,
            contentDigest: gatsbyApi.createContentDigest(input.data),
        },
    } satisfies NodeInput;

    gatsbyApi.actions.createNode(node);
}
