import { request } from "@/http/axios.ts"

interface ReqestData {
  pageNum: number
  pageSize: number
  phone?: string
}

interface UserInfo {
  username: string
  roles: []
}

interface ResponseData {
  code: number
  data: UserInfo[]
  total: number
  message: string
}

/** 获取当前登录用户详情 */
export function getCurrentUserApi(params: ReqestData): Promise<ResponseData> {
  return request({
    url: "/back/member/list",
    method: "get",
    params
  })
}
