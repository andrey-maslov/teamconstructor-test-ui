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
export function getAndDecodeData(key = 'encdata', encodedValue) {
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
/**
 * Парсит URL. Ключ по умолчанию = encdata
 * @param key - ключ query параметра
 */
export function parseUrl(key = 'encdata') {
    let value = null;
    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        value = urlParams.get(key);
    }
    return value;
}
/**
 * Валидирует массивообразную строку 5x5 (с помощю регулярки) перед тем, как преобразовывать в массив значений
 * @param value - массив 5х5 преобразованный в строку
 */
export function validateDecodedData(value) {
    const regex = /^\[\[([+-]?\d,?)+],\[(\[([+-]?\d,?){5}],?){5}\]\]$/;
    return value.search(regex) === 0;
}
/**
 * Проверка - является ли строка валидной base64 строкой. Работает только в браузере
 * @param str
 */
export function isBase64Browser(str) {
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
/**
 * Проверка - можно ли строка валидной как json
 * @param str
 * @constructor
 */
export function IsJsonString(str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb2RlZC1kYXRhLXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZW5jb2RlZC1kYXRhLXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsR0FBRyxHQUFHLFNBQVMsRUFBRSxZQUFxQjtJQUVyRSxNQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWpFLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDVixPQUFPO1lBQ0wsT0FBTyxFQUFFLElBQUk7WUFDYixPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQztLQUNIO0lBRUQsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDMUMsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU5QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDekUsT0FBTztZQUNMLE9BQU8sRUFBRSxJQUFJO1lBQ2IsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUM7S0FDSDtJQUVELE9BQU87UUFDTCxPQUFPLEVBQUUsS0FBSztRQUNkLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQztLQUNqQyxDQUFDO0FBQ0osQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxRQUFRLENBQUMsR0FBRyxHQUFHLFNBQVM7SUFDdEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO1FBQ2pDLE1BQU0sU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUQsS0FBSyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDNUI7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsS0FBYTtJQUMvQyxNQUFNLEtBQUssR0FBRyxvREFBb0QsQ0FBQztJQUNuRSxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsZUFBZSxDQUFDLEdBQVc7SUFDekMsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7UUFDakMsSUFBSTtZQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQztTQUNoQztRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osT0FBTyxLQUFLLENBQUM7U0FDZDtLQUNGO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxZQUFZLENBQUMsR0FBVztJQUN0QyxJQUFJO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNqQjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyJ9