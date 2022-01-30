"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pair = void 0;
const UserResult_1 = require("./UserResult");
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
function Pair([data1, data2]) {
    const partner1 = UserResult_1.UserResult(data1);
    const partner2 = UserResult_1.UserResult(data2);
    const profile1 = partner1.profile;
    const profile2 = partner2.profile;
    const portrait1 = partner1.portrait;
    const portrait2 = partner2.portrait;
    const leadSegment1 = partner1.mainOctant;
    const leadSegment2 = partner2.mainOctant;
    const leftHemisphere = UserResult_1.octantCodeList.slice(0, 4);
    const rightHemisphere = UserResult_1.octantCodeList.slice(4);
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
        const commonIndex = UserResult_1.octantCodeList.indexOf(code);
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
exports.Pair = Pair;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvUGFpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFPQSw2Q0FBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsU0FBZ0IsSUFBSSxDQUFDLENBQUUsS0FBSyxFQUFFLEtBQUssQ0FBaUM7SUFFbEUsTUFBTSxRQUFRLEdBQWdCLHVCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsTUFBTSxRQUFRLEdBQWdCLHVCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsTUFBTSxRQUFRLEdBQXlCLFFBQVEsQ0FBQyxPQUFPLENBQUM7SUFDeEQsTUFBTSxRQUFRLEdBQXlCLFFBQVEsQ0FBQyxPQUFPLENBQUM7SUFDeEQsTUFBTSxTQUFTLEdBQXVCLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDeEQsTUFBTSxTQUFTLEdBQXVCLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDeEQsTUFBTSxZQUFZLEdBQVksUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNsRCxNQUFNLFlBQVksR0FBWSxRQUFRLENBQUMsVUFBVSxDQUFDO0lBRWxELE1BQU0sY0FBYyxHQUFHLDJCQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsRCxNQUFNLGVBQWUsR0FBRywyQkFBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVoRDs7T0FFRztJQUNILFNBQVMsb0JBQW9CO1FBRTNCLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDN0QsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUU3RCxJQUFJLE9BQU8sS0FBSyxDQUFDLElB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