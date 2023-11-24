import { Response } from "./response";

export class SuccessResponse extends Response {
  constructor(
    public data: any,
    message: string,
    status: number) {
    super(status, message);
  }
}
