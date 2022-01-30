import { baseTestResultType } from '../libs/psychology/build/main/types/types'

export type anyType = any

export interface IModalProps {
    isModalShown: boolean
    closeModal: () => void
    t?: anyType
}

export type AnswerType = {
    id: string
    value: string | number
}

export interface QuestionsProps {
    changeBlock: (blockToShow: string, currentBlock?: string) => void | null
    questionsSubmit: (answers: baseTestResultType | number[]) => unknown
    t?: anyType
}

export interface IQuestion {
    title: string
    values: string[]
}

export interface ISignUpData {
    email: string
    password: string
    firstName: string
    lastName: string
    city: {
        id: number
        name: string
    }
}

export interface IGetTestsResponse {
    id: number
    userId: string
    value: string
    type: number
}
