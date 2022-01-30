import { octantCodeList, UserResult } from './UserResult';
import { getPersonPortrait, getPersonProfile } from './utils';
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
export function Team(dataList) {
    const resultList = dataList.map((member) => UserResult(member));
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
            return { code: octantCodeList[i], index: i, value };
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
            const profile = getPersonProfile(item.decData[1]);
            const portrait = getPersonPortrait(profile);
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
        return members.filter(item => !checkIntensity(getPersonProfile(item.decData[1])));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvVGVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxPQUFPLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFOUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILE1BQU0sVUFBVSxJQUFJLENBQUMsUUFBdUM7SUFFMUQsTUFBTSxVQUFVLEdBQTJCLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3hGLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7SUFDckMsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3RCxNQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9ELE1BQU0sT0FBTyxHQUFHLGNBQWMsRUFBRSxDQUFDO0lBQ2pDLE1BQU0sUUFBUSxHQUFHLGVBQWUsRUFBRSxDQUFDO0lBQ25DLE1BQU0sU0FBUyxHQUFHLGtCQUFrQixFQUFFLENBQUM7SUFDdkMsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQWEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFHdEY7O09BRUc7SUFDSCxTQUFTLGNBQWM7UUFDckIsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUF1QixXQUFXLENBQUMsQ0FBQztRQUNsRSxPQUFPLFNBQVMs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