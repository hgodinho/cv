import { Config } from "vike/types";

import vikeReact from "vike-react/config";

export default {
    ssr: true,
    // https://vike.dev/meta
    meta: {
        // Define new setting 'description'
        description: {
            env: { server: true, client: true },
        },
    },
    passToClient: ["ld", "properties", "api"],
    hydrationCanBeAborted: true,
    extends: vikeReact,
} satisfies Config;
