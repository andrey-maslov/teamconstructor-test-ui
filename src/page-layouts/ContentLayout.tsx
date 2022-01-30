import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import Layout from '../components/layout/Layout'
import { SITE_TITLE } from '../constants/constants'

export type ContentPageType = {
    content: any
    page: string
}

const ContentLayout: React.FC<ContentPageType> = ({ content, page }) => {
  const { t } = useTranslation('common');

  const title = {
        terms: t('common:nav.terms'),
        'privacy-policy': t('common:nav.privacy_policy'),
        'cookie-policy': t('common:nav.cookie')
    }

    return (
        <>
            <Head>
                <title>
                    {title[page]} - {SITE_TITLE}
                </title>
            </Head>
            <div className="page-content">
                <Layout>
                    <div className="container">
                        <div className="section" dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                </Layout>
            </div>
        </>
    )
}

export default ContentLayout
