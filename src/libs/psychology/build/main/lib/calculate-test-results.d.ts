import { AnswerType } from '../types/types';
/**
 * Функция возвращает массив из 5 массивов по 5 числовых значений (5х5).
 * Результат используется как базовый для дальнейших обсчетов.
 * @param answersArr - "сырой" результат теста из 75 значений
 * @returns массив 5х5
 */
export declare function calculateResults(answersArr: ReadonlyArray<AnswerType>): number[][];
