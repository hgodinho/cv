import { useContext, useRef, useEffect, useCallback } from "react";
import { CVContext } from "@/provider";
import React from "react";
import * as d3 from "d3";

export type NodeProps = {
    x: number;
    y: number;
    r: number;
    color: string;
};

export type SVGProps = {
    h: number;
    w: number;
};

export type SVGViewProps = {
    w: number;
    h: number;
}

export type Node = d3.SimulationNodeDatum & {
    id: string;
    group: string;
    // [key: string]: any;
};

export type Link = d3.SimulationLinkDatum<Node> & {
    predicate: string;
    value: number;
};

export function SVGView({ w, h }: SVGViewProps) {
    const linkedData = useContext(CVContext);

    const nodes: Node[] | undefined = linkedData?.flattened && (linkedData?.flattened as unknown as Array<any>).map((node) => {
        return {
            id: node["@id"],
            group: [...node["@type"]].pop().replace("http://schema.org/", ""),
            ...node
        }
    });

    const links: Link[] = linkedData?.nquads && (linkedData?.nquads as unknown as Array<any>).reduce((acc, node) => {
        const foundSubject = nodes?.find((n) => n.id === node.subject.value);
        const foundObject = nodes?.find((n) => n.id === node.object.value);
        if (foundObject && foundSubject) { // return only relations between two classes, excluding properties
            const link = {
                source: node.subject.value,
                target: node.object.value,
                predicate: node.predicate.value,
                value: 1
            }
            acc.push(link);
        }
        return acc;
    }, []);

    const ref = useRef<HTMLCanvasElement>(null);

    const drawNetwork = useCallback((ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";


        links?.forEach((link) => {
            ctx.beginPath();
            // @ts-ignore 
            ctx.moveTo(link.source.x, link.source.y);
            // @ts-ignore 
            ctx.lineTo(link.target.x, link.target.y);
            ctx.font = "14px Inter";
            // @ts-ignore 
            ctx.fillText(link.predicate, (link.source.x + link.target.x) / 2, (link.source.y + link.target.y) / 2);
            ctx.stroke();
        });

        nodes?.forEach((node) => {
            if (!node.x || !node.y) return;
            console.log({ node })
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI);
            ctx.font = "18px Inter";
            ctx.fillText(node.id, node.x + 5, node.y + 5);
            // ctx.lineTo(node.x + 5, node.y + 5);
            ctx.fill();
        });
    }, [w, h, links, nodes]);

    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas?.getContext("2d");
        if (!ctx) return;

        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink<Node, Link>(links).id((d) => d.id))
            .force('collide', d3.forceCollide().radius(100))
            .force('charge', d3.forceManyBody().strength(10))
            .force('center', d3.forceCenter(w / 2, h / 2))
            .on('tick', () => drawNetwork(ctx));

        return () => {
            simulation.stop();
        }
    }, [ref, nodes, links, drawNetwork, w, h]);

    return (
        <div>
            <canvas ref={ref} width={w} height={h} style={{
                width: w,
                height: h,
                border: "1px solid white"
            }} />
        </div>
    );
}