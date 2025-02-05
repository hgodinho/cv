import * as React from "react";
import { Link, HeadFC, PageProps } from "gatsby";
import { tw } from "#root/lib";

const NotFoundPage: React.FC<PageProps> = () => {
    return (
        <main className={tw("col-start-2", "row-start-3")}>
            <h1>Page not found</h1>
            <p>
                Sorry 😔, we couldn’t find what you were looking for.
                <br />
                {process.env.NODE_ENV === "development" ? (
                    <>
                        <br />
                        Try creating a page in <code>src/pages/</code>.
                        <br />
                    </>
                ) : null}
                <br />
                <Link to="/">Go home</Link>.
            </p>
        </main>
    );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
