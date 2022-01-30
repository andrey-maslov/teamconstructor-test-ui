import React from 'react'
import { TestMainLayout } from '../page-layouts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

function Index() {
    return <TestMainLayout />
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['test', 'questions', 'common']),
  },
})

export default Index
