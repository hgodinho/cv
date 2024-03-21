import { useEffect, useState } from "react";
import { CV } from "@/components";

export function App() {
    const [state, setState] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch("../dist/data.json").then((res) =>
                res.json()
            );
            setState(data);
        };
        fetchData();
    }, []);

    return <main>{state ? <CV data={state} /> : "Loading..."}</main>;
}
