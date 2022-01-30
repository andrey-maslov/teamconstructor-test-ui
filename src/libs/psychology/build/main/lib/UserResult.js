"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResult = exports.octantCodeList = void 0;
const utils_1 = require("./utils");
exports.octantCodeList = ['A1', 'A2', 'B1', 'B2', 'a1', 'a2', 'b1', 'b2'];
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
function UserResult(testResult, diff = .2) {
    const profile = utils_1.getPersonProfile(testResult);
    const portrait = utils_1.getPersonPortrait(profile);
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
exports.UserResult = UserResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlclJlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvVXNlclJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFPQSxtQ0FBNkQ7QUFFaEQsUUFBQSxjQUFjLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFFOUU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxTQUFnQixVQUFVLENBQUMsVUFBOEIsRUFBRSxJQUFJLEdBQUcsRUFBRTtJQUVsRSxNQUFNLE9BQU8sR0FBeUIsd0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDbEUsTUFBTSxRQUFRLEdBQXVCLHlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQy9ELE1BQU0sYUFBYSxHQUF1QixDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBRTNGOztPQUVHO0lBQ0gsU0FBUyxpQkFBaUI7UUFFeEIsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDbkYsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ3hEO1FBQ0QsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxTQUFTLGVBQWU7UUFFdEIsTUFBTSxhQUFhLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3BFLE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7UUFDckMsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtRQUNyQyw0Q0FBNEM7UUFFNUMsSUFBSSxNQUFNLEdBQUcsTUFBTSxHQUFHLElBQUksRUFBRTtZQUMxQixPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDeEQ7UUFDRCxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2pDLENBQUM7SUFFRCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbkIsT0FBTztRQUNQLFFBQVE7UUFDUixhQUFhO1FBQ2IsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDNUIsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUU7UUFDdkMsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFO0tBQ3BDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUF6Q0QsZ0NBeUNDIn0=