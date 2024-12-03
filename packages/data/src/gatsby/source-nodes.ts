import { GatsbyNode, NodeInput, PluginOptions } from "gatsby";

import { LinkObject, NodeObject } from "react-force-graph-3d";
import { CACHE_KEYS, NODE_TYPES } from "../constants";
import {
    JsonLD,
    Locale,
    Locales,
    LOCALES,
    NodeBuilderArgs,
    NodeType,
} from "../types";

import {
    getClasses,
    getGraph,
    getJsonLD,
    getLocales,
    getMeta,
    getProperties,
    processLinks,
    processNodes,
} from "../api";
import { getType } from "../utils";

let isFirstSource = true;

export type Data = {
    locales: Promise<Locale[]>;
    graph: Record<LOCALES, JsonLD>;
    properties: Record<LOCALES, string[]>;
    classes: Record<LOCALES, string[]>;
    nodes: Record<LOCALES, NodeObject[]>;
    links: Record<LOCALES, LinkObject[]>;
    endpoints: Record<LOCALES, [string, string][]>;
    meta: Record<LOCALES, { endpoint: string; type: string; meta: any }[]>;
};

export const sourceNodes: GatsbyNode[`sourceNodes`] = async (
    gatsbyApi,
    pluginOptions: PluginOptions
) => {
    const { actions, reporter, cache, getNodes } = gatsbyApi;
    const { touchNode } = actions;

    const api = {
        apiBase: pluginOptions.apiBase as string,
        apiId: pluginOptions.apiId as string,
        apiToken: pluginOptions.apiToken as string,
    };

    /**
     * It's good practice to give your users some feedback on progress and status. Instead of printing individual lines, use the activityTimer API.
     * This will give your users a nice progress bar and can you give updates with the .setStatus API.
     * In the end your users will also have the exact time it took to source the data.
     * @see https://www.gatsbyjs.com/docs/reference/config-files/node-api-helpers/#reporter
     */
    const sourcingTimer = reporter.activityTimer(
        `[@hgod-in-cv/data] Sourcing from API`
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
        const data = {
            endpoints: {
                en: [
                    ["Person", "person"],
                    ["Place", "place"],
                    ["Intangible", "intangible"],
                    ["Credential", "credential"],
                    ["CreativeWork", "creative-work"],
                    ["Event", "event"],
                    ["Organization", "organization"],
                ],
                pt_br: [
                    ["Person", "pessoa"],
                    ["Place", "lugar"],
                    ["Intangible", "intangivel"],
                    ["Credential", "credencial"],
                    ["CreativeWork", "trabalho-criativo"],
                    ["Event", "evento"],
                    ["Organization", "organizacao"],
                ],
                es: [
                    ["Person", "persona"],
                    ["Place", "lugar"],
                    ["Intangible", "intangible"],
                    ["Credential", "credencial"],
                    ["CreativeWork", "trabajo-creativo"],
                    ["Event", "evento"],
                    ["Organization", "organizacion"],
                ],
            },
        } as Data;

        try {
            const locales = getLocales(api, reporter);
            data.locales = locales;
        } catch (error) {
            throw new Error(`Error fetching locales: ${error}`);
        }

        const locales = await data.locales;

        try {
            const graph = Object.fromEntries(
                await Promise.all(
                    locales.map(async (locale) => {
                        const data = await getGraph(locale.lang, api, reporter);
                        if (typeof data === "string") {
                            throw new Error(data);
                        }
                        const ld = await getJsonLD(data);
                        return [locale.lang, ld];
                    })
                )
            ) as Record<LOCALES, JsonLD>;
            data.graph = graph;
        } catch (error) {
            throw new Error(`Error fetching graph: ${error}`);
        }

        try {
            const properties = Object.fromEntries(
                await Promise.all(
                    locales.map(async (locale) => {
                        return [
                            locale.lang,
                            await getProperties(locale.lang, api, reporter),
                        ];
                    })
                )
            ) as Record<LOCALES, string[]>;
            data.properties = properties;
        } catch (error) {
            throw new Error(`Error fetching properties: ${error}`);
        }

        try {
            const classes = Object.fromEntries(
                await Promise.all(
                    locales.map(async (locale) => {
                        return [
                            locale.lang,
                            await getClasses(locale.lang, api, reporter),
                        ];
                    })
                )
            ) as Record<LOCALES, string[]>;
            data.classes = classes;
        } catch (error) {
            throw new Error(`Error fetching classes: ${error}`);
        }

        try {
            const nodes = await processNodes(data.graph);
            data.nodes = nodes;
        } catch (error) {
            throw new Error(`Error creating nodes: ${error}`);
        }

        try {
            const links = await processLinks(data.graph, data.nodes);
            data.links = links;
        } catch (error) {
            throw new Error(`Error creating links: ${error}`);
        }

        try {
            const meta = {} as Record<
                LOCALES,
                { endpoint: string; type: string; meta: any }[]
            >;
            for (const [locale, localeEndpoints] of Object.entries(
                data.endpoints
            )) {
                meta[locale] = await Promise.all(
                    localeEndpoints.map(async ([type, endpoint]) => {
                        const response = await getMeta(
                            locale as LOCALES,
                            endpoint,
                            api,
                            reporter
                        );
                        return { endpoint, type, meta: response };
                    })
                );
            }
            data.meta = meta;
        } catch (error) {
            throw new Error(`Error fetching meta: ${error}`);
        }

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
         * Create Locales nodes
         */
        try {
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
        } catch (error) {
            throw new Error(`Error creating Locales nodes: ${error}`);
        }

        // sourcingTimer.setStatus(
        //     `Processing ${nodes.en.length} nodes and ${links.en.length} links for ${locales.length} locales`
        // );

        /**
         * Create Meta nodes
         */
        try {
            nodeBuilder({
                gatsbyApi,
                id: "Meta",
                input: {
                    type: NODE_TYPES.Meta,
                    data: data.meta,
                },
            });
        } catch (error) {
            throw new Error(`Error creating Meta nodes: ${error}`);
        }

        /**
         * Create nodes
         */
        try {
            nodeBuilder({
                gatsbyApi,
                id: "Graph",
                input: {
                    type: NODE_TYPES.Graph,
                    data: {
                        nodes: data.nodes,
                        links: data.links,
                    },
                },
            });
        } catch (error) {
            throw new Error(`Error creating Graph nodes: ${error}`);
        }

        sourcingTimer.setStatus(
            `Processing ${data.properties.en.length} properties`
        );

        try {
            nodeBuilder({
                gatsbyApi,
                id: "Properties",
                input: {
                    type: NODE_TYPES.Properties,
                    data: data.properties,
                },
            });
        } catch (error) {
            throw new Error(`Error creating Properties nodes: ${error}`);
        }

        sourcingTimer.setStatus(`Processing ${data.classes.en.length} classes`);

        try {
            nodeBuilder({
                gatsbyApi,
                id: "Classes",
                input: {
                    type: NODE_TYPES.Classes,
                    data: data.classes,
                },
            });
        } catch (error) {
            throw new Error(`Error creating Classes nodes: ${error}`);
        }

        try {
            Object.entries(data.nodes).forEach(([locale, nodes]) => {
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
        } catch (error) {
            throw new Error(`Error creating nodes: ${error}`);
        }

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
