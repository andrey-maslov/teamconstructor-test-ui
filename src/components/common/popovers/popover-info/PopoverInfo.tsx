import React, { useState } from 'react'
import { FiExternalLink, FiMoreVertical } from 'react-icons/fi'
import OutsideClickHandler from 'react-outside-click-handler'
import style from './popover-info.module.scss'

interface IPopoverInfo {
    links: { title: string; url: string }[]
}

const PopoverInfo: React.FC<IPopoverInfo> = ({ links }) => {
    const [isOpen, setOpen] = useState(false)

    return (
        <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
            <div className={style.btn}>
                <button onClick={() => setOpen(!isOpen)} aria-label="info">
                    <FiMoreVertical />
                </button>
            </div>
            {isOpen && (
                <div className={`${style.container}`}>
                    {links &&
                        links.map(item => (
                            <div key={item.title} className={style.item}>
                                <FiExternalLink />
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    {item.title}
                                </a>
                            </div>
                        ))}
                </div>
            )}
        </OutsideClickHandler>
    )
}

export default PopoverInfo
