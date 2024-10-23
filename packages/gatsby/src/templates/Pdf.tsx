import React, { useCallback, useMemo } from "react";
import { graphql, PageProps } from "gatsby";
import {
    Head as PrimitiveHead,
    Heading,
    Scroll,
    Slider,
    Label,
} from "#root/components";
import {
    PageContext,
    Graph,
    Person,
    Properties,
    UnionSchemaType,
} from "@hgod-in-cv/data/src/types";
import { tw } from "#root/lib";

export type PdfPage = PageProps<
    { graph: Graph; me: Person; properties: Properties },
    PageContext
>;

export default function ({ data, pageContext }: PdfPage) {
    const parseNode = useCallback((node) => {
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
                [key]: parseField(value),
            };
        }, {});
    }, []);

    const parseField = useCallback(
        (value) => {
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

    const { me, properties, classes, connections } = useMemo(() => {
        const me = data.me;
        const parsedMe = parseNode(me) as Person<UnionSchemaType[] | string[]>;

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
                            source,
                            target,
                            predicate: link.predicate,
                        },
                    ];
                }
                return acc;
            },
            {}
        );

        const properties = Object.fromEntries(
            data.properties[pageContext.locale]
        );

        const classes = Object.fromEntries(data.classes[pageContext.locale]);

        return { me: parsedMe, properties, classes, connections };
    }, [data]);

    return (
        <>
            <section
                className={tw(
                    "col-start-3",
                    "col-span-1",
                    "row-start-2",
                    "row-span-2",
                    "flex",
                    "flex-col",
                    "w-full"
                )}
            >
                <Scroll root={{ className: tw("flex", "w-full", "pr-6") }}>
                    <Heading level={1}>
                        {me.name}{" "}
                        <span
                            className={tw("text-sm")}
                        >{`(${me.birthDate})`}</span>
                    </Heading>
                    <p>{me.description}</p>
                    <aside
                        className={tw("flex", "gap-2", "my-2", "items-center")}
                    >
                        <a href="https://github.com/hgodinho">
                            <img
                                height="16"
                                width="16"
                                alt="GitHub"
                                src="https://cdn.simpleicons.org/github/black"
                            />
                        </a>
                        <a href="https://www.linkedin.com/in/hgodinho/">
                            <img
                                height="16"
                                width="16"
                                alt="Linkedin"
                                src="https://cdn.simpleicons.org/linkedin/black"
                            />
                        </a>
                        <a href="mailto:ola@hgod.in">
                            <img
                                height="16"
                                width="16"
                                alt="Gmail"
                                src="https://cdn.simpleicons.org/gmail/black"
                            />
                        </a>
                        <a href="http://lattes.cnpq.br/0325402816569874">
                            lattes
                        </a>
                    </aside>
                    <aside>
                        <Heading level={3}>{properties.knowsAbout}</Heading>
                        {connections.knowsAbout.map((thing) => {
                            const link = data.graph.links[
                                pageContext.locale
                            ].find((link) => {
                                return link.object === thing.target.id;
                            });
                            const rating = data.graph.nodes[
                                pageContext.locale
                            ].find((node) => {
                                if (node.type === "AggregateRating") {
                                    return node.id === link?.subject;
                                }
                            });
                            return (
                                <Label
                                    key={thing.target.id}
                                    className={tw(
                                        "flex",
                                        "items-center",
                                        "place-content-between",
                                        "gap-2",
                                        "mb-2"
                                    )}
                                >
                                    {thing.target.name}
                                    <Slider
                                        value={rating?.ratingValue}
                                        max={rating?.bestRating[0]}
                                        step={1}
                                        className={tw("w-4/6")}
                                    />
                                </Label>
                            );
                        })}
                        <Heading level={3}>{properties.knowsLanguage}</Heading>
                        {connections.knowsLanguage.map((language) => {
                            const link = data.graph.links[
                                pageContext.locale
                            ].find((link) => {
                                return link.object === language.target.id;
                            });
                            const rating = data.graph.nodes[
                                pageContext.locale
                            ].find((node) => {
                                if (node.type === "AggregateRating") {
                                    return node.id === link?.subject;
                                }
                            });
                            return (
                                <Label
                                    key={language.target.id}
                                    className={tw(
                                        "flex",
                                        "items-center",
                                        "place-content-between",
                                        "gap-2",
                                        "mb-2"
                                    )}
                                >
                                    {language.target.name}
                                    <Slider
                                        value={rating?.ratingValue}
                                        max={rating?.bestRating[0]}
                                        step={1}
                                        className={tw("w-4/6")}
                                    />
                                </Label>
                            );
                        })}
                    </aside>
                </Scroll>
            </section>

            <section
                className={tw(
                    "bg-slate-300",
                    "col-start-5",
                    "col-span-1",
                    "row-start-2",
                    "row-span-2",
                    "flex",
                    "w-full"
                )}
            >
                <Scroll
                    root={{ className: tw("flex", "w-full", "ml-6", "pr-6") }}
                >
                    <Heading level={2} className={tw()}>
                        {properties.hasCertification}
                    </Heading>
                    <ul>
                        {connections.hasCertification.map((certification) => {
                            const issuedBy = data.graph.nodes[
                                pageContext.locale
                            ].find((node) => {
                                return (
                                    node.id ===
                                    (
                                        certification.target
                                            .issuedBy as string[]
                                    )[0]
                                );
                            });
                            return (
                                <li
                                    key={certification.target.name}
                                    className={tw(
                                        "flex",
                                        "flex-col",
                                        "gap-1",
                                        "mb-2"
                                    )}
                                >
                                    <span className={tw("font-bold")}>
                                        {certification.target.datePublished} -{" "}
                                        {issuedBy?.name}
                                    </span>
                                    {certification.target.name}
                                </li>
                            );
                        })}
                    </ul>

                    <Heading level={2} className={tw()}>
                        {properties.affiliation}
                    </Heading>
                    <ul>
                        {connections.affiliation.map((affiliation) => {
                            const link = data.graph.links[
                                pageContext.locale
                            ].find((link) => {
                                return link.object === affiliation.target.id;
                            });
                            const affiliatedTo = data.graph.nodes[
                                pageContext.locale
                            ].find((node) => {
                                return node.id === link?.subject;
                            });
                            return (
                                <li
                                    key={affiliation.target.name}
                                    className={tw(
                                        "flex",
                                        "flex-col",
                                        "gap-1",
                                        "mb-2"
                                    )}
                                >
                                    <span className={tw("font-bold")}>
                                        {affiliation.target.startDate} -{" "}
                                        {affiliation.target.endDate} |{" "}
                                        {affiliation.target.name}
                                    </span>
                                    {affiliatedTo?.name}
                                </li>
                            );
                        })}
                    </ul>

                    <Heading level={2} className={tw()}>
                        {properties.author}
                    </Heading>
                    <ul>
                        {connections.author.map((author) => {
                            return (
                                <li
                                    key={author.source.name}
                                    className={tw(
                                        "flex",
                                        "flex-col",
                                        "gap-1",
                                        "mb-2"
                                    )}
                                >
                                    <span className={tw("font-bold")}>
                                        {author.source.datePublished &&
                                            `${author.source.datePublished} | `}{" "}
                                        {classes[author.source._type]}
                                    </span>
                                    {author.source.name}
                                </li>
                            );
                        })}
                    </ul>

                    <Heading level={2} className={tw()}>
                        {properties.contributor}
                    </Heading>
                    <ul>
                        {connections.contributor.map((author) => {
                            return (
                                <li
                                    key={author.source.name}
                                    className={tw(
                                        "flex",
                                        "flex-col",
                                        "gap-1",
                                        "mb-2"
                                    )}
                                >
                                    <span className={tw("font-bold")}>
                                        {author.source.startDate &&
                                            `${author.source.startDate} | `}{" "}
                                        {classes[author.source._type]}
                                    </span>
                                    {author.source.name}
                                </li>
                            );
                        })}
                    </ul>

                    <Heading level={2} className={tw()}>
                        {properties.attendee}
                    </Heading>
                    <ul>
                        {connections.attendee.map((event) => {
                            console.log({ event });
                            return (
                                <li
                                    key={event.source.id}
                                    className={tw(
                                        "flex",
                                        "flex-col",
                                        "gap-1",
                                        "mb-2"
                                    )}
                                >
                                    <span className={tw("font-bold")}>
                                        {event.source.startDate &&
                                            `${event.source.startDate} | `}{" "}
                                        {classes[event.source._type]}
                                    </span>
                                    {event.source.name}
                                </li>
                            );
                        })}
                    </ul>
                </Scroll>
            </section>
        </>
    );
}

export const Head = ({ pageContext, data }: PdfPage) => {
    return (
        <PrimitiveHead
            title={`${data.me.name}  @${pageContext.site.title}`}
            pageContext={pageContext}
            data={data.me}
            variant="pdf"
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
        properties {
            es
            en
            pt_br
        }
        classes {
            es
            en
            pt_br
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
