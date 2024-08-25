import dotenv from "dotenv";
import { getJsonLD } from "./getJsonLD.js";
import fs from "fs";
import fetch from "node-fetch";

dotenv.config({ path: [".env.local", ".env"] });

export async function getData() {
    const baseUrl = process.env.BACK_END_URI;
    const deployId = process.env.BACK_END_ID;
    const token = process.env.BACK_END_TOKEN;

    const fetchData = async (endpoint) =>
        await fetch(`${baseUrl}/${deployId}/exec/cv/v1/${endpoint}`, {
            redirect: "follow",
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "text/plain; charset=UTF-8",
            },
        })
            .then(async (res) => {
                switch (res.status) {
                    case 200:
                        try {
                            const response = JSON.parse(await res.text());
                            return response;
                        } catch (error) {
                            console.group();
                            console.error(error);
                            console.error(await res.text());
                            console.groupEnd();
                            throw new Error(error);
                        }
                    case 401:
                        throw new Error("Unauthorized");
                    default:
                        throw new Error("Unknown error");
                }
            })
            .catch((err) => {
                throw new Error(err);
            });

    try {
        const graph = await fetchData("ld-graph");

        const properties = await fetchData("properties");

        console.log({ graph: graph.data, properties });

        const json = {
            properties: properties.data,
            ld: await getJsonLD(graph.data, graph.data["@context"]),
        };

        fs.writeFileSync(
            "public/henrique-godinho.jsonld",
            JSON.stringify(json, null, 4)
        );

        console.warn("public/henrique-godinho.jsonld written");
    } catch (error) {
        console.error(error);
    }
}

await getData();
