import { FetchProps } from "../types";

async function fetchData(
    { route, apiBase, apiId, apiToken }: FetchProps,
    pre?: () => void,
    after?: (data: any) => void
) {
    const parseData = (response: any) => {
        switch (response.status) {
            case 200:
                return response.data;
            default:
                throw new Error(response.message);
        }
    };

    try {
        if (pre) pre();
        return await fetch(`${apiBase}/${apiId}/exec/cv/v1/${route ? route : ""}`, {
            headers: {
                Authorization: `Bearer ${apiToken}`,
                "Content-Type": "text/plain; charset=utf-8",
            },
            method: "GET",
            redirect: "follow",
        })
            .then((response) => {
                switch (response.status) {
                    case 200:
                        return response.json();
                    case 403:
                        throw new Error("Unauthorized");
                    case 404:
                        throw new Error("Not found");
                    default:
                        throw new Error(response.statusText);
                }
            })
            .then((data) => {
                if (after) after(data);
                return parseData(data);
            });
    } catch (error) {
        throw error;
    }
}

export { fetchData };
