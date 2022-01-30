import axios from 'axios'
import { baseTestResultType, IUserResult } from '../libs/psychology/build/main/types/types'
import { UserResult } from '../libs/psychology'
import { CONTENT_API } from '../constants/constants'
import { AnswerType } from '../typings/types'

export const stringToBoolean = string => {
    switch (string.toLowerCase().trim()) {
        case 'true':
        case 'yes':
        case '1':
            return true
        case 'false':
        case 'no':
        case '0':
        case null:
            return false
        default:
            return Boolean(string)
    }
}

export const isBrowser: boolean = typeof window !== 'undefined'

export const parseQueryString = queryString => {
    const params = {}
    let temp
    let i
    let l

    // Split into key/value pairs
    const queries = queryString
        .replace(/%20/g, ' ')
        .replace('  ', ' ')
        .split('&')

    // Convert the array of strings into an object
    // eslint-disable-next-line no-plusplus
    for (i = 0, l = queries.length; i < l; i++) {
        temp = queries[i].split('=')
        // eslint-disable-next-line prefer-destructuring
        params[temp[0]] = temp[1]
    }

    return params
}

export const getChartLabels = (result: (string | number)[][]): string[] => {
    return result.map(item => item[0].toString())
}

export const getRealData = (result: (string | number)[][]): number[] => {
    return result.map(item => +item[1])
}

export const getDesiredData = (result: (string | number)[][]): number[] | boolean => {
    if (result[0][2]) {
        return result.map(item => +item[2])
    }
    return false
}

export async function fetchPageContent(page: string) {
    if (!page) {
        console.error('page is not defined')
        return false
    }

    const pages = {
        terms: 4,
        'cookie-policy': 2,
        'privacy-policy': 3
    }

    return axios(`${CONTENT_API}/content-blocks/${pages[page]}`)
        .then(res => {
            return res.data.content_en
        })
        .catch(err => {
            console.error(err)
        })
}

export const checkAnswers = (answers: AnswerType[]) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < answers.length; i++) {
        if (!answers[i].value) {
            return i
        }
    }
    return -1
}

export function getRandomIntInclusive(min: number, max: number) {
    const Min = Math.ceil(min)
    const Max = Math.floor(max)
    return Math.floor(Math.random() * (Max - Min + 1)) + Min // Max and Min includes
}

export function getQueryFromURL(searchStr: string, key: string): string {
    if (!searchStr) return ''
    const queries = searchStr.replace('?', '').split('&')
    const needList = queries.filter(item => item.match(new RegExp(key))).join()
    if (!needList) return ''
    return needList.replace(`${key}=`, '')
}

export function sanitize(str: string): string {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;'
    }
    const reg = /[&<>"'/]/gi
    const sanitized = str.replace(reg, match => map[match])
    return sanitized.replace(/( {2,})/i, ' ')
}

export const encodeBase64 = (data) => {
  return Buffer.from(JSON.stringify(data)).toString('base64');
}
export const decodeBase64 = (data) => {
  return Buffer.from(data, 'base64').toString('ascii');
}

export function encodeDataForURL(data: unknown): string {
    const string = JSON.stringify(data)
    const buff = Buffer.from(string)
    const uriEnc = buff.toString('base64')
    return encodeURIComponent(uriEnc)
}

/**
 * Validate if user answered thruthly. If value of main octant more than minimum threshold
 * @param testResult
 * @param threshold
 */
export function isTestPassed(testResult: baseTestResultType, threshold): boolean {
    if (!testResult) {
        return false
    }
    const fullProfile: IUserResult = UserResult(testResult)
    return fullProfile.mainOctant.value > threshold
}

export const scrollToElement = (elem: string): void => {
    if (!isBrowser || typeof elem !== 'string') {
        return
    }

    const targetElem: any = document.querySelector(elem)
    if (targetElem) {
        targetElem.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
}
