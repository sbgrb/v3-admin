import type * as Basic from "./type.ts"
import { request } from "@/http/axios.ts"
/** 增 */
export function createFontDataApi(data: Basic.FontForm): Promise<Basic.BasicResponse> {
  return request({
    url: "/back/",
    method: "post",
    data
  })
}

/** 删 */
export function deleteTableDataApi(id: number) {
  return request({
    url: `Basic/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateTableDataApi(data: Basic.FontForm) {
  return request({
    url: "Basic",
    method: "put",
    data
  })
}

/** 查 */
export function getTableDataApi(params: Basic.FontParams) {
  return request<Basic.BasicResponse>({
    url: "Basic",
    method: "get",
    params
  })
}

export function createWordDataApi(data: Basic.WordForm): Promise<Basic.BasicResponse> {
  return request({
    url: "/back/",
    method: "post",
    data
  })
}
