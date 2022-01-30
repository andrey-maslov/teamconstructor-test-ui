import style from './mobi-header.module.scss'
import LangSwitcher from '../../common/buttons/lang-switcher/LangSwitcher'
import TopLogo from '../../layout/header/top-logo/TopLogo'

const MobiHeader = () => {

    return (
        <header className={style.header}>
            <div className="container">
                <div className={style.bar}>
                    <TopLogo />
                    <LangSwitcher />
                </div>
            </div>
        </header>
    )
}

export default MobiHeader
