import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import Layout from '../../../components/layout/Layout';
import Test from './Test';
import { SITE_TITLE } from '../../../constants/constants';

const TestQuestionsLayout = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{`${t('common:misc.psychological_test')} - ${SITE_TITLE}`}</title>
      </Head>
      <div className="page-test-questions">
        <Layout>
          <section className="section">
            <div className="container">
              <div className="row center-xs">
                <div className="col-lg-9">
                  <Test />
                </div>
              </div>
            </div>
          </section>
        </Layout>
      </div>
    </>
  );
};

export default TestQuestionsLayout;
