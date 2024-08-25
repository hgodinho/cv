import { ClientOnly } from "vike-react/ClientOnly";
import { Loading } from "#root/components";

export const NetworkView = () => {
    return (
        <ClientOnly
            load={() => import("./NetworkView")}
            fallback={<Loading />}
        >
            {(ForceGraph3d) => <ForceGraph3d />}
        </ClientOnly>
    );
};
