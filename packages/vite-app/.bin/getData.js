import dotenv from "dotenv";
import { getJsonLD } from "./getJsonLD.js";
import fs from "fs";

dotenv.config();

export async function getData() {
    const baseUrl = "https://script.google.com/a/macros/hgod.in/s";
    const deployId = process.env.VITE_DEPLOY_ID;
    const token = process.env.VITE_SCRIPT_TOKEN;

    const data = await fetch(`${baseUrl}/${deployId}/exec`, {
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
                    const data = JSON.parse(await res.text());
                    return data;
                case 401:
                    throw new Error("Unauthorized");
                default:
                    throw new Error("Unknown error");
            }
        })
        .catch((err) => {
            console.error(err);
        });

    const jsonld = await getJsonLD(data, data["@context"]);

    fs.writeFileSync("dist/data.json", JSON.stringify(jsonld, null, 4));
    console.log("data.json written");
}

await getData();
