const dotenv = require("dotenv");
const { getJsonLD } = require("./getJsonLD.js");
const fs = require("fs");

dotenv.config({ path: [".env.local", ".env"] });

function hashString(length) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

async function getData() {
    const nodeFetch = await import("node-fetch");
    const fetch = nodeFetch.default;

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

        const json = {
            properties: properties.data,
            ld: await getJsonLD(graph.data, graph.data["@context"]),
        };

        const hash = hashString(6);

        fs.writeFileSync(
            `static/henrique-godinho-${hash}.jsonld`,
            JSON.stringify(json, null, 4)
        );

        console.warn(`static/henrique-godinho-${hash}.jsonld written`);
    } catch (error) {
        console.error(error);
    }
}

getData().then(() => process.exit(0));
