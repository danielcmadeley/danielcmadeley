/// <reference types="astro/client" />

declare global {
  const Astro: {
    props: Record<string, any>;
    url: URL;
    params: Record<string, string | undefined>;
    request: Request;
    locals: Record<string, any>;
    cookies: any;
    redirect: (path: string, status?: number) => Response;
    response: {
      headers: Headers;
      status?: number;
      statusText?: string;
    };
    clientAddress: string;
    generator: string;
    site: URL | undefined;
    slots: Record<string, (...args: any[]) => any>;
  };
}

export {};
