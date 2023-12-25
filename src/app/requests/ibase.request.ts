export interface IBaseRequest {
  toObject(): Object;
  getUrl(api_url: string): string;
}
