import { CV } from "@/components/CV";
import { getJsonLD } from "@/lib";

export async function getData() {
    const data = await import("@/data/henrique-godinho-cv.json");
    const jsonld = await getJsonLD(data.default, data.default['@context']);
    return jsonld;
}

export default async function Home() {
    const data = await getData();
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <CV data={data} />
        </main>
    );
}
