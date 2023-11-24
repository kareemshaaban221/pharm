import { Response } from "./response";

export class ErrorResponse extends Response {
  constructor(
    public errors: string[],
    message: string,
    status: number) {
    super(status, message);
  }
}
