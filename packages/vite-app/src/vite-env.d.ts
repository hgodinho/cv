/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_DEPLOY_ID: string;
    readonly VITE_SCRIPT_TOKEN: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
