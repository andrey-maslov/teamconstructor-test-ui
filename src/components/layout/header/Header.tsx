import style from './header.module.scss'
import LangSwitcher from '../../common/buttons/lang-switcher/LangSwitcher'
import TopLogo from './top-logo/TopLogo'

const Header = () => {
    return (
        <header className={style.header}>
            <div className={style.bar}>
                <TopLogo />
                <LangSwitcher />
            </div>
        </header>
    )
}

export default Header
