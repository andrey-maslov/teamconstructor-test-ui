import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import Layout from '../../../components/layout/Layout'
import Result from './Result'
import { SITE_TITLE } from '../../../constants/constants'

const TestResultLayout = ({ testResult }) => {
  const { t } = useTranslation('test');

  return (
        <>
            <Head>
                <title>{`${t('test:page.title')} - ${SITE_TITLE}`}</title>
            </Head>
            <div className="page-test-result">
                <Layout>
                    <section className="pt-lg pb-lg">
                        <div className="container">
                            <Result testResult={testResult} />
                        </div>
                    </section>
                </Layout>
            </div>
        </>
    )
}

export default TestResultLayout
