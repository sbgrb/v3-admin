import { request } from "@/http/axios.ts"

interface RequestData {
  pageNum: number
  pageSize: number
  phone?: string
}

interface ResponseData {
  code: number
  data?: AuthCodeLine[]
  total: number
  message: string
}

export interface AuthCodeLine {
  id: number
  duration: number
  status: string
}

export interface authForm {
  id?: number
  count: number | undefined
  duration: number | undefined
}

export interface addForm {
  count: number | undefined
  duration: number | undefined
  other: number | undefined
}

export type authParams = Partial<authForm & addForm>

/** 生成邀请码 */
export function generateApi(params: authForm): Promise<ResponseData> {
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
export function getCurrentCodeApi(params: RequestData): Promise<ResponseData> {
  return request({
    url: "/back/registerCode/list",
    method: "get",
    params
  })
}
