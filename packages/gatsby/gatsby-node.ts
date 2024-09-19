import { GatsbyNode } from "gatsby";

export const createPages: GatsbyNode["createPages"] = async ({ actions, graphql }) => {
    const { createRedirect } = actions;

    /**
     * @see https://github.com/gatsbyjs/gatsby/issues/26218#issuecomment-1506663868
     */
    createRedirect({
        fromPath: "/",
        toPath: "pt_br/pessoa/henrique-godinho/",
        isPermanent: true,
        redirectInBrowser: true,
    });
}