export interface Course {
  id: string
  title: string
  description: string
  chapters: Chapter[]
}

export interface Chapter {
  id: string
  title: string
  order: number
  tutorials: Tutorial[]
}

export interface Tutorial {
  id: string
  title: string
  content: string
  order: number
  fileName: string
  path: string
} 