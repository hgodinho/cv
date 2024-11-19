import type { GatsbyConfig } from "gatsby";
import path from "path";

import redirects from "./redirects.json";

require("dotenv").config({});

const config: GatsbyConfig = {
    pathPrefix: "/cv",
    siteMetadata: {
        siteUrl: "https://hgod.in/cv",
        locales: {
            pt_br: {
                title: "hgod.in/cv",
                description: "<i>curriculum-vitae</i> de Henrique Godinho",
            },
            en: {
                title: "hgod.in/cv",
                description: "Henrique Godinho's <i>curriculum-vitae</i>",
            },
            es: {
                title: "hgod.in/cv",
                description: "<i>curriculum-vitae</i> de Henrique Godinho",
            },
        },
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
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: "static/icon@0.5x.png",
            },
        },
        "gatsby-plugin-postcss",
        {
            resolve: "gatsby-plugin-google-gtag",
            options: {
                trackingIds: [process.env.GA_TRACKING_ID],
                gtagConfig: {
                    anonymize_ip: true,
                },
                pluginConfig: {
                    head: false,
                    respectDNT: true,
                },
            },
        },
        "gatsby-plugin-image",
        "gatsby-plugin-sitemap",
        "gatsby-plugin-mdx",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: "@hgod-in-cv/data",
            options: {
                apiBase: process.env.API_BASE,
                apiId: process.env.API_ID,
                apiToken: process.env.API_TOKEN,
                redirects,
            },
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
