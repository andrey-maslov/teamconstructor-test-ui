import Link from 'next/link';
import style from './top-logo.module.scss'

export default function TopLogo() {
    return (
        <div className={style.logo}>
            <Link href="/">
                <a>
                    {/* <img src="/img/logo.svg" alt="results" /> */}
                    <span>
                        <b>CTI</b> Psychological Test
                    </span>
                </a>
            </Link>
        </div>
    )
}
