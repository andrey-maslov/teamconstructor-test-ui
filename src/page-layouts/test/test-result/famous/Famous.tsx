import React from 'react'
import style from './famous.module.scss'

interface IFamous {
    person: string | null
    imgName: string | null
    desc: string | null
}

export default function Famous({ person, imgName, desc }: IFamous) {
    return (
        <div className={style.wrapper}>
            <img
                className={style.img}
                src={`/img/famous/${imgName}.png`}
                srcSet={`/img/famous/${imgName}@2x.png 2x`}
                alt={person || 'famous person'}
            />
            <div className={style.person}>{person}</div>
            <div className={style.desc}>{desc}</div>
        </div>
    )
}