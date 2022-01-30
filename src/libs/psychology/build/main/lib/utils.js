"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFamous = exports.getPersonPortrait = exports.getPersonProfile = exports.getKeyResult = exports.getIndexByRange = exports.getDescByRange = void 0;
const UserResult_1 = require("./UserResult");
/**
 * Отдает, в виде строки, описание в зависимости от интенсивности значения (value)
 * @param value - значение интенсивности
 * @param descList - список описаний из API
 */
function getDescByRange(value, descList) {
    let desc = '';
    let index = null;
    // eslint-disable-next-line functional/no-loop-statement
    for (let i = 0; i < descList.options.length; i++) {
        if (value > (descList.options[i].range[0]) && value <= (descList.options[i].range[1])) {
            desc = descList.options[i].desc;
            index = i;
            break;
        }
    }
    const status = index === 0 ? 0 : (index === descList.options.length ? 2 : 1);
    return { title: descList.title, desc, status };
}
exports.getDescByRange = getDescByRange;
/**
 * Отдает, в виде числового индекса, описание в зависимости от интенсивности значения (value)
 * @param value - значение интенсивности
 * @param descList - список описаний из API
 */
function getIndexByRange(value, descList) {
    // eslint-disable-next-line functional/no-loop-statement
    for (let i = 0; i < descList.length; i++) {
        if (value > (descList[i].range[0]) && value <= (descList[i].range[1])) {
            return i;
        }
    }
    return -1;
}
exports.getIndexByRange = getIndexByRange;
/**
 * отдает ключевое описание в зависимости от интенсивности
 * @param value
 * @param results
 * @param range - брейкпоинты для сравнения с переданной интенсивностью. По умолчанию range = [.2, .5, .8] идентично [20%, 50%, 80%]
 */
function getKeyResult(value, results, range = [.2, .5, .8]) {
    if (value < range[0]) {
        return results[0];
    }
    else if (value >= range[0] && value < range[1]) {
        return results[1];
    }
    else if (value >= range[1] && value < range[2]) {
        return results[2];
    }
    else {
        return results[3];
    }
}
exports.getKeyResult = getKeyResult;
/**
 * Функция обсчитывает результат пользователя вида 5х5
 * Словесные значения добавляются в программе с помощью маппинга в зависимости от языка
 * @param testResult
 * @returns Психологический профиль пользователя (8 тенденций, например тревожность, лабильность и далее).
 *
 */
function getPersonProfile(testResult) {
    const values = testResult.map(item => {
        let pos = 0;
        let neg = 0;
        item.forEach(value => {
            if (value > 0) {
                pos += value;
            }
            else {
                neg += value * -1;
            }
        });
        return [neg, pos];
    });
    return [
        { index: 0, value: values[1][0] },
        { index: 1, value: values[4][0] },
        { index: 2, value: values[0][0] },
        { index: 3, value: values[2][1] },
        { index: 4, value: values[1][1] },
        { index: 5, value: values[4][1] },
        { index: 6, value: values[0][1] },
        { index: 7, value: values[2][0] }
    ];
}
exports.getPersonProfile = getPersonProfile;
/**
 * Функция обсчитывает результат пользователя вида 5х5
 * Словесные значения добавляются в программе с помощью маппинга в зависимости от языка
 * @param profile
 * @returns Психологический портрет пользователя (8 октант или секторов, например модник, консерватор и далее)
 */
function getPersonPortrait(profile) {
    const codeList = UserResult_1.octantCodeList;
    const axisValues = profile.map(item => item.value);
    const axisValuesReversed = [...axisValues].reverse();
    // sinus of 45 degrees
    const sin45 = 0.7071;
    const octantsValues = [];
    // eslint-disable-next-line functional/no-loop-statement
    for (let i = 0; i < axisValuesReversed.length; i++) {
        if (i === axisValues.length - 1) {
            // eslint-disable-next-line functional/immutable-data
            octantsValues.unshift(axisValuesReversed[i] * axisValuesReversed[0] * sin45 / 2);
            break;
        }
        // eslint-disable-next-line functional/immutable-data
        octantsValues.push(axisValuesReversed[i] * axisValuesReversed[i + 1] * sin45 / 2);
    }
    //octant names begin with aggression and go in reverse order. So, change order values
    const swappedValues = [...octantsValues.slice(4), ...octantsValues.slice(0, 4)];
    return swappedValues.map((value, i) => {
        return { code: codeList[i], index: i, value: Number(value.toFixed(2)) };
    });
}
exports.getPersonPortrait = getPersonPortrait;
/**
 * Какая вы знаменитость
 * @param octant
 * @param famousList - список знаменитостей из API
 * @param sex - пол пользователя
 * @param range - брейкпоинты для определения к конкретной интенсивности. По умолчанию [0, 42.35, 140, 1000]
 */
function getFamous(octant, famousList, sex = 0, range = [0, 42.35, 140, 1000]) {
    //sex: 0 - male, 1 - female, 2 - some else
    const value = octant.value;
    if (value < range[0] || value > range[3]) {
        return null;
    }
    if (value >= range[0] && value < range[1]) {
        return {
            person: famousList[octant.index][0][sex],
            picture: `${octant.index}_0_${sex}`
        };
    }
    else if (value >= range[1] && value < range[2]) {
        return {
            person: famousList[octant.index][1][sex],
            picture: `${octant.index}_1_${sex}`
        };
    }
    return {
        person: famousList[octant.index][2][sex],
        picture: `${octant.index}_2_${sex}`
    };
}
exports.getFamous = getFamous;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVNBLDZDQUE4QztBQUU5Qzs7OztHQUlHO0FBQ0gsU0FBZ0IsY0FBYyxDQUFDLEtBQWEsRUFBRSxRQUFtQjtJQUUvRCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7SUFDZCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7SUFFakIsd0RBQXdEO0lBQ3hELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNoRCxJQUFJLEtBQUssR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNyRixJQUFJLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDaEMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNWLE1BQU07U0FDUDtLQUNGO0lBQ0QsTUFBTSxNQUFNLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO0FBQ2pELENBQUM7QUFmRCx3Q0FlQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixlQUFl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