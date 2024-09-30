async function fetchData(route?: string, pre?: () => void, after?: (data: any) => void) {
    const base = process.env.API_BASE;
    const id = process.env.API_ID;
    const token = process.env.API_TOKEN;

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
        return await fetch(`${base}/${id}/exec/cv/v1/${route ? route : ""}`, {
            headers: {
                Authorization: `Bearer ${token}`,
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
