// resource for handling cookies taken from here:
// https://github.com/carlos-peru/next-with-api/blob/master/lib/session.js

import cookie from 'js-cookie'

export const setCookie = (key: string, value: string, expires?: number) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: expires || 1,
            path: '/'
        })
    }
}

export const removeCookie = (key: string) => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1
        })
    }
}

export const getCookie = (key: string, req: any) => {
    return process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req)
}

export const getCookieFromBrowser = (key: string) => {
    return cookie.get(key)
}

export const getCookieFromServer = (key: string, req: any) => {
    if (!req.headers.cookie) {
        return undefined
    }
    const rawCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${key}=`))
    if (!rawCookie) {
        return undefined
    }
    return rawCookie.split('=')[1]
}
