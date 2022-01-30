import { baseTestResultType, IUserResult } from '../types/types';
export declare const octantCodeList: string[];
/**
 * Функция конструктор, возвращает ряд базовых значений для характеристики пользователя
 * Использование:
 * ```
 * import { UserResult } from "psychology"
 * const user = UserResult(testResultList)
 * user.profile // Психологический профиль пользователя:  ITendency[]
 * user.portrait // психологический портрет пользователя:  IOctant[]
 * user.sortedOctants // список октант портрета пользователя, сортированный по полю value (max -> min): IOctant[]
 * user.mainOctant // октант (сектор портрета) с максимальным значением value:  IOctant
 * user.mainPsychoTypeList // массив числовых значений (поле index) основных октант пользователя. Максимальная + вторая, если она не менее чем на  20% отличаются от первой по полю value. Опциональный параметр diff (default = .2)
 * user.mainTendencyList // массив числовых значений (поле index) основных тенденций пользователя. Максимальная + вторая, если она не менее чем на  20% отличаются от первой по полю value. Опциональный параметр diff (default = .2)
 * ```
 * @param testResult
 * @param diff - для определения списка главных тенденций и психотипов. По умолчанию = .2 (20%). Для списка берется тенденция (или октант) с максимальным значением value и те, следующие за ним, значение которых менее чем на 20% отличается от главной.
 * @constructor
 */
export declare function UserResult(testResult: baseTestResultType, diff?: number): IUserResult;
