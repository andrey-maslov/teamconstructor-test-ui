import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import Layout from '../../../components/layout/Layout';
import TestMainContent from './content/TestMainContent';
import { SITE_TITLE } from '../../../constants/constants';

const TestMainLayout = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{`${t('common:misc.psychological_test')} - ${SITE_TITLE}`}</title>
      </Head>
      <div className="page-test-main main">
        <Layout>
          <TestMainContent />
        </Layout>
      </div>
    </>
  );
};

export default TestMainLayout;
