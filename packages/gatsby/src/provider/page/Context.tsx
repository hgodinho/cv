import { PageProviderType } from "./types";
import { createContext } from "react";
import { defaultPageContext } from "./defaultContext";

export const PageContext = createContext<PageProviderType>(defaultPageContext);
