import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import style from './admin.module.scss';
import Layout from '../../components/layout/Layout';
import mockResultList from './resultList.json';
import { ResultItem } from './ResultItem/ResultItem';
import { getAllTestResults } from '../../api/psychologicalTestsAPI';

export type ResultItemType = {
  createdAt: Date | string;
  duration: string;
  email: string;
  fullName: string;
  publishedAt: string;
  tags: string;
  testResult: string;
  updatedAt: string;
  id: number;
};

// export interface ResultListFromServer {
//  
// }

function AdminLayout() {
  const [resultList, setResultList] = useState<ResultItemType[] | null>(null);

  useEffect(() => {
    getAllTestResults().then((res) => {
      if (res?.data && Array.isArray(res.data)) {
        const list = res.data.map((item: any) => {
          return { id: item.id, ...item.attributes };
        });

        setResultList(list);
      }
    });
  }, [])
  
  return (
    <>
      <Head>
        <title>Admin panel</title>
      </Head>
      <Layout>
        <div className={`${style.wrapper} pt-lg pb-lg`}>
          <div className="container">
            <h2 className="pb-md">Результаты</h2>
            <div className="row">
              <div className="col-md-8">
                <div className={style.tableHeader}>
                  <span className={style.number}>№</span>
                  <span className={style.email}>Email</span>
                  <span className={style.date}>Дата результата</span>
                  <span className={style.duration}>Продолжительность заполнения</span>
                </div>
                {resultList?.length > 0 &&
                  resultList.map((item, i) => <ResultItem key={item.id} number={i + 1} data={item} />)}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default AdminLayout;
