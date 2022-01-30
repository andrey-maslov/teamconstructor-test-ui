import { useTranslation } from 'next-i18next'
import CodeBox from '../../../../components/common/code-box/CodeBox'
import style from './share.module.scss'

interface IShareResult {
    encData: string
}

function ShareResult({ encData }: IShareResult) {
  const { t } = useTranslation('test');

  const host = typeof window !== 'undefined' ? window.location.host : ''
    return (
        <div className="row">
            <div className="col-sm-6">
                <h4>{t('test:result_page.export_result_title')}</h4>
                <div className={style.desc}>{t('test:result_page.export_result_desc')}</div>
            </div>
            <div className="col-sm-6">
                <div className={style.code}>
                    <CodeBox
                        content={`https://${host}/result?encdata=${encData}`}
                        btnLabel={t('test:result_page.copy_link')}
                    />
                </div>
            </div>
        </div>
    )
}

export default ShareResult
