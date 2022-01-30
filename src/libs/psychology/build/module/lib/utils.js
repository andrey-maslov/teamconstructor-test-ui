import { octantCodeList } from './UserResult';
/**
 * Отдает, в виде строки, описание в зависимости от интенсивности значения (value)
 * @param value - значение интенсивности
 * @param descList - список описаний из API
 */
export function getDescByRange(value, descList) {
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
/**
 * Отдает, в виде числового индекса, описание в зависимости от интенсивности значения (value)
 * @param value - значение интенсивности
 * @param descList - список описаний из API
 */
export function getIndexByRange(value, descList) {
    // eslint-disable-next-line functional/no-loop-statement
    for (let i = 0; i < descList.length; i++) {
        if (value > (descList[i].range[0]) && value <= (descList[i].range[1])) {
            return i;
        }
    }
    return -1;
}
/**
 * отдает ключевое описание в зависимости от интенсивности
 * @param value
 * @param results
 * @param range - брейкпоинты для сравнения с переданной интенсивностью. По умолчанию range = [.2, .5, .8] идентично [20%, 50%, 80%]
 */
export function getKeyResult(value, results, range = [.2, .5, .8]) {
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
/**
 * Функция обсчитывает результат пользователя вида 5х5
 * Словесные значения добавляются в программе с помощью маппинга в зависимости от языка
 * @param testResult
 * @returns Психологический профиль пользователя (8 тенденций, например тревожность, лабильность и далее).
 *
 */
export function getPersonProfile(testResult) {
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
/**
 * Функция обсчитывает результат пользователя вида 5х5
 * Словесные значения добавляются в программе с помощью маппинга в зависимости от языка
 * @param profile
 * @returns Психологический портрет пользователя (8 октант или секторов, например модник, консерватор и далее)
 */
export function getPersonPortrait(profile) {
    const codeList = octantCodeList;
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
/**
 * Какая вы знаменитость
 * @param octant
 * @param famousList - список знаменитостей из API
 * @param sex - пол пользователя
 * @param range - брейкпоинты для определения к конкретной интенсивности. По умолчанию [0, 42.35, 140, 1000]
 */
export function getFamous(octant, famousList, sex = 0, range = [0, 42.35, 140, 1000]) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFOUM7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxjQUFjLENBQUMsS0FBYSxFQUFFLFFBQW1CO0lBRS9ELElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNkLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztJQUVqQix3REFBd0Q7SUFDeEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2hELElBQUksS0FBSyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3JGLElBQUksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNoQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ1YsTUFBTTtTQUNQO0tBQ0Y7SUFDRCxNQUFNLE1BQU0sR0FBRyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFDakQsQ0FBQztBQUVEOzs7O0dB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