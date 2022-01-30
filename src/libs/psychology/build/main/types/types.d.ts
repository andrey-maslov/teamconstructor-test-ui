/**
 * Результат калькуляции теста - 5х5
 */
export declare type baseTestResultType = readonly (readonly number[])[];
/**
 * Результат калькуляции теста + доп данные (пол, возраст, семейный статус)
 */
export declare type DecodedDataType = readonly [readonly number[], baseTestResultType];
export interface IDescWithRange {
    readonly desc: string;
    readonly range: readonly [number, number];
}
export interface IDescWithStatus {
    readonly title: string;
    readonly desc: string;
    readonly status: number;
}
export interface IDescList {
    readonly title: string;
    readonly options: readonly IDescWithRange[];
}
/**
 * Октант (сектор) психотипа. Например, лидер мнений или индивидуал
 * code - одно из значений [A1,A2,B1,B2,a1,a2,b1,b2]
 */
export interface IOctant {
    readonly code: string;
    readonly index: number;
    readonly value: number;
}
/**
 * Тенденция (полуось) психотипа. Например, лабильность или тревожность
 */
export interface ITendency {
    readonly index: number;
    readonly value: number;
}
/**
 * Участник команды для team constructor
 */
export interface IMember {
    readonly id: string;
    readonly name: string;
    readonly position: string;
    readonly decData: DecodedDataType;
    readonly baseID: number;
}
/**
 * Результат обсчета
 */
export interface IUserResult {
    readonly sortedOctants: readonly IOctant[];
    readonly profile: readonly ITendency[];
    readonly portrait: readonly IOctant[];
    readonly mainOctant: IOctant;
    readonly mainPsychoTypeList: readonly number[];
    readonly mainTendencyList: readonly number[];
}
/**
 * Один элемент сырого массива данных ответа теста
 */
export declare type AnswerType = {
    readonly id: string;
    readonly value: string;
};
/**
 * Результат работы функции, которая на входе получает закодированный (base64) результат теста,
 * а на выходе: закодированный, раскодированный (в виде строки и в виде массива)
 */
export interface IDecodedData {
    readonly encoded: string | null;
    readonly decoded: string | null;
    readonly data: DecodedDataType | null;
}
export interface IFamous {
    readonly person: string;
    readonly picture: string;
}
export declare type FamousList = readonly (readonly (readonly string[])[])[];
