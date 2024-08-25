import { GatsbyNode, NodeInput } from "gatsby";

import { CACHE_KEYS, NODE_TYPES } from "./constants";
import { NodeObject } from "react-force-graph-3d";
import { Base, NodeBuilderArgs } from "./types";

import { promises as fs } from "fs";
import path from "path";
import { getType } from "./utils";

const readData = async () => {
    try {
        const data = await fs.readFile(
            path.resolve("static/henrique-godinho.jsonld"),
            "utf8"
        );

        return JSON.parse(data);
    } catch (err) {
        console.error(err);
    }
};

let isFirstSource = true;

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
    const sourcingTimer = reporter.activityTimer(`Sourcing from plugin API`);
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
    const lastFetchedDate: number = await cache.get(CACHE_KEYS.Timestamp);
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
    reporter.verbose(`[plugin] Last fetched date: ${lastFetchedDate}`);

    const data = await readData();

    const nodes = (data.ld.compacted["@graph"] as NodeObject<Base>[]).map(
        (node) => {
            // const prepared = Object.fromEntries(
            //     Object.entries(node).map(([key, value]) => {
            //         if (typeof value === "string") {
            //             return [key, [value]];
            //         }
            //         return [key, value];
            //     })
            // );
            return {
                "@context": data.ld.compacted["@context"],
                "@type": node.type,
                ...node,
            };
        }
    );

    const links = (data.ld.nquads as unknown as Array<any>).reduce(
        (acc, link) => {
            const foundSubject = nodes.find((n) => n.id === link.subject.value);
            const foundObject = nodes.find((n) => n.id === link.object.value);
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
        },
        []
    );

    const properties = data.properties;

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
    sourcingTimer.setStatus(
        `Processing ${nodes.length} nodes and ${links.length} links`
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

    nodeBuilder({
        gatsbyApi,
        id: "Properties",
        input: {
            type: NODE_TYPES.Properties,
            data: { list: properties },
        },
    });

    for (const node of nodes) {
        let type = getType(node);
        if (type !== NODE_TYPES.Graph && type !== NODE_TYPES.Properties) {
            nodeBuilder({
                gatsbyApi,
                id: node._id,
                input: {
                    type,
                    data: node,
                },
            });
        }
    }

    sourcingTimer.end();
};
