import { I18nProviderType } from "./types";
import { createContext } from "react";
import { defaultI18nContext } from "./defaultContext";

export const I18nContext = createContext<I18nProviderType>(defaultI18nContext);
