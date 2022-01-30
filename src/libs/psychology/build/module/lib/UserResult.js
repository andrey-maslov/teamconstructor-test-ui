import { getPersonPortrait, getPersonProfile } from './utils';
export const octantCodeList = ['A1', 'A2', 'B1', 'B2', 'a1', 'a2', 'b1', 'b2'];
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
export function UserResult(testResult, diff = .2) {
    const profile = getPersonProfile(testResult);
    const portrait = getPersonPortrait(profile);
    const sortedOctants = [...portrait].sort((a, b) => (b.value - a.value));
    /**
     *
     */
    function getMainPsychoType() {
        if (sortedOctants[0].value - sortedOctants[1].value < diff * sortedOctants[0].value) {
            return [sortedOctants[0].index, sortedOctants[1].index];
        }
        return [sortedOctants[0].index];
    }
    /**
     *
     */
    function getMainTendency() {
        const sortedProfile = [...profile].sort((a, b) => b.value - a.value);
        const value1 = sortedProfile[0].value;
        const value2 = sortedProfile[1].value;
        // difference between 1st and 2nd max values
        if (value1 - value2 < diff) {
            return [sortedProfile[0].index, sortedProfile[1].index];
        }
        return [sortedProfile[0].index];
    }
    return Object.freeze({
        profile,
        portrait,
        sortedOctants,
        mainOctant: sortedOctants[0],
        mainPsychoTypeList: getMainPsychoType(),
        mainTendencyList: getMainTendency()
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlclJlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvVXNlclJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFFN0QsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBRTlFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSxVQUFVLFVBQVUsQ0FBQyxVQUE4QixFQUFFLElBQUksR0FBRyxFQUFFO0lBRWxFLE1BQU0sT0FBTyxHQUF5QixnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNsRSxNQUFNLFFBQVEsR0FBdUIsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDL0QsTUFBTSxhQUFhLEdBQXVCLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFFM0Y7O09BRUc7SUFDSCxTQUFTLGlCQUFpQjtRQUV4QixJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUNuRixPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDeEQ7UUFDRCxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2pDLENBQUM7SUFFRDs7T0FFRztJQUNILFNBQVMsZUFBZTtRQUV0QixNQUFNLGFBQWEsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDcEUsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtRQUNyQyxNQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO1FBQ3JDLDRDQUE0QztRQUU1QyxJQUFJLE1BQU0sR0FBRyxNQUFNLEdBQUcsSUFBSSxFQUFFO1lBQzFCLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUN4RDtRQUNELE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDakMsQ0FBQztJQUVELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNuQixPQUFPO1FBQ1AsUUFBUTtRQUNSLGFBQWE7UUFDYixVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUM1QixrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRTtRQUN2QyxnQkFBZ0IsRUFBRSxlQUFlLEVBQUU7S0FDcEMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyJ9