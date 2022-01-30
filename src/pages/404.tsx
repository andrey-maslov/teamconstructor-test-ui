import { NotFoundLayout } from '../page-layouts';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Error = () => <NotFoundLayout />;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Error;
