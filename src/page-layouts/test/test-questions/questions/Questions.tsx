import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useTranslation } from "next-i18next";
import { useToasts } from "react-toast-notifications";
import { calculateResults } from "../../../../libs/psychology";
import Button from "../../../../components/common/buttons/button/Button";
import {
  AnswerType,
  IQuestion,
  QuestionsProps,
} from "../../../../typings/types";
import RadioGroupItem from "../radio-group-item/RadioGroupItem";
import style from "./questions.module.scss";
import {
  checkAnswers,
  isBrowser,
  scrollToElement,
} from "../../../../helper/helper";
import mock from "./fakeData.json";
import { mode } from "../../../../constants/constants";

const Questions = ({ changeBlock, questionsSubmit }: QuestionsProps) => {
  const { addToast } = useToasts();
  const { t } = useTranslation("questions");

  const questions: IQuestion[] = t(`questions:questions`, {
    returnObjects: true,
  });

  let initAnswers: Array<AnswerType> = questions.map((item, i) => ({
    id: `${i + 1}`,
    value: "",
  }));

  const [answers, setAnswers] = useState<AnswerType[]>(initAnswers);

  return (
    <>
      <div>
        {questions.map((item, i) => (
          <RadioGroupItem
            caption1={t(`questions:questions.${i}.0`)}
            caption2={t(`questions:questions.${i}.1`)}
            values={["-2", "-1", "0", "1", "2"]}
            index={i + 1}
            testHandler={testHandler}
            key={i}
          />
        ))}
      </div>
      <div className={style.buttons}>
        <Button
          handle={() => testSubmit(answers)}
          btnClass="btn btn-accent"
          title={t("common:buttons.send")}
          endIcon={<FiArrowRight />}
        />
        {/*{process.env.NODE_ENV !== 'production' && (*/}
        {/*  <Button*/}
        {/*    handle={() => testSubmit(mock.fakeData)}*/}
        {/*    btnClass="btn btn-accent"*/}
        {/*    title="FAKE ANSWERS"*/}
        {/*    endIcon={<FiArrowRight />}*/}
        {/*  />*/}
        {/*)}*/}
      </div>
    </>
  );

  function testSubmit(answersObj) {
    const check: number = checkAnswers(answersObj);
    if (check === -1) {
      // @ts-ignore
      questionsSubmit(calculateResults(answersObj));
    } else if (isBrowser && check !== -1) {
      addToast(t("test:errors.all_q_required"), {
        appearance: "error",
      });
      // scroll to first not answered question
      // scroll to first not answered question
      scrollToElement(`.visible [data-item-index="${check + 1}"]`);
    }
  }

  function testHandler(questionNumber: number, value: string) {
    initAnswers = answers;
    initAnswers[questionNumber - 1] = { id: questionNumber.toString(), value };
    setAnswers([...initAnswers]);
  }
};

export default Questions;
