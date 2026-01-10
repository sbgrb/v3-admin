export interface BasicListResponse<T> {
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

export interface BasicResponse {
  code: number
  msg: string
}

export interface BaseRequest {
  pageNum: number
  pageSize: number
}

export interface FontForm {
  id: number
  kanjiChar: string
  onyomi: string
  kunyomi: string
  displayMeanings: string
  fullDisplayMeanings: string
  meanings: string
}

export interface WordForm {
  id: number
  jmdictSeq: string
  categoryId: number
  kana: string
  kanji: string
  wallerDefinition: string
}

export interface SectionForm {
  id: number
}

export type FontParams = Partial<FontForm>
export type WordParams = Partial<WordForm>
export type SectionParams = Partial<SectionForm>
export type OptionalKey<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
