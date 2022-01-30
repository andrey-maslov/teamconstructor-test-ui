import React from 'react'
import style from './table.module.scss'

type Value = string | number | any

interface TableProps {
    tableHeader?: Value[]
    tableData: Value[][]
    addClasses?: ('striped' | 'small' | 'large')[]
}

const Table: React.FC<TableProps> = ({ tableHeader, tableData, addClasses }) => {
    const tableClasses = addClasses ? addClasses.map(item => ` ${style[item]}`).join('') : null

    return (
        <div className={style.wrapper}>
            <table className={`${style.table} ${tableClasses || ''}`}>
                <tbody>
                    {tableHeader && (
                        <tr>
                            {tableHeader.map(item => {
                                return <th key={item}>{item}</th>
                            })}
                        </tr>
                    )}
                    {tableData.map((item, index) => {
                        return (
                            <tr key={index}>
                                {item.map((value, i) => (
                                    <td key={`${index}-${i}`}>{value}</td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table
