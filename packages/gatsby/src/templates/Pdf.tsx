import React, { useCallback, useMemo } from "react";
import { graphql, PageProps } from "gatsby";
import {
    Head as PrimitiveHead,
    Scroll,
    ConnectionsView,
    MeView,
    PrintButton,
} from "#root/components";
import {
    PageContext,
    Graph,
    Person,
    UnionSchemaType,
} from "@hgod-in-cv/data/src/types";
import { tw } from "#root/lib";
import { useTheme } from "#root/provider";

export type PdfPage = PageProps<{ graph: Graph; me: Person }, PageContext>;

export default function ({ data, pageContext }: PdfPage) {
    const parseNode = useCallback((node: UnionSchemaType) => {
        return Object.entries(node).reduce((acc, [key, value]) => {
            if (value === null) {
                return acc;
            }
            if (Array.isArray(value)) {
                return {
                    ...acc,
                    [key]: value.map(parseField),
                };
            }
            return {
                ...acc,
                [key]: parseField(value as string),
            };
        }, {});
    }, []);

    const parseField = useCallback(
        (value: string) => {
            if (value.startsWith("http")) {
                const found = data.graph.nodes[pageContext.locale].find(
                    (node) => node.id === value
                );
                if (found) return found;
            }
            return value;
        },
        [data.graph, pageContext.locale]
    );

    const {
        state: {
            viewPort: {
                windowDimensions: { isMobile, isPrint },
            },
        },
    } = useTheme();

    const { me, connections } = useMemo(() => {
        const me = data.me;
        const parsedMe = parseNode(me) as Person;

        const connections = data.graph.links[pageContext.locale].reduce(
            (acc, link) => {
                if (
                    link.subject.includes(me.path) ||
                    link.object.includes(me.path)
                ) {
                    const source = data.graph.nodes[pageContext.locale].find(
                        (node) => node.id === link.subject
                    );
                    const target = data.graph.nodes[pageContext.locale].find(
                        (node) => node.id === link.object
                    );

                    acc[link.predicate] = [
                        ...(acc[link.predicate] || []),
                        {
                            source: source as UnionSchemaType,
                            target: target as UnionSchemaType,
                            predicate: link.predicate,
                        },
                    ];
                }
                return acc;
            },
            {} as {
                [key: string]: {
                    source: UnionSchemaType;
                    target: UnionSchemaType;
                    predicate: string;
                }[];
            }
        );

        return { me: parsedMe, pageContext, connections };
    }, [data]);

    return !isMobile || !isPrint ? (
        <>
            <PrintButton />
            <section
                className={tw(
                    "col-start-2",
                    "lg:col-start-3",
                    "md:col-start-2",
                    "col-span-1",
                    "row-start-3",
                    "flex",
                    "flex-col",
                    "w-full"
                )}
            >
                <Scroll root={{ className: tw("flex", "w-full", "pr-6") }}>
                    <MeView
                        me={me}
                        connections={connections}
                        locale={pageContext.locale}
                        links={data.graph.links[pageContext.locale]}
                        nodes={data.graph.nodes[pageContext.locale]}
                    />
                </Scroll>
            </section>

            <section
                className={tw(
                    "bg-slate-300",
                    "col-start-2",
                    "lg:col-start-5",
                    "md:col-start-4",
                    "col-span-1",
                    "row-start-3",
                    "flex",
                    "w-full"
                )}
            >
                <Scroll
                    root={{ className: tw("flex", "w-full", "ml-6", "pr-6") }}
                >
                    <ConnectionsView
                        connections={connections}
                        nodes={data.graph.nodes[pageContext.locale]}
                        links={data.graph.links[pageContext.locale]}
                        locale={pageContext.locale}
                    />
                </Scroll>
            </section>
        </>
    ) : (
        <section
            className={tw(
                "col-start-2",
                "lg:col-start-3",
                "md:col-start-2",
                "col-span-1",
                "row-start-3",
                "flex",
                "flex-col",
                "w-full"
            )}
        >
            {!isPrint ? (
                <Scroll root={{ className: tw("flex", "w-full", "pr-6") }}>
                    <MeView
                        me={me}
                        connections={connections}
                        locale={pageContext.locale}
                        links={data.graph.links[pageContext.locale]}
                        nodes={data.graph.nodes[pageContext.locale]}
                    />
                    <ConnectionsView
                        connections={connections}
                        nodes={data.graph.nodes[pageContext.locale]}
                        links={data.graph.links[pageContext.locale]}
                        locale={pageContext.locale}
                    />
                </Scroll>
            ) : (
                <>
                    <MeView
                        me={me}
                        connections={connections}
                        locale={pageContext.locale}
                        links={data.graph.links[pageContext.locale]}
                        nodes={data.graph.nodes[pageContext.locale]}
                    />
                    <ConnectionsView
                        connections={connections}
                        nodes={data.graph.nodes[pageContext.locale]}
                        links={data.graph.links[pageContext.locale]}
                        locale={pageContext.locale}
                    />
                </>
            )}
        </section>
    );
}

export const Head = ({ pageContext, data }: PdfPage) => {
    return (
        <PrimitiveHead
            title={`${data.me.name}  @${pageContext.site.title}`}
            pageContext={pageContext}
            data={data.me}
            variant={"pdf"}
        />
    );
};

export const query = graphql`
    query byLocale($locale: String) {
        me: person(_id: { eq: "#prs-1" }, locale: { eq: $locale }) {
            id
            _context
            _id
            _type
            additionalType
            affiliation
            award
            birthDate
            description
            email
            familyName
            givenName
            hasCertification
            hasOccupation
            homeLocation
            honorificPrefix
            identifier
            image
            jobTitle
            knowsAbout
            knowsLanguage
            locale
            memberOf
            name
            nationality
            path
            performerIn
            sameAs
            seeks
            subjectOf
            type
            birthPlace
            brand
            alternateName
        }
        graph {
            links {
                en {
                    object
                    predicate
                    subject
                    value
                }
                es {
                    object
                    predicate
                    subject
                    value
                }
                pt_br {
                    object
                    predicate
                    subject
                    value
                }
            }
            nodes {
                en {
                    _context
                    _id
                    _type
                    address
                    attendee
                    author
                    bestRating
                    birthDate
                    containsPlace
                    contributor
                    dateCreated
                    datePublished
                    department
                    description
                    email
                    employee
                    endDate
                    familyName
                    givenName
                    hasCertification
                    homeLocation
                    honorificPrefix
                    id
                    identifier
                    inLanguage
                    issuedBy
                    itemReviewed
                    jobTitle
                    keywords
                    knowsAbout
                    knowsLanguage
                    location
                    name
                    organizer
                    pagination
                    path
                    publication
                    publisher
                    ratingValue
                    sameAs
                    startDate
                    type
                    worstRating
                }
                es {
                    _context
                    _id
                    _type
                    address
                    attendee
                    author
                    bestRating
                    birthDate
                    containsPlace
                    contributor
                    dateCreated
                    datePublished
                    department
                    description
                    email
                    employee
                    endDate
                    familyName
                    givenName
                    hasCertification
                    homeLocation
                    honorificPrefix
                    id
                    identifier
                    inLanguage
                    issuedBy
                    itemReviewed
                    jobTitle
                    keywords
                    knowsAbout
                    knowsLanguage
                    location
                    name
                    organizer
                    pagination
                    path
                    publication
                    publisher
                    ratingValue
                    sameAs
                    startDate
                    type
                    worstRating
                }
                pt_br {
                    _context
                    _id
                    _type
                    address
                    attendee
                    author
                    bestRating
                    birthDate
                    containsPlace
                    contributor
                    dateCreated
                    datePublished
                    department
                    description
                    email
                    employee
                    endDate
                    familyName
                    givenName
                    hasCertification
                    homeLocation
                    honorificPrefix
                    id
                    identifier
                    inLanguage
                    issuedBy
                    itemReviewed
                    jobTitle
                    keywords
                    knowsAbout
                    knowsLanguage
                    location
                    name
                    organizer
                    pagination
                    path
                    publication
                    publisher
                    ratingValue
                    sameAs
                    startDate
                    type
                    worstRating
                }
            }
        }
    }
`;
