import fetch from "node-fetch";
import { JsonLDType } from "#root/types";

export async function onBeforeRender() {
    const mode = import.meta.env.MODE;
    const base = `${
        mode === "development" ? "http://localhost:3000" : "https://hgod.in"
    }`;

    const fetchData = async () => {
        try {
            return await fetch(`${base}/henrique-godinho.jsonld`).then((res) =>
                res.json()
            );
        } catch (e) {
            throw e;
        }
    };

    const data = (await fetchData()) as {
        ld: JsonLDType;
        properties: string[];
    };

    return {
        pageContext: {
            ld: data.ld,
            properties: data.properties,
            api: {
                name: "hgod.in",
                base: "https://hgod.in",
                namespace: "cv",
                version: "v1",
            },
        },
    };
}
