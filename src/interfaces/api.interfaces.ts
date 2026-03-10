export interface IApiUser {
  email: string
  first_name?: string
  last_name?: string
}

export interface ITokensResponse {
  access_token: string
  refresh_token: string
}

export interface IApiAuthUser extends IApiUser, ITokensResponse {}

export interface IUpsertMicrosoftUser {
  email: string
  first_name?: string
  last_name?: string
  request_id: string
  access_token: string
}
