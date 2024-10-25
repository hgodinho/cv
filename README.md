# Monorepo of Henrique Godinho's Curriculum Vitae

| Package | Deploy |
| --- | --- |
| gatsby | ![GitHub deployments](https://img.shields.io/github/deployments/hgodinho/cv/github-pages?style=flat&label=github-pages) |

---

```mermaid
    flowchart LR
        packages((packages))    

        packages --> api
        packages --> data
        packages --> gatsby
        packages --> sheet
```

## [api](./packages/api/README.md)

Simple back-end service created with [apps script](https://developers.google.com/apps-script?hl=pt-br).

## [data](./packages/data/README.md)

Gatsby plugin to fetch data from Google Sheets.

## [gatsby](./packages/gatsby/README.md)

Gatsby site.

## [sheet](./packages/sheet/README.md)

Simple scripts to run `onEdit()` and `onOpen()` functions on Google Sheets data tables.
