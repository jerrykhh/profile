declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NOTION_API_BASE_URL: string;
      NOTION_TABLE_ME_ID: string;
    }
  }
}

export {};
