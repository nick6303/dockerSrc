
export interface RootState {
  inProgress: boolean
}

// export interface State extends RootState {}
export interface State extends RootState {
  inProgress: boolean
  auth: AuthState
  survey: questState
}

export interface AuthState {
  user: {
    account: string
    level: string
    agent: string
    regDate: string
  }
  validation: string
  inProgress: boolean
}

/** survey interface */
type Nullable<T> = T | null
export interface QuestionState {
  id: number
  type: number
  subject: string
  isRequired: boolean
  needOther: boolean
  options: Nullable<string[]>
}

export interface SectionState {
  id: number
  title: string
  description: string
  questions: QuestionState[]
}

export interface questState {
  surveyOpen: boolean,
  sections: SectionState[]
}

export interface QuestionPost {
  id: number
  answers: Nullable<number[]>
  context: string
  showError: boolean
}

export interface SurveyPost {
  id: number
  questions: QuestionPost[]
}