import { PropsWithChildren } from "react";

import styles from "./grid.module.css";

export function Layout({ children }: PropsWithChildren<{}>) {
    return <div className={styles.layout}>{children}</div>;
}
