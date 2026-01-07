export interface BasicResponse {
  code: number
  message: string
  data?: unknown
}

export interface FontForm {
  id?: number
  kanjiChar: string
  onyomi: string
  kunyomi: string
  displayMeanings: string
  fullDisplayMeanings: string
  meanings: string
}

export interface WordForm {
  id?: number
  kana: string
  kanji: string
  wallerDefinition: string
}

export type FontParams = Partial<FontForm>
export type WordParams = Partial<WordForm>
