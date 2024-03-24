import { useEffect, useState } from "react";
import { CV } from "@/components";
import { tw } from "@/lib";

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

    return <main className={tw("text-gray-50")}>{state ? <CV data={state} /> : "Loading..."}</main>;
}
