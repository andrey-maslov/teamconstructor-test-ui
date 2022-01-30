import React, {useState} from 'react'
import style from './popover-more.module.scss'
import {FiArrowLeft, FiMoreHorizontal} from 'react-icons/fi'
import OutsideClickHandler from 'react-outside-click-handler'
import {useTranslation} from 'next-i18next'
import ButtonMore from "../../../../components/common/buttons/button-more/ButtonMore"
import Table from "../../../../components/common/tables/table/Table"

interface PopoverMoreProps {
    userResult: [string, number][]
    details: string[]
}

const PopoverMore: React.FC<PopoverMoreProps> = ({userResult, details}) => {
    const { t } = useTranslation('test');

    const [state, setState] = useState({
        isOpen: false,
        isTable: true,
        descIndex: -1
    })

    const closeMore = () => {
        setState({...state, isOpen: false, isTable: true})
    };

    const btnMoreHandler = () => {
        if (state.isOpen) {
            closeMore()
        } else {
            setState({...state, isOpen: true})
        }
    }

    const outsideMoreHandler = () => {
        if (state.isOpen) {
            closeMore()
        }
    }

    const renderDescHandler = (index: number) => {
        setState({...state, isTable: !state.isTable, descIndex: index})
    }

    const iconHandler = () => {
        if (!state.isTable) {
            setState({
                ...state,
                isTable: true,
                descIndex: -1
            })
        } else {
            setState({
                ...state,
                isTable: false,
            })
        }
    }

    const resultForTable: any = userResult.map((item, i) => {
        let title = <span onClick={() => {
            renderDescHandler(i);
        }}>{item[0]}</span>
        return [title, item[1]]
    })

    const renderDesc = (desc: string[]) => {
        if (state.descIndex === -1) {
            return (
                <div className={style.desc}>
                    {desc.map((item, i) => <p key={i}>{item}</p>)}
                </div>
            )
        }
        return <p className={style.desc}>{desc[state.descIndex]}</p>
    }

    return (
        <OutsideClickHandler onOutsideClick={outsideMoreHandler}>
            <div className={style.btn}>
                <ButtonMore
                    handler={btnMoreHandler}
                    isOpened={state.isOpen}
                    title={t('test:result_page.details')}
                />
            </div>
            {state.isOpen && <div className={`${style.body}`}>
                <div className={style.bar}>
                    <div onClick={iconHandler}>
                        {state.isTable ? <FiMoreHorizontal/> : <FiArrowLeft/>}
                    </div>
                </div>
                {state.isTable
                    ? <Table
                        tableData={resultForTable}
                        addClasses={['small', 'striped']}
                    />
                    : renderDesc(details)}
            </div>}
        </OutsideClickHandler>
    )
}

export default PopoverMore
