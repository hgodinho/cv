import { useEffect, useState } from "react";
import { CV } from "@/components";

export function App() {
    const [state, setState] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch("/henrique-godinho.jsonld").then(
                    (res) => res.json()
                );
                setState(data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    return state ? <CV data={state} /> : <div>Loading...</div>;
}
