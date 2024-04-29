/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly BACK_END_URI: string;
    readonly BACK_END_ID: string;
    readonly BACK_END_TOKEN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
