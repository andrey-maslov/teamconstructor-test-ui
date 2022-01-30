import { useTranslation } from 'next-i18next'
import style from './footer.module.scss'

const Footer = () => {
  const { t } = useTranslation('common')
  
    return (
        <footer className={`${style.footer}`}>
            <div className="container">
                <div className={style.copy}>
                    © {new Date().getFullYear()} | {t('footer.copy')}
                </div>
            </div>
        </footer>
    )
}

export default Footer
