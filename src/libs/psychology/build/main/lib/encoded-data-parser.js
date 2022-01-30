"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsJsonString = exports.isBase64Browser = exports.validateDecodedData = exports.parseUrl = exports.getAndDecodeData = void 0;
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
function getAndDecodeData(key = 'encdata', encodedValue) {
    const value = encodedValue ? encodedValue.trim() : parseUrl(key);
    if (!value) {
        return {
            encoded: null,
            decoded: null,
            data: null
        };
    }
    const buff = Buffer.from(value, 'base64');
    const userDataString = buff.toString('ascii');
    if (!validateDecodedData(userDataString) || !IsJsonString(userDataString)) {
        return {
            encoded: null,
            decoded: null,
            data: null
        };
    }
    return {
        encoded: value,
        decoded: userDataString,
        data: JSON.parse(userDataString)
    };
}
exports.getAndDecodeData = getAndDecodeData;
/**
 * Парсит URL. Ключ по умолчанию = encdata
 * @param key - ключ query параметра
 */
function parseUrl(key = 'encdata') {
    let value = null;
    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        value = urlParams.get(key);
    }
    return value;
}
exports.parseUrl = parseUrl;
/**
 * Валидирует массивообразную строку 5x5 (с помощю регулярки) перед тем, как преобразовывать в массив значений
 * @param value - массив 5х5 преобразованный в строку
 */
function validateDecodedData(value) {
    const regex = /^\[\[([+-]?\d,?)+],\[(\[([+-]?\d,?){5}],?){5}\]\]$/;
    return value.search(regex) === 0;
}
exports.validateDecodedData = validateDecodedData;
/**
 * Проверка - является ли строка валидной base64 строкой. Работает только в браузере
 * @param str
 */
function isBase64Browser(str) {
    if (typeof window !== 'undefined') {
        try {
            return btoa(atob(str)) === str;
        }
        catch (err) {
            return false;
        }
    }
    return false;
}
exports.isBase64Browser = isBase64Browser;
/**
 * Проверка - можно ли строка валидной как json
 * @param str
 * @constructor
 */
function IsJsonString(str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.IsJsonString = IsJsonString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb2RlZC1kYXRhLXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZW5jb2RlZC1kYXRhLXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxTQUFnQixnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsU0FBUyxFQUFFLFlBQXFCO0lBRXJFLE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFakUsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNWLE9BQU87WUFDTCxPQUFPLEVBQUUsSUFBSTtZQUNiLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDO0tBQ0g7SUFFRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMxQyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTlDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUN6RSxPQUFPO1lBQ0wsT0FBTyxFQUFFLElBQUk7WUFDYixPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQztLQUNIO0lBRUQsT0FBTztRQUNMLE9BQU8sRUFBRSxLQUFLO1FBQ2QsT0FBTyxFQUFFLGNBQWM7UUFDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO0tBQ2pDLENBQUM7QUFDSixDQUFDO0FBNUJELDRDQTRCQztBQUVEOzs7R0FHRztBQUNILFNBQWdCLFFBQVEsQ0FBQyxHQUFHLEdBQUcsU0FBUztJQUN0QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDakIsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7UUFDakMsTUFBTSxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5RCxLQUFLLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUM1QjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQVBELDRCQU9DO0FBRUQ7OztHQUdHO0FBQ0gsU0FBZ0IsbUJBQW1CLENBQUMsS0FBYTtJQUMvQyxNQUFNLEtBQUssR0FBRyxvREFBb0QsQ0FBQztJQUNuRSxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFIRCxrREFHQztBQUVEOzs7R0FHRztBQUNILFNBQWdCLGVBQWUsQ0FBQyxHQUFXO0lBQ3pDLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO1FBQ2pDLElBQUk7WUFDRixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUM7U0FDaEM7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7S0FDRjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQVRELDBDQVNDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLFlBQVksQ0FBQyxHQUFXO0lBQ3RDLElBQUk7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2pCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLEtBQUssQ0FBQztLQUNkO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBUEQsb0NBT0MifQ==