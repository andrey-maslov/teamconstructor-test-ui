import { baseTestResultType, FamousList, IDescList, IDescWithRange, IDescWithStatus, IFamous, IOctant, ITendency } from '../types/types';
/**
 * Отдает, в виде строки, описание в зависимости от интенсивности значения (value)
 * @param value - значение интенсивности
 * @param descList - список описаний из API
 */
export declare function getDescByRange(value: number, descList: IDescList): IDescWithStatus;
/**
 * Отдает, в виде числового индекса, описание в зависимости от интенсивности значения (value)
 * @param value - значение интенсивности
 * @param descList - список описаний из API
 */
export declare function getIndexByRange(value: number, descList: readonly IDescWithRange[]): number;
/**
 * отдает ключевое описание в зависимости от интенсивности
 * @param value
 * @param results
 * @param range - брейкпоинты для сравнения с переданной интенсивностью. По умолчанию range = [.2, .5, .8] идентично [20%, 50%, 80%]
 */
export declare function getKeyResult(value: number, results: readonly string[], range?: number[]): string;
/**
 * Функция обсчитывает результат пользователя вида 5х5
 * Словесные значения добавляются в программе с помощью маппинга в зависимости от языка
 * @param testResult
 * @returns Психологический профиль пользователя (8 тенденций, например тревожность, лабильность и далее).
 *
 */
export declare function getPersonProfile(testResult: baseTestResultType): readonly ITendency[];
/**
 * Функция обсчитывает результат пользователя вида 5х5
 * Словесные значения добавляются в программе с помощью маппинга в зависимости от языка
 * @param profile
 * @returns Психологический портрет пользователя (8 октант или секторов, например модник, консерватор и далее)
 */
export declare function getPersonPortrait(profile: readonly ITendency[]): readonly IOctant[];
/**
 * Какая вы знаменитость
 * @param octant
 * @param famousList - список знаменитостей из API
 * @param sex - пол пользователя
 * @param range - брейкпоинты для определения к конкретной интенсивности. По умолчанию [0, 42.35, 140, 1000]
 */
export declare function getFamous(octant: IOctant, famousList: FamousList, sex?: number, range?: number[]): IFamous | null;
