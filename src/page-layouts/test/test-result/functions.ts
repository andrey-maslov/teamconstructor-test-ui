import {
    IOctant,
    ITendency,
    IDescWithRange,
    IDescWithStatus,
    baseTestResultType
} from '../../../libs/psychology/build/main/types/types'
import { getIndexByRange } from '../../../libs/psychology'

export function getModifiedSubAxes(subAxes: string[][] | unknown) {
    if (!subAxes || !Array.isArray(subAxes)) {
        return null
    }
    return subAxes.map(item => item.map(str => str.split(' - ')))
}

export function getSum(tableData: ([string, number] | [string, number, number])[]): number {
    return tableData.map(item => item[1]).reduce((a, b) => Number(a) + Number(b))
}

// eslint-disable-next-line prettier/prettier
type ReadonlyOctant = readonly IOctant[]
export function getOctantFraction(octant: IOctant, octantList: ReadonlyOctant): number {
    const sum: number = octantList.map(item => item.value).reduce((a, b) => a + b)
    return octant.value / sum
}

/**
 * Описание психологического портрета
 * @param octant
 * @param data
 * @param fullProfileList
 */
export function getPortraitDesc(
    octant: IOctant,
    data: string[][][],
    fullProfileList: { title: string; options: IDescWithRange[] }[]
): string[][] {
    const descByIndex = data[octant.index]

    let severityIndex = getIndexByRange(octant.value, fullProfileList[1].options)

    if (severityIndex > 2) {
        severityIndex = 2
    }
    // need to choose addition description by severity in fist line of the table
    const fistItem = descByIndex[0]
    const descBySeverity = fistItem[2][severityIndex]

    // change fist line of the table with edited description
    const fistItemEdited = [fistItem[0], fistItem[1] + descBySeverity]

    return [fistItemEdited, ...descByIndex.slice(1)]
}

/**
 * Описание психотипа
 * @param octants
 * @param data
 * @param range - default [0, 42.35, 140, 1000]
 */
export function getPsychoTypeDesc(
    octants: readonly IOctant[],
    data: string[][],
    range = [0, 42.35, 140, 1000]
): string | null {
    const value1 = octants[0].value
    const value2 = octants[1].value
    const typeInd = octants[0].index // get psycho type group index
    const diff: number = value1 * 0.15 // difference between 1st and 2nd max values
    let descInd: number

    if (value1 < range[0] || value1 > range[3]) {
        return null
    }

    // combined profile
    if (value1 - value2 < diff && octants[1].code === octants[0].code.toUpperCase()) {
        const ind = typeInd > 3 ? typeInd - 4 : typeInd
        return data[ind][3]
    }

    if (value1 >= range[0] && value1 < range[1]) {
        descInd = 0
    } else if (value1 >= range[1] && value1 < range[2]) {
        descInd = 1
    } else {
        descInd = 2
    }

    // mono profile
    return data[typeInd][descInd]
}

/**
 * Лидерские качества
 * @param data
 * @param profile
 */
export function getLeadershipSkills(data: IDescWithRange[], profile: readonly ITendency[]): string {
    const as = profile[3][1] + profile[4][1] // aggressiveness + spontaneity
    const ee = profile[1][1] + profile[2][1] // extraversion + emotiveness
    const value = as + ee
    const probably =
        profile[3][1] < 5 || profile[4][1] < 5 || profile[1][1] < 5 || profile[2][1] < 5
            ? `${data[5].desc}, `
            : ''

    if (value < 24) {
        return `${probably}${data[0].desc}`
    }
    if (value > 42) {
        return as >= ee
            ? `${probably}${data[2].desc} ${data[1].desc}-${data[3].desc}`
            : `${probably}${data[2].desc} ${data[1].desc}-${data[4].desc}`
    }
    return as >= ee
        ? `${probably}${data[1].desc}-${data[3].desc}`
        : `${probably}${data[1].desc}-${data[4].desc}`
}

/**
 * data for long table with full profile
 */
export function getProfileDesc(descriptions, terms, getDescFn, keyValues, testData, fullProfile) {
    const _ = getDescFn
    const arr: IDescWithStatus[] = [
        {
            title: descriptions[0].title,
            desc: fullProfile.mainPsychoTypeList.map(item => terms.psychoTypes[item]).join(', '),
            status: 1
        }, // профиль (сочетание профилей) - ведущий психотип
        _(fullProfile.mainOctant.value, descriptions[1]), // severity - выраженность
        _(testData[3][4], descriptions[2]), // relBuilding - склонность к установлению отношений
        _(testData[3][3], descriptions[3]), // relAccept - склонность к принятию отношений
        _(testData[3][2], descriptions[4]), // neuroticism - невротизм
        _(
            fullProfile.profile[0].value +
                fullProfile.profile[1].value +
                fullProfile.profile[7].value,
            descriptions[5]
        ), // motivation - мотивация
        _(fullProfile.mainOctant.index, descriptions[7]), // thinkingStyle - стиль мышления
        {
            title: descriptions[8].title,
            desc: fullProfile.mainTendencyList.map(item => terms.tendencies[item]).join(', '),
            status: 1
        }, // ведущие тенденции
        _(fullProfile.mainOctant.index, descriptions[10]), // reactionType - тип реагирования
        _(getSum(keyValues.managementData), descriptions[11]), // efficiency эффективность
        {
            title: descriptions[12].title,
            desc: getLeadershipSkills(descriptions[12].options, fullProfile.profile),
            status: 1
        }, // лидерские качества
        _(getSum(keyValues.teamSurvivalData), descriptions[13]), // teamSurvival - уживаемость в коллективе
        _(getSum(keyValues.selfOrganizationData), descriptions[14]), // selfOrganize - самоорганизация
        _(getSum(keyValues.loyaltyData), descriptions[15]), // loyalty - лояльность
        _(getSum(keyValues.initiativeData), descriptions[16]), // Initiative - инициативность
        _(fullProfile.mainOctant.index, descriptions[17]), // learnability - Оптимальный способ обучения
        _(getSum(keyValues.conformismData), descriptions[18]), // conformism - конформизм
        _(getSum(keyValues.selfEsteemData), descriptions[19]), // selfEsteem - самооценка
        _(getSum(keyValues.conflictData), descriptions[20]), // conflict - конфликтность
        _(getSum(keyValues.depressionData), descriptions[21]) // depression - депрессивность
    ]
    return arr.map(item => [item.title, item.desc])
}

/**
 *
 * @param axes
 * @param tablesWithBarsTitles
 * @param testResult
 * @constructor
 */
export function TablesWithBars(
    axes: string[][][],
    tablesWithBarsTitles: { title: string; desc: string }[],
    testResult: baseTestResultType
) {
    const tablesWithBars = getTablesWithBars()

    // Data for tables with bars chart
    function getTablesWithBars(): { data: (string | number)[][]; title: string; desc: string }[] {
        const tables = [
            getManagementData(),
            getSelfOrganizationData(),
            getLoyaltyData(),
            getInitiativeData(),
            getLearnabilityData(),
            getConformismData(),
            getSelfEsteemData(),
            getConflictData(),
            getDepressionData()
        ]
        return tablesWithBarsTitles.map((param: { title: string; desc: string }, i: number) => ({
            data: tables[i],
            title: param.title,
            desc: param.desc
        }))
    }

    /**
     * Эффективность в руководстве малой группы
     */
    function getManagementData(): [string, number, number][] {
        return [
            [axes[0][0][0], testResult[0][0] * -1, 3],
            [axes[1][3][1], testResult[1][3], 3],
            [axes[2][3][0], testResult[2][3] * -1, 3],
            [axes[3][0][1], testResult[3][0], 4],
            [axes[2][1][0], testResult[2][1] * -1, 4]
        ]
    }

    /**
     * Выживаемость в коллективе
     */
    function getTeamSurvivalData(): [string, number, number][] {
        return [
            [axes[1][1][0], testResult[1][1] * -1, -1],
            [axes[1][2][0], testResult[1][2] * -1, 1],
            [axes[3][3][1], testResult[3][3], 1],
            [axes[3][4][0], testResult[3][4] * -1, 1],
            [axes[4][4][0], testResult[4][4] * -1, 1]
        ]
    }

    /**
     * Самоорганизация
     */
    function getSelfOrganizationData(): [string, number, number][] {
        return [
            [axes[3][2][1], testResult[3][2], 1],
            [axes[2][0][0], testResult[2][0] * -1, 1],
            [axes[2][1][0], testResult[2][1] * -1, 1],
            [axes[2][3][0], testResult[2][3] * -1, 1],
            [axes[2][4][0], testResult[2][4] * -1, 1]
        ]
    }

    /**
     * Лояльность
     */
    function getLoyaltyData(): [string, number, number][] {
        return [
            [axes[3][1][0], testResult[3][1] * -1, 1],
            [axes[0][3][1], testResult[0][3], 0],
            [axes[1][1][0], testResult[1][1] * -1, 1],
            [axes[4][3][1], testResult[4][3], 0],
            [axes[1][0][0], testResult[1][0] * -1, 1]
        ]
    }

    /**
     * Инициативность
     */
    function getInitiativeData(): [string, number, number][] {
        return [
            [axes[0][0][0], testResult[0][0] * -1, 1],
            [axes[2][1][1], testResult[2][1], 1],
            [axes[4][4][0], testResult[4][4] * -1, 1],
            [axes[1][1][1], testResult[1][1], 1],
            [axes[1][4][1], testResult[1][4], 1]
        ]
    }

    /**
     * Обучаемость
     */
    function getLearnabilityData(): [string, number, number][] {
        return [
            [axes[0][0][0], testResult[0][0] * -1, 1],
            [axes[2][1][0], testResult[2][1] * -1, 1],
            [axes[4][4][0], testResult[4][4] * -1, 1],
            [axes[4][0][0], testResult[4][0] * -1, 1],
            [axes[0][3][0], testResult[0][3] * -1, 1]
        ]
    }

    /**
     * Конформизм
     */
    function getConformismData(): [string, number, number][] {
        return [
            [axes[1][3][0], testResult[1][3] * -1, 1],
            [axes[2][4][0], testResult[2][4] * -1, 1],
            [axes[2][2][0], testResult[2][2] * -1, 1],
            [axes[0][0][1], testResult[0][0], 1],
            [axes[0][3][1], testResult[0][3], 1]
        ]
    }

    /**
     * Самооценка
     */
    function getSelfEsteemData(): [string, number, number][] {
        return [
            [axes[1][0][1], testResult[1][0], 1],
            [axes[1][4][1], testResult[1][4], 1],
            [axes[3][2][1], testResult[3][2], 1],
            [axes[4][3][1], testResult[4][3], 1],
            [axes[1][2][1], testResult[1][2], 1]
        ]
    }

    /**
     * Конфликтность
     */
    function getConflictData(): [string, number, number][] {
        return [
            [axes[0][4][0], testResult[0][4] * -1, 2],
            [axes[2][3][1], testResult[2][3], 1],
            [axes[3][1][1], testResult[3][1], 1],
            [axes[3][2][0], testResult[3][2] * -1, -1],
            [axes[1][1][1], testResult[1][1], 1]
        ]
    }

    /**
     * Склонность к депрессии
     */
    function getDepressionData(): [string, number, number][] {
        return [
            [axes[1][4][0], testResult[1][4] * -1, 1],
            [axes[1][0][0], testResult[1][0] * -1, 1],
            [axes[3][2][0], testResult[3][2] * -1, 1],
            [axes[0][0][1], testResult[0][0], 1],
            [axes[0][2][1], testResult[0][2], 1]
        ]
    }

    return {
        tablesWithBars: getTablesWithBars(),
        managementData: getManagementData(),
        teamSurvivalData: getTeamSurvivalData(),
        selfOrganizationData: getSelfOrganizationData(),
        loyaltyData: getLoyaltyData(),
        initiativeData: getInitiativeData(),
        learnabilityData: getLearnabilityData(),
        conformismData: getConformismData(),
        selfEsteemData: getSelfEsteemData(),
        conflictData: getConflictData(),
        depressionData: getDepressionData()
    }
}
