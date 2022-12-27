export interface ApiServiceParams {
  baseUrl: string;
}

export interface AuthParams {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}
