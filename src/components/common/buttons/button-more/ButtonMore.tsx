import { FiChevronDown } from 'react-icons/fi'
import style from './button-more.module.scss'

interface ButtonMoreProps {
    isOpened: boolean
    handler: () => void
    title?: string
}

const ButtonMore: React.FC<ButtonMoreProps> = ({ isOpened, handler, title }) => {
    return (
        <button
            onClick={handler}
            className={`${style.btn} ${isOpened ? style.opened : ''}`}
            tabIndex={0}>
            {title && <span>{title}</span>}
            <FiChevronDown />
        </button>
    )
}

export default ButtonMore
