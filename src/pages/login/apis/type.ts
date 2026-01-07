export interface LoginRequestData {
  /** admin 或 editor */
  userName: string
  /** 密码 */
  password: string
  /** 验证码 */
  code?: string
}

export type LoginResponseData = ApiResponseData<{ token: string }>
