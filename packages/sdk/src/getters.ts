import {
    Locale,
    FetchProps,
    Properties,
    Classes,
    LOCALES,
    NodeObject,
    LinkObject,
    Reporter,
    Base,
    Meta,
} from "@hgod-in-cv/types";
import { fetchData } from "./api.js";
import jsonld from "jsonld";
import { JsonLD } from "./types.js";

export async function retryFetch(
    callback: () => Promise<any>,
    reporter: Reporter,
    callbackName?: string,
    retries = 3
) {
    try {
        return await callback();
    } catch (error) {
        if (retries > 0) {
            reporter.warn(
                `[@hgod-in/data] Fetch failed${
                    callbackName && ` for ${callbackName} callback`
                }: ${error}, trying again, attempts left: ${retries}`
            );
            return retryFetch(callback, reporter, callbackName, retries - 1);
        }
        reporter.error(
            `[@hgod-in/data] Fetch failed${
                callbackName && ` for ${callbackName} callback`
            }: ${error}, no more retries left`
        );
        throw error;
    }
}

export async function getLocales(apiConfig: FetchProps, reporter: Reporter) {
    return retryFetch(
        async () => {
            return await fetchData<Locale[]>(
                {
                    route: "locales",
                    ...apiConfig,
                },
                () => {
                    reporter.info("[@hgod-in/data] Fetching locales");
                },
                (response) => {
                    reporter.success(
                        `[@hgod-in/data] Found ${
                            response.length
                        } locales: ${response
                            .map((l: any) => l.lang)
                            .join(", ")}`
                    );
                }
            );
        },
        reporter,
        "getLocales"
    );
}

export async function getGraph(
    locale: LOCALES,
    apiConfig: FetchProps,
    reporter: Reporter
) {
    return await retryFetch(
        async () => {
            return await fetchData<jsonld.JsonLdDocument>(
                {
                    route: `${locale}/ld-graph`,
                    ...apiConfig,
                },
                () => {
                    reporter.info(
                        `[@hgod-in/data] Fetching graph for ${locale}`
                    );
                },
                () => {
                    reporter.success(
                        `[@hgod-in/data] Graph for "${locale}" fetched with success`
                    );
                }
            );
        },
        reporter,
        "getGraph"
    );
}

export async function getProperties(
    locale: LOCALES,
    apiConfig: FetchProps,
    reporter: Reporter
) {
    return retryFetch(
        async () => {
            return await fetchData<Properties>(
                {
                    route: `${locale}/properties`,
                    ...apiConfig,
                },
                () => {
                    reporter.info(
                        `[@hgod-in/data] Fetching properties for ${locale}`
                    );
                },
                () => {
                    reporter.success(
                        `[@hgod-in/data] Properties for "${locale}" fetched with success`
                    );
                }
            );
        },
        reporter,
        "getProperties"
    );
}

export async function getClasses(
    locale: LOCALES,
    apiConfig: FetchProps,
    reporter: Reporter
) {
    return retryFetch(
        async () => {
            return await fetchData<Classes>(
                {
                    route: `${locale}/classes`,
                    ...apiConfig,
                },
                () => {
                    reporter.info(
                        `[@hgod-in/data] Fetching classes for ${locale}`
                    );
                },
                () => {
                    reporter.success(
                        `[@hgod-in/data] Classes for "${locale}" fetched with success`
                    );
                }
            );
        },
        reporter,
        "getClasses"
    );
}

export async function getMeta(
    locale: LOCALES,
    endpoint: string,
    apiConfig: FetchProps,
    reporter: Reporter
) {
    return retryFetch(
        async () => {
            return await fetchData<Meta>(
                {
                    route: `${locale}/${endpoint}/meta`,
                    ...apiConfig,
                },
                () => {
                    reporter.info(
                        `[@hgod-in/data] Fetching meta for ${endpoint} in ${locale}`
                    );
                },
                (response) => {
                    reporter.success(
                        `[@hgod-in/data] Found "${response.title}" at "${endpoint}/meta" for "${locale}"`
                    );
                }
            );
        },
        reporter,
        "getMeta"
    );
}

export async function processNodes(graph: Record<LOCALES, JsonLD>) {
    const entries = Object.entries(graph) as [LOCALES, JsonLD][];

    const results = await Promise.all(
        entries.map(async ([locale, ld]) => {
            const compacted = await ld.compacted;

            const nodes = (compacted["@graph"] as NodeObject<Base>[]).map(
                (node) => {
                    return {
                        _context: compacted["@context"],
                        "@type": node.type,
                        ...Object.fromEntries(
                            Object.entries(node).map(([key, value]) => {
                                if (
                                    [
                                        "type",
                                        "_id",
                                        "id",
                                        "@id",
                                        "path",
                                        "name",
                                    ].includes(key)
                                ) {
                                    return [key, value];
                                }
                                if (
                                    [
                                        "birthDate",
                                        "startDate",
                                        "endDate",
                                        "dateCreated",
                                        "dateModified",
                                        "datePublished",
                                        "auditDate",
                                    ].includes(key)
                                ) {
                                    // Process date fields if necessary
                                    return [
                                        key,
                                        new Date(value).toLocaleDateString(
                                            locale.replace("_", "-")
                                        ),
                                    ];
                                }
                                // Process other fields if necessary
                                return [key, value];
                            })
                        ),
                    };
                }
            );

            return [locale, nodes] as [LOCALES, typeof nodes];
        })
    );

    return results.reduce((acc, [locale, nodes]) => {
        acc[locale] = nodes;
        return acc;
    }, {} as Record<LOCALES, (typeof results)[0][1]>);
}

export async function processLinks(
    graph: Record<LOCALES, JsonLD>,
    nodes: Record<LOCALES, NodeObject[]>
) {
    return Object.entries(graph).reduce((acc, [locale, ld]) => {
        if (Array.isArray(ld.nquads)) {
            acc[locale as LOCALES] = ld.nquads.reduce((acc, link) => {
                const foundSubject = nodes[locale as LOCALES].find(
                    (n) => n["id"] === link.subject.value
                );
                const foundObject = nodes[locale as LOCALES].find(
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
                    acc.push(linkNode as LinkObject);
                }
                return acc;
            }, []);
        }
        return acc;
    }, {} as Record<LOCALES, LinkObject[]>);
}