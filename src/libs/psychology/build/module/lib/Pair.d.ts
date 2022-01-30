import { baseTestResultType, IOctant, ITendency, IUserResult } from '../types/types';
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
export declare function Pair([data1, data2]: readonly baseTestResultType[]): Readonly<{
    partner1: IUserResult;
    partner2: IUserResult;
    profile1: readonly ITendency[];
    profile2: readonly ITendency[];
    portrait1: readonly IOctant[];
    portrait2: readonly IOctant[];
    leadSegment1: IOctant;
    leadSegment2: IOctant;
    getPartnerAcceptance: () => number;
    getUnderstanding: () => number;
    getAttraction: () => readonly number[];
    getLifeAttitudes: () => number;
    getSimilarityThinking: () => number;
    getPsyMaturity: () => readonly number[];
    getComplementarity: () => readonly number[];
}>;
