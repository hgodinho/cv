import { CV } from "@/components/CV";
import { getJsonLD } from "@/lib";

export async function getData() {
    const baseUrl = 'https://script.google.com/a/macros/hgod.in/s';
    const deployId = process.env.DEPLOY_ID;
    const token = process.env.SCRIPT_TOKEN;
    console.log({ baseUrl, deployId, token, url: `${baseUrl}/${deployId}/exec` })
    const data = await fetch(`${baseUrl}/${deployId}/exec`, {
        headers: {
            Authorization: `Bearer ${token}`,
            method: 'GET',
        },
    }).then((res) => {
        switch (res.status) {
            case 200:
                return res.json();
            case 401:
                throw new Error('Unauthorized');
            default:
                throw new Error('Unknown error');
        }
    });

    const jsonld = await getJsonLD(data, data['@context']);
    return jsonld;
}

export default async function Home() {
    const data = await getData();
    return (
        <main className="min-h-screen">
            <CV data={data} />
        </main>
    );
}
