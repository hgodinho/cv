import { LinkObject, NodeObject } from "react-force-graph-3d";

// https://vike.dev/pageContext#typescript
declare global {
    namespace Vike {
        interface PageContext {
            api: {
                name: string;
                base: string;
                namespace: string;
                apiVersion: string;
            };
            config: {
                /** Value for <title> defined statically by /pages/some-page/+title.js (or by `export default { title }` in /pages/some-page/+config.js) */
                title?: string;
                /** Value for <meta name="description"> defined statically */
                description?: string;
                locale?: string;
            };
            data: {
                properties: string[];
                nodes: NodeObject[];
                links: LinkObject[];
                defaultConnectedTo: LinkObject[];
                defaultSelected: NodeObject;
            };
            routeParams: {
                id: string;
                type: string;
            };
            /** https://vike.dev/render */
            abortReason?: string;
        }
    }
}

// Tell TypeScript this file isn't an ambient module
export {};
