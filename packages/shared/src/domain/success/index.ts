interface Response {
  statusCode: number;
  headers: unknown;
  isBase64Encoded: boolean;
  body?: string;
}

export class AppSuccess {
  private static response: Response = {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    isBase64Encoded: false,
    body: undefined,
  };

  static status(statusCode = 200) {
    this.response.statusCode = statusCode;
    return this;
  }

  static json(data: unknown = undefined) {
    this.response.body = data ? JSON.stringify(data) : undefined;
    return this.response;
  }
}
