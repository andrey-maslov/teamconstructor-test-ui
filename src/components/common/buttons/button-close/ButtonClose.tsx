import style from './button-close.module.scss'

type ButtonCloseType = {
    handle: () => void
}

const ButtonClose: React.FC<ButtonCloseType> = ({ handle }) => {
    return (
        <button onClick={handle} className={style.closeBtn}>
            ✕
        </button>
    )
}

export default ButtonClose
