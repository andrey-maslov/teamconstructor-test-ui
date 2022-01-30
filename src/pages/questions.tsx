import React from 'react';
import { TestQuestionsLayout } from '../page-layouts';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function Test() {
  return <TestQuestionsLayout />;
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['test', 'questions', 'common'])),
  },
});

export default Test;
