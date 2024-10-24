import { Heading, Skill } from "#root/components";
import { Connection, LinkObject, NodeObject } from "@hgod-in-cv/data/src/types";
import React from "react";

export type SkillSetProps = {
    title: string;
    data: Connection[];
    links: LinkObject[];
    nodes: NodeObject[];
};

export function SkillSet({ title, data, links, nodes }: SkillSetProps) {
    return (
        <>
            <Heading level={3}>{title}</Heading>
            {data.map((item) => {
                const link = links.find((link) => {
                    return link.object === item.target.id;
                });
                const rating = nodes.find((node) => {
                    if (node.type === "AggregateRating") {
                        return node.id === link?.subject;
                    }
                });

                return (
                    <Skill
                        key={item.target.id as string}
                        label={item.target.name}
                        value={rating?.ratingValue as number[]}
                        bestRating={rating?.bestRating[0] as number}
                    />
                );
            })}
        </>
    );
}
