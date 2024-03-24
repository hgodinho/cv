import { PropsWithChildren } from "react";

import { layout } from "./grid.module.css";

export function Layout({ children }: PropsWithChildren<{}>) {
    return (
        <div className={layout} >
            {children}
        </div>
    )
}