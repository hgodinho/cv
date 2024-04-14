import React from "react";
import ReactDOM from "react-dom/client";
import {
    RouterProvider,
    createBrowserRouter,
    Navigate,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/cv" replace />,
    },
    {
        path: "/cv",
        element: <App />,
        children: [
            {
                path: ":type/:id",
                element: <App />,
            },
        ],
    },
]);

import { App } from "@/App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
