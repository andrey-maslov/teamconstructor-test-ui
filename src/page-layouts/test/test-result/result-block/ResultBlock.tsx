import React, { useState } from 'react'
import Table from '../../../../components/common/tables/table/Table'
import style from './result-block.module.scss'
import { Bar } from 'react-chartjs-2'
import { COLORS } from '../../../../constants/constants'
import hexToRgba from '../../../../helper/hexToRgba'
import { useMediaPredicate } from 'react-media-hook'
import { useTranslation } from 'next-i18next'
import { getChartLabels, getDesiredData, getRealData } from "../../../../helper/helper"
import Checkbox from "../../../../components/common/inputs/checkbox/Checkbox"

interface ResultBlockProps {
    title: string
    description: string
    tableData: (string | number)[][]
}

const ResultBlock: React.FC<ResultBlockProps> = ({title = '', description = '', tableData}) => {
    const { t } = useTranslation('test');

    type LocalStateType = {
        isMinimalParams: boolean
    }

    const desiredResult = getDesiredData(tableData)
    const [localState, setLocalState] = useState<LocalStateType>({isMinimalParams: false})

    const chartBarOptions: any = {
        desktop: {
            width: 250,
            height: 150,
        },
        mobi: {
            width: 250,
            height: 200,
        }
    }


    const isMobi = useMediaPredicate('(max-width: 600px)')
    const currentOptions = !isMobi ? {...chartBarOptions.desktop} : {...chartBarOptions.mobi}

    let data: any = (desiredResult && localState.isMinimalParams) ? {
        labels: getChartLabels(tableData),
        datasets: [
            {
                label: t('test:result_page.real_result'),
                data: getRealData(tableData),
                backgroundColor: hexToRgba(COLORS.orange, .5),
                borderColor: COLORS.orange,
                borderWidth: 1
            },
            {
                label: t('test:result_page.desired_result'),
                data: desiredResult,
                backgroundColor: hexToRgba(COLORS.accent, .5),
                borderColor: COLORS.accent,
                borderWidth: 1,
            }
        ]
    } : {
        labels:  getChartLabels(tableData),
        datasets: [
            {
                label: t('test:result_page.real_result'),
                data: getRealData(tableData),
                backgroundColor: getRealData(tableData).map(value => value > 0 ? hexToRgba(COLORS.orange, .5) : hexToRgba(COLORS.yellow, .5)),
                borderColor: COLORS.orange,
                borderWidth: 1,
            }
        ]
    }

    const tableOptions = {
        legend: {
            labels: {
                fontColor: hexToRgba(COLORS.text, 1),
                boxWidth: 60,
                fontSize: 14
            }
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                    color: hexToRgba(COLORS.grey, .3),
                    zeroLineColor: hexToRgba(COLORS.grey, .3),
                },
                ticks: {
                    fontColor: hexToRgba(COLORS.text, 1),
                    fontSize: 14,
                    stepSize: 1,
                    beginAtZero: true
                }
            }],
            yAxes: [{
                gridLines: {
                    borderDash: [5, 2],
                    color: hexToRgba(COLORS.grey, .3),
                    zeroLineColor: hexToRgba(COLORS.grey, .3),
                },
                ticks: {
                    fontColor: hexToRgba(COLORS.text, 1),
                    fontSize: 14,
                    beginAtZero: true
                }
            }]
        }
    }

    return (
        <>
            {title && <h4 className={style.title}>{title}</h4>}
            {description && <p>{description}</p>}

            {desiredResult &&
            <div className={style.checkbox}>
                <Checkbox
                    label={t('test::result_page.show_minimal')}
                    handle={() => {
                        setLocalState({isMinimalParams: !localState.isMinimalParams});
                    }}
                    isChecked={localState.isMinimalParams}
                />
            </div>}

            <div className={style.wrapper}>
                <div className={style.table}>
                    <Table
                        tableData={tableData.map(item => [item[0], item[1]])}
                        addClasses={['striped', 'small']}
                    />
                </div>
                <div className={style.chart}>
                    <Bar
                        data={data}
                        width={currentOptions.width}
                        height={currentOptions.height}
                        // options={tableOptions}
                    />
                </div>
            </div>
        </>
    )
}

export default ResultBlock
