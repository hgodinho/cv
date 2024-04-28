/**
 * THIS IS A TEMPORARY FIX FOR SSR
 * @see https://github.com/dgreene1/react-accessible-treeview/issues/176
 *
 * should be removed once the issue is fixed
 */

import * as module from "react-accessible-treeview";
let TreeView: typeof module.default;
let flattenTree: typeof module.flattenTree;
let CLICK_ACTIONS: typeof module.CLICK_ACTIONS;

if (typeof document !== "undefined") {
    TreeView = module.default;
    flattenTree = module.flattenTree;
    CLICK_ACTIONS = module.CLICK_ACTIONS;
} else {
    // SSR
    // @ts-ignore
    TreeView = module.default.default;
    // @ts-ignore
    flattenTree = module.flattenTree.default;
    // @ts-ignore
    CLICK_ACTIONS = module.CLICK_ACTIONS.default;
}

export { flattenTree, CLICK_ACTIONS };
export default TreeView;
