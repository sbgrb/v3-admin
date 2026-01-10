import type * as Basic from "./type.ts"
import {FontForm, SectionForm, WordForm} from "./type.ts";
import { request } from "@/http/axios.ts"
// 汉字
/** 增 */
export function createFontDataApi(data: Basic.FontForm): Promise<Basic.BasicResponse> {
  return request({
    url: "/back/kanji/add",
    method: "post",
    data
  })
}
/** 改 */
export function updateTableDataApi(data: Basic.FontForm): Promise<Basic.BasicResponse> {
  return request({
    url: "/back/kanji/update",
    method: "post",
    data
  })
}

/** 删 */
export function deleteTableDataApi(id: number): Promise<Basic.BasicResponse> {
  return request({
    url: `/back/kanji/delete/${id}`,
    method: "post"
  })
}

/** 查 */
export function getFontTableDataApi(params: Basic.BaseRequest): Promise<Basic.BasicListResponse<FontForm>> {
  return request({
    url: "/back/kanji/list",
    method: "get",
    params
  })
}

export function createWordDataApi(data: Basic.WordForm): Promise<Basic.BasicResponse> {
  return request({
    url: "/back/vocab/add",
    method: "post",
    data
  })
}
/** 改 */
export function updateWordTableDataApi(data: Basic.WordForm): Promise<Basic.BasicResponse> {
  return request({
    url: "/back/vocab/update",
    method: "post",
    data
  })
}

/** 删 */
export function deleteWordTableDataApi(id: number): Promise<Basic.BasicResponse> {
  return request({
    url: `/back/vocab/delete/${id}`,
    method: "post"
  })
}

/** 查 */
export function getWordTableDataApi(params: Basic.BaseRequest): Promise<Basic.BasicListResponse<WordForm>> {
  return request({
    url: "/back/vocab/list",
    method: "get",
    params
  })
}

export function createSectionDataApi(data: Basic.WordForm): Promise<Basic.BasicResponse> {
  return request({
    url: "/back/vocab/add",
    method: "post",
    data
  })
}
/** 改 */
export function updateSectionTableDataApi(data: Basic.WordForm): Promise<Basic.BasicResponse> {
  return request({
    url: "/back/vocab/update",
    method: "post",
    data
  })
}

/** 删 */
export function deleteSectionTableDataApi(id: number): Promise<Basic.BasicResponse> {
  return request({
    url: `/back/vocab/delete/${id}`,
    method: "post"
  })
}

/** 查 */
export function getSectionTableDataApi(params: Basic.BaseRequest): Promise<Basic.BasicListResponse<SectionForm>> {
  return request({
    url: "/back/vocab/list",
    method: "get",
    params
  })
}
