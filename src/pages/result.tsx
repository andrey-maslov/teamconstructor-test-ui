import React from 'react';
import { TestResultLayout } from '../page-layouts';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function Test(props) {
  return <TestResultLayout testResult={props.testResult} />;
}

export const getServerSideProps = async ({locale, query}) => {
  return {
    props: {
      testResult: query.encdata,
      ...(await serverSideTranslations(locale, ['test', 'questions', 'common'])),
    },
  }
};

export default Test;
