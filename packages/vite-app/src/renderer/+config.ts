import { Config } from "vike/types";

import vikeReact from "vike-react/config";

export default {
    // https://vike.dev/clientRouting
    clientRouting: true,
    // https://vike.dev/meta
    meta: {
        // Define new setting 'title'
        title: {
            env: { server: true, client: true },
        },
        // Define new setting 'description'
        description: {
            env: { server: true, client: true },
        },
    },
    passToClient: ["ld", "properties", "api"],
    hydrationCanBeAborted: true,
    extends: vikeReact,
} satisfies Config;
