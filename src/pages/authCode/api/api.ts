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

export interface ResponseListData<T> {
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

export interface AuthCodeLine {
  code: string
  duration: number
  id: number
  status: number
  useMemberPhone: string
  useTime: string
}

export interface authForm {
  id?: number
  count: number | undefined
  duration: number | undefined
}

export interface addForm {
  count: number | undefined
  duration: number | undefined
}

export interface authCodeLine {
  id?: string
  code: string
  duration: string
  status: string
  useMemberPhone: string
  useTime: string
}

export type authParams = Partial<authForm & addForm>
export type authCodeParams = Partial<authCodeLine>

/** 生成邀请码 */
export function generateApi(data: authForm): Promise<ResponseData> {
  return request({
    url: "/back/registerCode/generate",
    method: "post",
    data
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
export function getCurrentCodeApi(params: RequestData): Promise<ResponseListData<AuthCodeLine>> {
  return request({
    url: "/back/registerCode/list",
    method: "get",
    params
  })
}
