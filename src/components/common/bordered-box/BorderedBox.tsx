import style from './bordered-box.module.scss'

type BorderedBoxType = {
    borderColor: string
    children: React.ReactNode
}

const BorderedBox: React.FC<BorderedBoxType> = ({ borderColor, children }) => {
    const boxStyles = {
        borderColor
    }

    return (
        <div className={style.border} style={boxStyles}>
            {children}
        </div>
    )
}

export default BorderedBox
