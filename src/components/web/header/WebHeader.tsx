import style from './web-header.module.scss'
import TopLogo from '../../layout/header/top-logo/TopLogo'

const WebHeader = () => {
    return (
        <nav className={style.bar}>
            <TopLogo />
        </nav>
    )
}

export default WebHeader
