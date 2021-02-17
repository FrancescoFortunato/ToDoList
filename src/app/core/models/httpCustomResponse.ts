export class StatusResponse {
  errCode: number;
  errDetail: string;
  errMsg: string;
}

export class HttpCustomResponse {
  result: StatusResponse;
  data: any;
}
