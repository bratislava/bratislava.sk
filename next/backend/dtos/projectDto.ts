export interface IProject {
  id: number
  name: string
  amount: number
  place: string
  phase: string
  dateMonth: string
  dateYear: number
  thumbnail: string
  votesCount: number
}

export interface IProjectsQueryData {
  projects: IProject[]
  paginationInfo: {
    total: number
    currentPage: string
    pageSize: string
  }
}

export interface IProjectDetail {
  id: number
  name: string
  amount: number
  place: string
  phase: string
  dateMonth: string
  dateYear: number
  thumbnail: string
  votesCount: number
  description?: string
  category?: string
  voted?: boolean
}
