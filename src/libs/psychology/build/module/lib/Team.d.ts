import { baseTestResultType, IMember, IOctant, ITendency } from '../types/types';
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
export declare function Team(dataList: readonly baseTestResultType[]): Readonly<{
    profile: {
        index: number;
        value: number;
    }[];
    portrait: readonly IOctant[];
    profileList: (readonly ITendency[])[];
    getCrossFunc: () => number;
    getInteraction: () => number;
    getEmotionalComp: () => number;
    getLoyalty: () => number;
    getLeadingMemberByType: (typeInd: number) => number;
    getCommitment: () => number;
    getDescIndexes: () => readonly number[];
    getNeedfulPsychoType: () => readonly number[];
    getAllCandidates: (poolMembers: readonly IMember[], teamMembers: readonly IMember[]) => readonly IMember[];
    getCandidates: (teamSpecInd: number, allCandidates: readonly IMember[]) => readonly IMember[] | null;
    getUnwanted: (members: readonly IMember[]) => readonly IMember[];
}>;
