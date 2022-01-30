import React from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Head from 'next/head';
import style from './error.module.scss';
import Layout from '../../components/layout/Layout';
import { SITE_TITLE } from '../../constants/constants';

function NotFoundLayout() {
  const { t } = useTranslation('common');
  return (
    <>
      <Head>
        <title>{`${t('common:errorPage.not_found')} - ${SITE_TITLE}`}</title>
      </Head>
      <Layout>
        <div className={`${style.wrapper} pt-lg pb-lg`}>
          <p className={style.title}>{t('common:errorPage.oops')}</p>
          <div>
            <div className={style.subtitle}>{t('common:errorPage.not_found')}</div>
            <div className={style.img}>
              <img src="/img/404.png" className="img-fluid" alt="error 404" />
            </div>
          </div>
          <Link href="/">
            <a className="btn btn-accent">{t('common:buttons.to_main')}</a>
          </Link>
        </div>
      </Layout>
    </>
  );
}

export default NotFoundLayout;
