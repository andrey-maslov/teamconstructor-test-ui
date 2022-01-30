import { IDecodedData } from '../types/types';
/**
 * Функция получает закодированный в base64 результат теста (5х5) либо
 * достает значение из URL.
 * Так же проходит валидация входного значения на соответствие base64 и стандартному типу для результата
 * Возвращает объект из трех значений:
 * ```
 * {
 *   encoded: исходное значение,
 *   decoded: раскодированный массив в виде строки,
 *   data: раскодированный массив
 * }
 * ```
 * Если входное значение невалидно, то возвращает объект, в котором значения равны null
 * @param key - ключ query параметра
 * @param encodedValue - зашифрованный в base64 массив данных (5х5), предварительно преобразованный в строку
 */
export declare function getAndDecodeData(key?: string, encodedValue?: string): IDecodedData;
/**
 * Парсит URL. Ключ по умолчанию = encdata
 * @param key - ключ query параметра
 */
export declare function parseUrl(key?: string): string | null;
/**
 * Валидирует массивообразную строку 5x5 (с помощю регулярки) перед тем, как преобразовывать в массив значений
 * @param value - массив 5х5 преобразованный в строку
 */
export declare function validateDecodedData(value: string): boolean;
/**
 * Проверка - является ли строка валидной base64 строкой. Работает только в браузере
 * @param str
 */
export declare function isBase64Browser(str: string): boolean;
/**
 * Проверка - можно ли строка валидной как json
 * @param str
 * @constructor
 */
export declare function IsJsonString(str: string): boolean;
