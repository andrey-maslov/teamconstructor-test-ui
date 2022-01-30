import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useMediaPredicate } from 'react-media-hook';
import { useRouter } from 'next/router';
import style from './main.module.scss';
import RobotQuestion from '../../../../components/common/robots/robot-question/RobotQuestion';

const TestMainContent = () => {
  const { t } = useTranslation('test');
  const router = useRouter();
  const isDesktop = useMediaPredicate('(min-width: 1360px)');
  const [isRobotShown, setRobotShown] = useState(false);

  useEffect(() => {
    if (isDesktop) {
      setRobotShown(true);
    }
  }, [isDesktop]);

  return (
      <div className="pt-lg pb-lg">
        <div className="container">
          <div className="row middle-xs">
            <div className="col-xl-5">
              <div className="robot">{isRobotShown && <RobotQuestion />}</div>
            </div>
            <div className="col-xl-7">
              <div className={style.content}>
                <h1>{t('test:page.title')}</h1>
                <div
                    dangerouslySetInnerHTML={{
                      __html: t('test:page.content', { returnObjects: true })
                    }}
                />
              </div>
              <Link href="/questions">
                <a className="btn btn-accent">{t('common:buttons.start_test')}</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
};

export default TestMainContent;
