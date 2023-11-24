export interface IBaseRequest {
  isValid(): boolean;
  markAsTouched(): void;
  toObject(): Object;
  getUrl(api_url: string): string;
}
