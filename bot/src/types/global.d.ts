declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;

    NODE_ENV: "development" | "production";
    PWD: string;

    PORT?: number;
    BOT_TOKEN?: string;
    BOT_SECRET_PATH?: string;
    SUPPORT?: string;
  }
}
