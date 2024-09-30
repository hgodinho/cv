import { PageContext } from "@hgod-in-cv/data/src/types";
import { WrapPageElementBrowserArgs } from "gatsby";
import type { NavigateFn } from "@reach/router";

export type PageActions = {
    navigating: boolean;
    setNavigating: (navigating: boolean) => void;
    navigate: NavigateFn;
};

export type PageProviderType = WrapPageElementBrowserArgs<
    Record<string, unknown>,
    PageContext
>["props"];
