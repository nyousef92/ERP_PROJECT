export interface ApiResponse<T> {
  data: T;
  success: boolean;
  responseCode: number;
  id: string;
  loginUser: string;
  detailMessage: string | null;
  messages: string;
  hasMessage: boolean;
  status: number;
}