import { octantCodeList, UserResult } from './UserResult';
/**
 * Функция конструктор, возвращает ряд значений для характеристики взаимодействия двух пользователей
 * Возвращаемые значения ниже
 * Использование:
 * ```
 * import { Pair } from "psychology"
 * const pair = Pair([result1, result2])
 * pair.getPartnerAcceptance() // Принятие особенностей партнера
 * pair.getUnderstanding() // Взаимное понимание
 * pair.getAttraction() // Бессознательное притяжение
 * pair.getLifeAttitudes() // Сходство жизненных установок
 * pair.getSimilarityThinking() // Схожесть мышления
 * pair.getPsyMaturity() // Психологическая взрослость
 * pair.getComplementarity() // Дополняемость
 * pair.partner1 // полный результат первого из партнеров
 * pair.partner2 // полный результат второго из партнеров
 * pair.profile1
 * pair.profile2
 * pair.portrait1
 * pair.portrait2
 * pair.leadSegment1
 * pair.leadSegment2
 * ```
 * @param data1 - данные пользователя 1. Массив числовых данных 5х5
 * @param data2 - данные пользователя 2. Массив числовых данных 5х5
 * @constructor
 */
export function Pair([data1, data2]) {
    const partner1 = UserResult(data1);
    const partner2 = UserResult(data2);
    const profile1 = partner1.profile;
    const profile2 = partner2.profile;
    const portrait1 = partner1.portrait;
    const portrait2 = partner2.portrait;
    const leadSegment1 = partner1.mainOctant;
    const leadSegment2 = partner2.mainOctant;
    const leftHemisphere = octantCodeList.slice(0, 4);
    const rightHemisphere = octantCodeList.slice(4);
    /**
     * Принятие особенностей партнера
     */
    function getPartnerAcceptance() {
        const maxVal1 = profile1[partner1.mainTendencyList[0]].value;
        const maxVal2 = profile2[partner2.mainTendencyList[0]].value;
        if (maxVal1 === 0 || maxVal2 === 0) {
            return 0;
        }
        return (maxVal1 < maxVal2 ? maxVal1 / maxVal2 : maxVal2 / maxVal1);
    }
    /**
     * Взаимное понимание
     */
    function getUnderstanding() {
        let result = 1; // init result value
        const fraction = 0.125;
        portrait1.forEach((octant, i) => {
            if ((octant.value === 0 && portrait2[i].value !== 0)
                ||
                    (octant.value !== 0 && portrait2[i].value === 0)) {
                result -= fraction;
            }
        });
        return result;
    }
    /**
     * Бессознательное притяжение
     */
    function getAttraction() {
        const oppositeSegmentForUser1 = portrait2[getOppositeSegmentIndex(leadSegment1.code)];
        const oppositeSegmentForUser2 = portrait1[getOppositeSegmentIndex(leadSegment2.code)];
        const oppositeVals1 = [oppositeSegmentForUser1.value, leadSegment1.value];
        const oppositeVals2 = [oppositeSegmentForUser2.value, leadSegment2.value];
        if ((oppositeVals1[0] === 0 && oppositeVals1[1] === 0) || oppositeVals2[0] === 0 && oppositeVals2[1] === 0) {
            return [0, 0];
        }
        const ratio1 = oppositeVals1[0] < oppositeVals1[1] ? oppositeVals1[0] / oppositeVals1[1] : oppositeVals1[1] / oppositeVals1[0];
        const ratio2 = oppositeVals2[0] < oppositeVals2[1] ? oppositeVals2[0] / oppositeVals2[1] : oppositeVals2[1] / oppositeVals2[0];
        return [ratio1, ratio2];
    }
    /**
     * Находим индекс противоположного сегмента (октанта)
     * @param code
     */
    function getOppositeSegmentIndex(code) {
        //get place of out lead letter index in letter indexes list
        const commonIndex = octantCodeList.indexOf(code);
        if (commonIndex < 4) {
            return commonIndex + 4;
        }
        return commonIndex - 4;
    }
    /**
     * Сходство жизненных установок
     */
    function getLifeAttitudes() {
        const code1 = leadSegment1.code;
        const code2 = leadSegment2.code;
        //Ведущие сегменты совпадают: 100%'
        if (code1 === code2) {
            return 1;
        }
        //Ведущие сегменты в одной четверти: 50%'
        if (code1[0] === code2[0]) {
            return 0.5;
        }
        //Ведущие сегменты в одном полушарии: 25%
        if ((leftHemisphere.includes(code1) && leftHemisphere.includes(code2)) || (rightHemisphere.includes(code1) && rightHemisphere.includes(code2))) {
            return 0.25;
        }
        return 0;
    }
    /**
     * Схожесть мышления
     */
    function getSimilarityThinking() {
        const code1 = leadSegment1.code;
        const code2 = leadSegment2.code;
        //Ведущие сегменты совпадают или в одной четверти; 100%'
        if (code1 === code2 || code1[0] === code2[0]) {
            return 1;
        }
        //Ведущие сегменты в одном полушарии; 50%
        if ((leftHemisphere.includes(code1) && leftHemisphere.includes(code2)) || (rightHemisphere.includes(code1) && rightHemisphere.includes(code2))) {
            return 0.5;
        }
        return 0;
    }
    /**
     * Психологическая взрослость
     */
    function getPsyMaturity() {
        const value1 = portrait1.filter((octant) => octant.value !== 0);
        const value2 = portrait2.filter((octant) => octant.value !== 0);
        return [value1.length / 8, value2.length / 8];
    }
    /**
     * Дополняемость
     */
    function getComplementarity() {
        const indexOfSegment1 = leadSegment1.index;
        const indexOfSegment2 = leadSegment2.index;
        if (partner1.mainOctant.code === partner2.mainOctant.code) {
            return [indexOfSegment1];
        }
        return [indexOfSegment1, indexOfSegment2];
    }
    return Object.freeze({
        partner1,
        partner2,
        profile1,
        profile2,
        portrait1,
        portrait2,
        leadSegment1,
        leadSegment2,
        getPartnerAcceptance,
        getUnderstanding,
        getAttraction,
        getLifeAttitudes,
        getSimilarityThinking,
        getPsyMaturity,
        getComplementarity
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvUGFpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLFVBQVUsSUFBSSxDQUFDLENBQUUsS0FBSyxFQUFFLEtBQUssQ0FBaUM7SUFFbEUsTUFBTSxRQUFRLEdBQWdCLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxNQUFNLFFBQVEsR0FBZ0IsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELE1BQU0sUUFBUSxHQUF5QixRQUFRLENBQUMsT0FBTyxDQUFDO0lBQ3hELE1BQU0sUUFBUSxHQUF5QixRQUFRLENBQUMsT0FBTyxDQUFDO0lBQ3hELE1BQU0sU0FBUyxHQUF1QixRQUFRLENBQUMsUUFBUSxDQUFDO0lBQ3hELE1BQU0sU0FBUyxHQUF1QixRQUFRLENBQUMsUUFBUSxDQUFDO0lBQ3hELE1BQU0sWUFBWSxHQUFZLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDbEQsTUFBTSxZQUFZLEdBQVksUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUVsRCxNQUFNLGNBQWMsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsRCxNQUFNLGVBQWUsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWhEOztPQUVHO0lBQ0gsU0FBUyxvQkFBb0I7UUFFM0IsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUM3RCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FB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