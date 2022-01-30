import React, { useState } from 'react'
import { FiCheck } from 'react-icons/fi'
import RadioBtn from '../radio-btn/RadioBtn'
import style from './radio-group-item.module.scss'

type RadioGroupItem = {
    caption1?: string
    caption2?: string
    values: Array<string>
    labels?: Array<string>
    index: number | null
    testHandler: any
    type?: string
}

const RadioGroupItem = ({
    caption1,
    caption2,
    values,
    labels,
    index,
    testHandler,
    type = 'horizontal'
}: RadioGroupItem) => {
    type LocalStateType = {
        selectedBtn: string
        question: number | null
        isAnswered: boolean
        closestCaptionClass: string
    }

    const [localState, setLocalState] = useState<LocalStateType>({
        selectedBtn: '',
        question: 0,
        isAnswered: false,
        closestCaptionClass: ''
    })

    const itemClasses = `test-item ${style.item} ${
        localState.isAnswered ? `${style.answered} answered` : ''
    } ${localState.closestCaptionClass ? style[localState.closestCaptionClass] : ''}`

    return (
        <div className={itemClasses} data-item-index={index}>
            <div className={style.index}>
                {index}
                {localState.isAnswered && (
                    <div className="fade-in">
                        <FiCheck />
                    </div>
                )}
            </div>
            <div className={`${style.content} ${style[type]}`}>
                {caption1 && (
                    <div className={`${style.caption}`}>
                        <p>{caption1}</p>
                    </div>
                )}
                <div className={`${style.options}`}>
                    {values.map((value, i) => {
                        const isSelected: boolean = localState.selectedBtn === value

                        return (
                            <RadioBtn
                                key={value}
                                value={value}
                                label={labels && labels[i]}
                                isSelected={isSelected}
                                handler={handleRadioBtn}
                            />
                        )
                    })}
                </div>
                {caption2 && (
                    <div className={`${style.caption}`}>
                        <p>{caption2}</p>
                    </div>
                )}
            </div>
        </div>
    )

    function handleRadioBtn(e: any): void {
        const { value } = e.target.dataset
        setLocalState({
            ...localState,
            selectedBtn: value,
            question: index,
            isAnswered: true,
            closestCaptionClass: getClosestCaptionClass(value)
        })
        testHandler(index, value)
        // if (window && document.scrollHeight > 1300) {
        // scrollToNext();
        // console.log('document.scrollHeight')
        // }
    }

    function getClosestCaptionClass(val: string) {
        if (Math.sign(+val) === -1) {
            return 'first'
        }
        if (Math.sign(+val) === 1) {
            return 'second'
        }
        return 'neutral'
    }

    function scrollToNext() {
        const QIndex = Number(index)
        let i = 1

        function scroll() {
            const targetElem: any = document.querySelector(`[data-item-index="${QIndex + i}"]`)

            if (targetElem !== null && !targetElem.classList.contains('answered')) {
                targetElem.scrollIntoView({ block: 'center', behavior: 'smooth' })
            } else if (targetElem === null) {
            } else {
                i++
                scroll()
            }
        }

        scroll()
    }
}

export default RadioGroupItem
