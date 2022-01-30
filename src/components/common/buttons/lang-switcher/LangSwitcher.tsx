import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import OutsideClickHandler from 'react-outside-click-handler';
import { Popover } from '../../popovers/Popover';
import style from './lang-switcher.module.scss';

const LangSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const outsideClickHandler = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <OutsideClickHandler onOutsideClick={outsideClickHandler}>
      <div className={style.wrapper}>
        <button
          className={`${style.btn} lang-btn`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          suppressHydrationWarning
        >
          {router.locale}
        </button>
        <Popover isVisible={isOpen} className="lang-popover">
          <ul className={style.links}>
            {router.locales.map((lang) => {
              const activeClass = lang === router.locale ? 'current' : '';
              
              return (
                <li key={lang} className={`${style.item} ${activeClass ? style[activeClass] : ''}`}>
                  <Link href={`${lang}${router.asPath}`} locale={lang}>
                    <button className={style.switcher}>{lang}</button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Popover>
      </div>
    </OutsideClickHandler>
  );
};

export default LangSwitcher;
