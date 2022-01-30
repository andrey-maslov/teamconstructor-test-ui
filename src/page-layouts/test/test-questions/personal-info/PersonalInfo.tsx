import React, { useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { useTranslation } from 'next-i18next'
import { useToasts } from 'react-toast-notifications'
import Button from '../../../../components/common/buttons/button/Button'
import { AnswerType, IQuestion, QuestionsProps } from '../../../../typings/types'
import RadioGroupItem from '../radio-group-item/RadioGroupItem'
import { checkAnswers, isBrowser } from '../../../../helper/helper'

const PersonalInfo = ({ changeBlock, questionsSubmit }: QuestionsProps) => {
  const { t } = useTranslation('test', 'common', 'questions');

  const personalInfo: IQuestion[] = t(`questions:personalInfo`, { returnObjects: true })
    let initAnswers: Array<AnswerType> = personalInfo.map((item: any) => ({
        id: item.title,
        value: ''
    }))
    const { addToast } = useToasts()
    const [state, setState] = useState({
        answers: initAnswers,
        isBtnEnabled: true
    })

    const personalInfoScheme = [
        ['0', '1', '2', '4'],
        ['0', '1', '2', '3', '4', '5'],
        ['0', '1', '2']
    ]

    return (
        <>
            <div>
                {personalInfoScheme.map((item, i) => (
                    <RadioGroupItem
                        caption1={t(`questions:personalInfo.${i}.title`)}
                        values={item}
                        labels={t(`questions:personalInfo.${i}.values`, { returnObjects: true })}
                        index={i + 1}
                        testHandler={testHandler}
                        type="vertical"
                        key={i}
                    />
                ))}
            </div>
            <Button
                handle={nextBtnHandler}
                btnClass="btn btn-accent"
                title={t('common:buttons.next')}
                endIcon={<FiArrowRight />}
                isEnabled={state.isBtnEnabled}
            />
        </>
    )

    function nextBtnHandler() {
        const result = state.answers.map(item => +item.value)
        const check: number = checkAnswers(state.answers)
        if (check === -1) {
            questionsSubmit(result)
            changeBlock('questions')
            window.scrollTo(0, 0)
        } else if (isBrowser) {
            addToast(t('test:errors.all_q_required'), {
                appearance: 'error'
            })
            // scroll to first not answered question
            const targetElem: any = document.querySelector(
                `.visible [data-item-index="${check + 1}"]`
            )
            targetElem.scrollIntoView({ block: 'center', behavior: 'smooth' })
        }
    }

    function testHandler(questionNumber: number, value: string): void {
        initAnswers = state.answers
        initAnswers[questionNumber - 1] = { id: initAnswers[questionNumber - 1].id, value }
        setState({ ...state, answers: [...initAnswers] })
    }
}

export default PersonalInfo
