import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { GrInfo } from "react-icons/gr";
import {
  baseTestResultType,
  DecodedDataType,
} from "../../../libs/psychology/build/main/types/types";
import Questions from "./questions/Questions";
import style from "./test.module.scss";
import { TEST_THRESHOLD } from "../../../constants/constants";
import {
  encodeBase64,
  isTestPassed,
  scrollToElement
} from "../../../helper/helper";
import {saveTestResult, saveTestResultToFile} from "../../../api/psychologicalTestsAPI";

const personalInfo = [0, 0, 0];
const userEmail = "";

interface IDataState {
  personalInfo: readonly number[] | null;
  testData: baseTestResultType | null;
}

const Test = () => {
  const router = useRouter();
  const { t } = useTranslation("test");
  const [data, setData] = useState<IDataState>({
    personalInfo: null,
    testData: null,
  });

  const [start, setStart] = useState(new Date().getTime());
  const [teammate, setTeammate] = useState("");
  const [isNameError, setNameError] = useState(false);
  const [isTestDone, setTestDone] = useState(false);

  useEffect(() => {
    if (data.personalInfo && data.testData) {
      sendAnswers([data.personalInfo, data.testData]);
    }
  }, [data.personalInfo, data.testData]);

  return (
    <div>
      {isTestDone ? (
        <h3 style={{ textAlign: "center" }}>{t("test:page.thanx")}</h3>
      ) : (
        <div className="visible">
          <div className={style.info}>
            <GrInfo />
            <div
              dangerouslySetInnerHTML={{
                __html: t("test:page.test_block_desc"),
              }}
            />
          </div>
          <div className={`${style.name} ${isNameError ? style.error : ""}`}>
            <input
              type="text"
              name="teammate"
              value={teammate}
              placeholder={t("test:page.enter_name")}
              aria-label="name"
              onChange={(e) => {
                setNameError(false);
                setTeammate(e.target.value);
              }}
            />
            {isNameError && (
              <div className={style.nameError}>
                {t("test:errors.name_error")}
              </div>
            )}
          </div>
          <Questions changeBlock={null} questionsSubmit={testSubmit} />
        </div>
      )}
    </div>
  );

  function testSubmit(answers: baseTestResultType): void {
    setData({ personalInfo, testData: answers });
  }

  function sendAnswers(fullResult: DecodedDataType) {
    const isPassed = isTestPassed(fullResult[1], TEST_THRESHOLD);
    if (!teammate) {
      setNameError(true)
      scrollToElement('input[name=teammate]')
      return
    }
    if (isPassed) {
      const end = new Date().getTime();

      const dataToSave = {
        email: userEmail,
        fullName: teammate,
        testResult: encodeBase64(fullResult),
        duration: end - start,
        tags: "",
      };
      // save result in DB
      saveTestResult(dataToSave)
          .then(res => {
            setTestDone(true)
          })
          .catch(err => console.error(err))
    }
  }
};

export default Test;
