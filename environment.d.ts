declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_APP_ENV: 'development' | 'staging' | 'production';
  }
}
