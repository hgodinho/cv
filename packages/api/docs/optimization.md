# Fluxo

---

> análise realizada no dia 2024-10-29

Como a requisição do apps script tem um limite de execução de 300 segundos (5 minutos), é necessário que o código seja o mais eficiente possível para que não haja problemas de execução, no gráfico abaixo é possível ver a sequência de chamadas que o código faz para que cada requisição seja processada, além desses passos, o código ainda vai executar outras funções baseadas no tipo de requisição recebida.

```mermaid

    graph TD

    %% definitions
    request(((request)))
    sheet(((Sheet)))

    API
    api_setup{{API.setup}}
    api_parsePath{{API.parsePath}}
    api_createResponse{{API.createResponse}}

    APP
    app_setupConfig{{APP.setupConfig}}
    app_setupI18n{{APP.setupI18n}}
    app_setupEndpoints{{APP.setupEndpoints}}
    app_getApiConfig{{APP.getApiConfig}}
    app_getProperties{{APP.getProperties}}
    app_getL10nConfig{{APP.getL10nConfig}}

    SHEET
    sheet_setupSpreadsheet{{SHEET.setupSpreadsheet}}
    sheet_findValuesFromSheet{{SHEET.findValuesFromSheet}}

    I18N
    i18n_setupSheets{{I18N.setupSheets}}
    i18n_getLabels{{I18N.getLabels}}
    i18n_getAliasedTranslatedEndpoint{{I18N.getAliasedTranslatedEndpoint}}

    %% ENTITY

    %% links
    request --> API

    API --> api_setup

    api_setup ==init==> APP
    APP ==init==> SHEET
    SHEET -.- sheet_setupSpreadsheet
    sheet_setupSpreadsheet ==init==> sheet

    APP --> app_setupConfig
    app_setupConfig --> app_getApiConfig
    app_getApiConfig --calls---> sheet_findValuesFromSheet
    sheet_findValuesFromSheet -.calls.-> sheet
    app_setupConfig --> app_getProperties
    app_getProperties -.calls.-> i18n_getLabels
    I18N --> i18n_setupSheets
    i18n_setupSheets ==init*==>SHEET

    APP --> app_setupEndpoints
    APP -.if locale..-> app_setupI18n
    app_setupI18n --calls----> app_getL10nConfig
    app_setupI18n ==init==> I18N

    api_setup --calls--> app_getApiConfig
    api_setup --> api_parsePath

    api_parsePath --calls-->app_getL10nConfig
    api_parsePath ==init==> I18N
    api_parsePath --calls--> i18n_getAliasedTranslatedEndpoint
    i18n_getAliasedTranslatedEndpoint --calls--> sheet_findValuesFromSheet
    api_parsePath --> api_createResponse

```

Como podemos ver no gráfico, para requisição executada pelo apps script, o código passa por várias funções, sendo que algumas delas são chamadas de forma condicional, como por exemplo a função `app_setupI18n` que só é chamada se o locale estiver presente. Além disso, o código ainda faz chamadas para a planilha para buscar os valores necessários para a execução da requisição, o que leva tempo e consome recursos, atualmente algumas requisições podem passar dos 500 segundos apresentando problemas na build do [site gatsby](../../gatsby/README.md).

Melhorias:

```mermaid

    graph TD

    %% definitions
    request(((request)))
    sheet(((Sheet)))

    API
    api_setup{{API.setup}}
    api_parsePath{{API.parsePath}}
    api_createResponse{{API.createResponse}}

    APP
    app_setupConfig{{APP.setupConfig}}
    app_setupI18n{{APP.setupI18n}}
    app_setupEndpoints{{APP.setupEndpoints}}
    app_getApiConfig{{APP.getApiConfig}}
    app_getProperties{{APP.getProperties}}
    app_getL10nConfig{{APP.getL10nConfig}}

    SHEET
    sheet_setupSpreadsheet{{SHEET.setupSpreadsheet}}
    sheet_findValuesFromSheet{{SHEET.findValuesFromSheet}}

    I18N
    i18n_setupSheets{{I18N.setupSheets}}
    i18n_getLabels{{I18N.getLabels}}
    i18n_getAliasedTranslatedEndpoint{{I18N.getAliasedTranslatedEndpoint}}

    %% ENTITY

    %% links
    request --> API

    API --> api_setup

    api_setup ==init==> APP
    APP ==init==> SHEET
    SHEET -.- sheet_setupSpreadsheet
    sheet_setupSpreadsheet ==init==> sheet

    APP --> app_setupConfig
    app_setupConfig --> app_getApiConfig
    app_getApiConfig --calls---> sheet_findValuesFromSheet
    sheet_findValuesFromSheet -.calls.-> sheet
    
    APP --> app_setupEndpoints

    APP -.if locale..-> app_setupI18n
    app_setupI18n --calls----> app_getL10nConfig
    app_setupI18n ==init==> I18N
    I18N --> i18n_setupSheets
    i18n_setupSheets ==init*==>SHEET

    api_setup --> api_parsePath
    api_parsePath --calls-->app_getL10nConfig
    api_parsePath --calls--> i18n_getAliasedTranslatedEndpoint
    i18n_getAliasedTranslatedEndpoint --calls--> sheet_findValuesFromSheet
    api_parsePath --> api_createResponse

```

---
