import { request } from "@/http/axios.ts"

interface ReqestData {
  pageNum: number
  pageSize: number
  phone?: string
}

interface UserInfo {
  achievement: string
  expirationTime: string
  id: number
  password: string
  phone: string
  setting: string
}

export interface ResponseData<T> {
  code: number
  msg: string
  data: {
    current: number
    pages: number
    records: T[]
    size: number
    total: number
  }
}

/** 获取当前登录用户详情 */
export function getCurrentUserApi(params: ReqestData): Promise<ResponseData<UserInfo>> {
  return request({
    url: "/back/member/list",
    method: "get",
    params
  })
}
