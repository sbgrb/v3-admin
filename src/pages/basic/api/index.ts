import type * as Basic from "./type.ts"
import type { FontForm, SectionForm, WordForm } from "./type.ts"
import { request } from "@/http/axios.ts"
// 汉字
export function createFontDataApi(data: Basic.FontForm): Promise<Basic.BasicResponse> {
  return request({
    url: "/back/kanji/add",
    method: "post",
    data
  })
}
export function updateTableDataApi(data: Basic.FontForm): Promise<Basic.BasicResponse> {
  return request({
    url: "/back/kanji/update",
    method: "post",
    data
  })
}

export function deleteTableDataApi(id: number): Promise<Basic.BasicResponse> {
  return request({
    url: `/back/kanji/delete/${id}`,
    method: "post"
  })
}

export function getFontTableDataApi(params: Basic.BaseRequest): Promise<Basic.BasicListResponse<FontForm>> {
  return request({
    url: "/back/kanji/list",
    method: "get",
    params
  })
}
//  词语
export function createWordDataApi(data: Basic.WordForm): Promise<Basic.BasicResponse> {
  return request({
    url: "/back/vocab/add",
    method: "post",
    data
  })
}
export function updateWordTableDataApi(data: Basic.WordForm): Promise<Basic.BasicResponse> {
  return request({
    url: "/back/vocab/update",
    method: "post",
    data
  })
}

export function deleteWordTableDataApi(id: number): Promise<Basic.BasicResponse> {
  return request({
    url: `/back/vocab/delete/${id}`,
    method: "post"
  })
}

export function getWordTableDataApi(params: Basic.BaseRequest): Promise<Basic.BasicListResponse<WordForm>> {
  return request({
    url: "/back/vocab/list",
    method: "get",
    params
  })
}
//  段落
export function createSectionDataApi(data: Basic.SectionForm): Promise<Basic.BasicResponse> {
  return request({
    url: "/back/article/add",
    method: "post",
    data
  })
}
export function updateSectionTableDataApi(data: Basic.SectionForm): Promise<Basic.BasicResponse> {
  return request({
    url: "/back/article/update",
    method: "post",
    data
  })
}

export function deleteSectionTableDataApi(id: number): Promise<Basic.BasicResponse> {
  return request({
    url: `/back/article/delete/${id}`,
    method: "post"
  })
}

export function getSectionTableDataApi(params: Basic.BaseRequest): Promise<Basic.BasicListResponse<SectionForm>> {
  return request({
    url: "/back/article/list",
    method: "get",
    params
  })
}

// 配置
export function getConfigTableDataApi<T>(url: string, params: Basic.BaseRequest): Promise<Basic.BasicListResponse<T>> {
  return request({
    url,
    method: "get",
    params
  })
}

export function updateConfigTableDataApi(url: string, data: Basic.configForm): Promise<Basic.BasicResponse> {
  return request({
    url,
    method: "post",
    data
  })
}

export function deleteConfigTableDataApi(url: string, id: number): Promise<Basic.BasicResponse> {
  return request({
    url: `${url}/${id}`,
    method: "post"
  })
}

export function detailConfigTableDataApi(url: string, id: number): Promise<Basic.BasicResponse> {
  return request({
    url: `${url}/${id}`,
    method: "get"
  })
}

interface Options {
  code: number
  msg: string
  data: Basic.Option[]
}

export function getOptions(url: string): Promise<Options> {
  return request({
    url,
    method: "get"
  })
}
