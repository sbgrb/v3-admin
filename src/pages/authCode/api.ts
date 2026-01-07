import { request } from "@/http/axios.ts"

interface RequestData {
  pageNum: number
  pageSize: number
  phone?: string
}

interface ResponseData {
  code: number
  data?: []
  total: number
  message: string
}

/** 生成邀请码 */
export function generateApi(params: RequestData): Promise<ResponseData> {
  return request({
    url: "/back/registerCode/generate",
    method: "post",
    params
  })
}

/** 删除邀请码 */
export function deleteGenerateApi(id: number): Promise<ResponseData> {
  return request({
    url: `/back/registerCode/delete/${id}`,
    method: "delete"
  })
}

/** 分页查询邀请码 */
export function getCurrentUserApi(params: RequestData): Promise<ResponseData> {
  return request({
    url: "/back/registerCode/list",
    method: "get",
    params
  })
}
