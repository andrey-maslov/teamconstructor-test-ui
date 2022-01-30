"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const UserResult_1 = require("./UserResult");
const utils_1 = require("./utils");
/**
 * Функция конструктор, возвращает ряд значений для характеристики взаимодействия внутри команды
 * Использование:
 * ```
 * import { Team } from "psychology"
 * const team = Team(testResultList)
 * team.profile // Психологический профиль команды:  ITendency[]
 * team.portrait // Психологический портрет команды:  IOctant[]
 * team.profileList
 * team.getCrossFunc // Кроссфункциональность команды: number
 * team.getInteraction
 * team.getEmotionalComp // Уровень эмоциональной совместимости: number
 * team.getLoyalty // Уровень лояльности внутри команды:  number
 * team.getLeadingMemberByType // Индекс октанта для определения лидера в данной специализации:  number
 * team.getCommitment
 * team.getDescIndexes
 * team.getNeedfulPsychoType // Психотип, которого не достает команде
 * team.getAllCandidates // Все кандидаты из пула, которых нет в команде: IMember[]
 * team.getCandidates // Кандидаты из пула, которые нужны команде согласно психологическим предпосылкам
 * team.getUnwanted // Работники команды, которые нежелательны в ней: IMember[] | null
 * ```
 * @returns
 * @param dataList - Массив результатов пользователей. (5х5)[]
 * @constructor
 */
function Team(dataList) {
    const resultList = dataList.map((member) => UserResult_1.UserResult(member));
    const membersCount = dataList.length;
    const profileList = resultList.map(result => result.profile);
    const portraitList = resultList.map(result => result.portrait);
    const profile = getTeamProfile();
    const portrait = getTeamPortrait();
    const maxSector = getMaxSectorSquare();
    const majorOctants = portrait.filter((item) => item.value >= maxSector * .3);
    /**
     * Психологический профиль команды
     */
    function getTeamProfile() {
        const avgValues = getAvgValues(profileList);
        return avgValues.map((value, i) => {
            return { index: i, value };
        });
    }
    /**
     * get psychological portrait of the team
     */
    function getTeamPortrait() {
        const avgValues = getAvgValues(portraitList);
        return avgValues.map((value, i) => {
            return { code: UserResult_1.octantCodeList[i], index: i, value };
        });
    }
    /**
     * Вычисления средних значений профиля и портрета команды из профилей и портретов участников
     */
    function getAvgValues(list) {
        const arrSum = [0, 0, 0, 0, 0, 0, 0, 0];
        list.forEach(item => {
            // eslint-disable-next-line functional/immutable-data
            arrSum.forEach((_val, i) => arrSum[i] += item[i].value);
        });
        return arrSum.map(item => {
            return +(item / membersCount).toFixed(1);
        });
    }
    /**
     * Get average value based on main tendencies of each member
     */
    function getTeamMaxIntensity() {
        const maxValues = profileList.map(profile => {
            const sorted = [...profile].sort((a, b) => b.value - a.value);
            return sorted[0].value;
        });
        return maxValues.reduce((a, b) => a + b) / membersCount;
    }
    /**
     * Get maximum fact (theoretical) value of sector square
     */
    function getMaxSectorSquare() {
        const sorted = [...portrait].sort((a, b) => (b.value - a.value));
        return sorted[0].value;
    }
    /**
     * Get cross-functionality value
     */
    function getCrossFunc() {
        if (maxSector === 0) {
            return -1;
        }
        const maxCircleSquare = maxSector * 8; // 8 -> number of octants in full circle
        const factCircleSquare = portrait.map(item => item.value).reduce((a, b) => a + b);
        return factCircleSquare / maxCircleSquare;
    }
    /**
     *
     */
    function getInteraction() {
        const allMaxValues = resultList.map(item => item.sortedOctants[0].value);
        const max = Math.max.apply(null, allMaxValues);
        const min = Math.min.apply(null, allMaxValues);
        return min / max;
    }
    /**
     * get emotion compatibility
     */
    function getEmotionalComp() {
        const values = portrait.map(octant => octant.value);
        const rightSum = values.slice(0, 4).reduce((a, b) => a + b);
        const leftSum = values.slice(4).reduce((a, b) => a + b);
        if (leftSum === 0) {
            return -1;
        }
        if (rightSum === 0) {
            return -1;
        }
        return (leftSum <= rightSum) ? leftSum / rightSum : rightSum / leftSum;
    }
    /**
     * get team loyalty
     */
    function getLoyalty() {
        const values = profile.map(item => item.value);
        const topSum = [values[0], values[1], values[7]].reduce((a, b) => a + b);
        const bottomSum = values.slice(3, 6).reduce((a, b) => a + b);
        if (bottomSum === 0) {
            return topSum / 0.1;
        }
        return topSum / bottomSum;
    }
    /**
     * @param typeInd (number from 1 to 8 of octants. Leader role equals Innovator type, for example)
     */
    function getLeadingMemberByType(typeInd) {
        const values = portraitList.map(octant => octant[typeInd].value);
        const max = Math.max.apply(null, values);
        return values.indexOf(max);
    }
    /**
     *
     */
    function getCommitment() {
        //list item = value of responsibility of one member from data block "Привязанность-отдельность"
        const respValsList = dataList.map(item => item[3][0]);
        return respValsList.reduce((a, b) => a + b);
    }
    /**
     * @return {number} list of number indexes for get especial descriptions from array
     */
    function getDescIndexes() {
        return portrait
            .filter(octant => octant.value >= maxSector / 2)
            .map(item => item.index);
    }
    /**
     *
     */
    function getNeedfulPsychoType() {
        const minorOctants = portrait.filter((item) => item.value < maxSector * .3);
        return minorOctants.map(item => item.index);
    }
    /**
     * get full list of potential candidates without psychological filters
     * @param poolMembers
     * @param teamMembers
     */
    function getAllCandidates(poolMembers, teamMembers) {
        const teamIdList = teamMembers.map(item => item.baseID);
        return poolMembers.filter(item => !teamIdList.includes(item.baseID));
    }
    /**
     *
     * @param teamSpecInd
     * @param allCandidates
     */
    function getCandidates(teamSpecInd, allCandidates) {
        const specsList = [['A1', 'A2', 'B1', 'B2', 'a1', 'a2', 'b1', 'b2'], ['A1', 'A2'], ['B1', 'B2'], ['a1', 'a2'], ['b1', 'b2']];
        const majorCodes = majorOctants.map(item => item.code);
        if (!isSmbNeeded(teamSpecInd, specsList)) {
            return null;
        }
        if (majorOctants.length === 8) {
            return null;
        }
        return allCandidates.filter(item => {
            const profile = utils_1.getPersonProfile(item.decData[1]);
            const portrait = utils_1.getPersonPortrait(profile);
            const sortedOctants = [...portrait].sort((a, b) => (b.value - a.value));
            if (!checkIntensity(profile)) {
                return false;
            }
            return ((majorCodes.includes(sortedOctants[0].code) && specsList[teamSpecInd].includes(sortedOctants[1].code))
                ||
                    (majorCodes.includes(sortedOctants[1].code) && specsList[teamSpecInd].includes(sortedOctants[0].code)));
        });
    }
    /**
     * Проверяет, не слишком ли расходится интенсивность кандидата и команды
     * @param memberProfile
     */
    function checkIntensity(memberProfile) {
        const teamMaxIntensity = getTeamMaxIntensity();
        const sortedMemberProfile = [...memberProfile].sort((a, b) => b.value - a.value);
        return !(sortedMemberProfile[0].value > teamMaxIntensity * 1.3 || sortedMemberProfile[0].value < teamMaxIntensity * .7);
    }
    /**
     * for getCandidate
     * @param specInd
     * @param specsList
     */
    function isSmbNeeded(specInd, specsList) {
        const majorOctantsCodes = majorOctants.map(item => item.code);
        if (majorOctantsCodes.includes(specsList[specInd][0]) && majorOctantsCodes.includes(specsList[specInd][1])) {
            const specOctants = majorOctants.filter(octant => octant.code === specsList[specInd][0] || octant.code === specsList[specInd][1]);
            const maxOctant = specOctants[0].value > specOctants[1].value ? specOctants[0] : specOctants[1];
            if (Math.abs(specOctants[0].value - specOctants[1].value) < maxOctant.value * .3) {
                return false;
            }
        }
        return true;
    }
    /**
     * Get unwanted members in the team ("white crow")
     * @param members
     */
    function getUnwanted(members) {
        return members.filter(item => !checkIntensity(utils_1.getPersonProfile(item.decData[1])));
    }
    return Object.freeze({
        profile,
        portrait,
        profileList,
        getCrossFunc,
        getInteraction,
        getEmotionalComp,
        getLoyalty,
        getLeadingMemberByType,
        getCommitment,
        getDescIndexes,
        getNeedfulPsychoType,
        getAllCandidates,
        getCandidates,
        getUnwanted
    });
}
exports.Team = Team;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvVGVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFRQSw2Q0FBMEQ7QUFDMUQsbUNBQThEO0FBRTlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFnQixJQUFJLENBQUMsUUFBdUM7SUFFMUQsTUFBTSxVQUFVLEdBQTJCLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLHVCQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN4RixNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQ3JDLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0QsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvRCxNQUFNLE9BQU8sR0FBRyxjQUFjLEVBQUUsQ0FBQztJQUNqQyxNQUFNLFFBQVEsR0FBRyxlQUFlLEVBQUUsQ0FBQztJQUNuQyxNQUFNLFNBQVMsR0FBRyxrQkFBa0IsRUFBRSxDQUFDO0lBQ3ZDLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFhLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBR3RGOztPQUVHO0lBQ0gsU0FBUyxjQUFjO1FBQ3JCLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBdUIsV0FBVyxDQUFDLENBQUM7UUFDbEUsT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2hDLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFF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