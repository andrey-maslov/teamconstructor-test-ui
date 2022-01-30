declare module 'remark-html' {
    const html: any
    export const html
}

declare module '@i18n' {
    export const Link: any
    export const t: (key: string, options?: any) => string
    export const i18n: any
    export const withTranslation: any
    export const appWithTranslation: any
    export const Router: {
        push: any
    }
}

declare module 'next-i18next' {
    export const Link: any
    export const t: (key: string, options?: any) => string
    export const i18n: any
    export const withTranslation: any
    export const useTranslation: any
    export const appWithTranslation: any
    export const Router: {
        push: any
    }
}

declare module '../store'

// declare module '@helper'

declare module '@react-media-hook' {
    export const useMediaPredicate: any
}

declare module '*.scss'
declare module '*.png'
declare module '*.jpg'
declare module '*.svg'
declare module '*.json'

declare global {
    // example of custom types
    type JSONPrimitive = string | number | boolean | null
    type JSONValue = JSONPrimitive | JSONObject | JSONArray
    type JSONObject = { [member: string]: JSONValue }

    // example of custom interface
    interface JSONArray extends Array<JSONValue> {
    }
}
