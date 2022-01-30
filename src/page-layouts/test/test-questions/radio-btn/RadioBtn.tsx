import React from 'react'
import { FiCheck } from 'react-icons/fi'
import style from './radio-btn.module.scss'

type RadioType = {
    value: string
    label?: string
    isSelected: boolean
    handler: any
}

const RadioBtn = ({ value, isSelected, handler, label }: RadioType) => {
    const withLabelClass: string = label ? 'withLabel' : ''

    const onKeypress = (e: React.KeyboardEvent) => {
        if (e.charCode === 13) {
            handler(e)
        }
    }

    return (
        <button
            className={`${style.label} ${isSelected ? style.selected : ''} ${
                label ? style[withLabelClass] : ''
            }`}
            data-value={value}
            onClick={handler}
            onKeyPress={onKeypress}
            aria-label={value}
            tabIndex={0}>
            <div className={`${style.btn}`} data-value={value} id={value}>
                {isSelected && <FiCheck />}
            </div>
            {label}
        </button>
    )
}

export default RadioBtn
