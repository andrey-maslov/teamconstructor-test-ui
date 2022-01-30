import React from 'react'
import style from './box.module.scss'

const Box: React.FC<any> = ({ ...props }) => {
    const addClassNames = props.className ? props.className : ''

    return (
        <div {...props} className={`${style.wrapper} ${addClassNames}`}>
            {props.children}
        </div>
    )
}

export default Box
