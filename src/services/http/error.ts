export interface IResponseError {
  status: number;
  type: string;
  title: string;
  detail: string;
  userMessage: string;
  timestamp: string;
}