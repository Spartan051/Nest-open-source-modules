export interface IExeption {
  response: IResponseExeption;
  status: number;
}

interface IResponseExeption {
  statusCode: number;
  message: string;
  error: string;
}
