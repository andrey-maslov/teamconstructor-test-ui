import React, { useEffect, useState } from 'react'

export const useDeviceDetect = () => {
    const [isMobile, setMobile] = useState(false)
    const [userAgent, setUserAgent] = useState('')

    useEffect(() => {
        const agent = typeof navigator === 'undefined' ? '' : navigator.userAgent
        const mobile = Boolean(
            agent.match(
                /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop|XiaoMi|MiuiBrowser/
            )
        )
        setMobile(mobile)
        setUserAgent(agent)
    }, [])

    return { userAgent, isMobile }
}
