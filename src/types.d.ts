declare module '@vercel/node' {
  export interface VercelRequest {
    method?: string;
    body?: any;
    headers: Record<string, string | string[] | undefined>;
    query: Record<string, string | string[] | undefined>;
  }

  export interface VercelResponse {
    status(code: number): VercelResponse;
    json(payload: any): void;
    setHeader(name: string, value: string | string[]): void;
    send(body: any): void;
  }
}

declare module 'exceljs' {
  const ExcelJS: any;
  export = ExcelJS;
}
