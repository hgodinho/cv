import type { GatsbyConfig } from "gatsby";
import path from "path";

require("dotenv").config({});

const config: GatsbyConfig = {
    pathPrefix: "/cv",
    siteMetadata: {
        title: "hgod.in/cv",
        siteUrl: "https://hgod.in/cv",
        description: "Pasta de Henrique Godinho",
    },
    // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
    // If you use VSCode you can also use the GraphQL plugin
    // Learn more at: https://gatsby.dev/graphql-typegen
    graphqlTypegen: true,
    plugins: [
        {
            resolve: "gatsby-plugin-alias-imports",
            options: {
                alias: {
                    "#root": path.resolve(__dirname, "src"),
                    "#public": path.resolve(__dirname, "public"),
                },
            },
        },
        "gatsby-plugin-postcss",
        // "gatsby-plugin-google-gtag",
        "gatsby-plugin-image",
        "gatsby-plugin-sitemap",
        // {
        //     resolve: "gatsby-plugin-manifest",
        //     options: {
        //         icon: "src/images/icon.png",
        //     },
        // },
        "gatsby-plugin-mdx",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: "@hgod-in-cv/data",
            options: {
                apiBase: process.env.API_BASE,
                apiId: process.env.API_ID,
                apiToken: process.env.API_TOKEN,
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "assets",
                path: "./src/assets/",
            },
            __key: "assets",
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "pages",
                path: "./src/pages/",
            },
            __key: "pages",
        },
    ],
};

export default config;
