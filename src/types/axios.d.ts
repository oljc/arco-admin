export declare module 'axios' {
  interface HttpResponse<T = unknown> {
    status?: number;
    msg?: string;
    code?: number;
    data?: T;
  }
  interface AxiosResponse<T = any> extends HttpResponse<T> { }
}
