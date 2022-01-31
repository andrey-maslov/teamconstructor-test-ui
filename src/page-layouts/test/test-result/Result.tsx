
import { useRouter } from 'next/router'
import Link from 'next/link';
import { useTranslation } from 'next-i18next'
import { getDescByRange, getFamous, UserResult, getAndDecodeData } from '../../../libs/psychology'
import { IUserResult, DecodedDataType } from '../../../libs/psychology/build/main/types/types'
import { useMediaPredicate } from 'react-media-hook'
import ChartRadar from './radar-chart/ChartRadar'
import TopBar from './top-bar/TopBar'
import Table from '../../../components/common/tables/table/Table'
import Box from '../../../components/common/box/Box'
import Famous from './famous/Famous'
import ShareResult from './share-result/ShareResult'
import {
    getModifiedSubAxes,
    getOctantFraction,
    getPortraitDesc,
    getPsychoTypeDesc,
    getProfileDesc,
    TablesWithBars
} from './functions'
import RobotQuestion from '../../../components/common/robots/robot-question/RobotQuestion'
import { TEST_THRESHOLD } from '../../../constants/constants'
import {decodeBase64, encodeDataForURL, isTestPassed} from '../../../helper/helper'
import allTerms from '../../../libs/terms.json'
import allDescriptions from '../../../libs/descriptions.json'


const Result = ({ testResult }) => {
    const router = useRouter()
    const { t } = useTranslation('common', 'test');
    const isXL = useMediaPredicate('(min-width: 1360px)')
  
    // parse url query params if it has encoded data string with default key encdata
    const dataFromUrl: DecodedDataType | null = getAndDecodeData(null, testResult).data

    // set test data for rendering the component
    const personalInfoForProfile = dataFromUrl ? dataFromUrl[0] : null
    const resultForProfile = dataFromUrl ? dataFromUrl[1] : null

    // encode all test data to base64 string for using in links
    const encDataForURL = encodeDataForURL([personalInfoForProfile, resultForProfile])
    const userName = router.query?.name || ''

    const terms = allTerms[router.locale]
    const descriptions = allDescriptions[router.locale]
  
    const isPassed = isTestPassed(resultForProfile, TEST_THRESHOLD)

    if (!resultForProfile || resultForProfile.length === 0) {
        return (
            <div className="flex-centered" style={{ padding: '3rem' }}>
                <Link href="/">
                    <a>
                        <h4>{t('test:errors.take_the_test')}</h4>
                    </a>
                </Link>
            </div>
        )
    }

    const modedSubAxes = getModifiedSubAxes(terms.subAxes)
    const fullProfile: IUserResult = UserResult(resultForProfile)
    const sex = personalInfoForProfile[2] === 2 ? 1 : personalInfoForProfile[2]
    const { sortedOctants, mainOctant, profile, mainPsychoTypeList } = fullProfile
    const {
        fullProfileList,
        tablesWithBarsTitles,
        famousList,
        psychoTypeList,
        complexDataSoft,
        tendencies
    } = descriptions
    const famous: { person: string; picture: string } | null = getFamous(
        mainOctant,
        famousList,
        sex
    )
    const tables = TablesWithBars(modedSubAxes, tablesWithBarsTitles, resultForProfile)
    const fullProfileData = getProfileDesc(
        fullProfileList,
        terms,
        getDescByRange,
        tables,
        resultForProfile,
        fullProfile
    )
    const portraitDesc = getPortraitDesc(mainOctant, complexDataSoft, fullProfileList)
    const psychoTypeDesc = getPsychoTypeDesc(sortedOctants, psychoTypeList) || ''
    const mainPsychoType: string = terms.psychoTypes[mainPsychoTypeList[0]]
    const secondaryPsychoType: string | null = mainPsychoTypeList[1]
        ? terms.psychoTypes[mainPsychoTypeList[1]]
        : null
    const secondaryPortraitDesc: string | null = mainPsychoTypeList[1]
        ? complexDataSoft[mainPsychoTypeList[1]][0][1]
        : null
    const mainOctantFraction: number = getOctantFraction(mainOctant, sortedOctants)
    const secondaryOctantFraction: number | null = secondaryPsychoType
        ? getOctantFraction(sortedOctants[1], sortedOctants)
        : null
    const accuracy = Math.round(
        (mainOctantFraction / (mainOctantFraction + secondaryOctantFraction)) * 100
    )

    const fpTableHeader = [t('test:result_page.main_features'), t('test:result_page.revealed')]

    if (!isPassed) {
        return (
            <div className="flex-centered center-xs" style={{ marginBottom: '6rem' }}>
                <div className="col-lg-8">
                    <div
                        style={{ display: 'flex', justifyContent: 'center', marginBottom: '4rem' }}>
                        <RobotQuestion />
                    </div>
                    <div style={{ fontSize: '1.4rem', marginBottom: '3rem' }}>
                        {t('test:errors.test_failed')}
                    </div>
                    <Link href="/questions">
                        <a className="btn btn-accent">{t('test:result_page.again')}</a>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div id="result">
          {userName ? (
            <h2>{decodeURIComponent(JSON.stringify(userName))}</h2>
          ) : (
            <div
              className="between-xs middle-xs"
              style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <h3>{t('test:result_page.title')}</h3>
              <Link href="/questions">
                <a className="btn btn-outlined" style={{ marginBottom: '1rem' }}>
                  {t('test:result_page.again')}
                </a>
              </Link>
            </div>
          )}
            <Box>
                <TopBar
                    title={t('test:result_page.your_profile')}
                    userResult={profile.map((item, i) => [terms.tendencies[i], item.value])}
                    details={tendencies}
                    fullTestResult={[personalInfoForProfile, resultForProfile]}
                />
                <div className="row middle-xs">
                    <div className="col-lg-7">
                        <ChartRadar profile={fullProfile.profile} chartLabels={terms.tendencies} />
                    </div>
                    <div className="col-lg-5">
                        {famous && (
                            <Famous
                                person={famous.person}
                                imgName={famous.picture}
                                desc={psychoTypeDesc}
                            />
                        )}
                    </div>
                </div>
            </Box>

            <Box className="result-box full-profile">
                <h4>{t('test:result_page.psychological_portrait')}</h4>
                {secondaryPortraitDesc ? (
                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '1.2rem', marginBottom: '.5rem' }}>
                            {`${t('test:result_page.your_main_type')} `}
                            <strong>
                                {mainPsychoType} ({(mainOctantFraction * 100).toFixed(1)}%)
                            </strong>
                            {`, ${t('test:result_page.sec_type')} `}
                            <strong>
                                {`${secondaryPsychoType} ${(secondaryOctantFraction * 100).toFixed(
                                    1
                                )}%`}
                            </strong>
                        </div>
                        <div style={{ fontSize: '1.2rem', marginBottom: '.5rem' }}>
                            {`${t('test:result_page.main_type_desc')}:`}
                        </div>
                    </div>
                ) : (
                    <div className="pb-sm">
                        <div style={{ fontSize: '1.2rem' }}>
                            {`${t('test:result_page.your_type')} - `}
                            <strong>{mainPsychoType}</strong>
                        </div>
                    </div>
                )}
                <Table
                    tableData={portraitDesc.map(item => [
                        item[0],
                        <span dangerouslySetInnerHTML={{ __html: item[1] }} key={item[0]} />
                    ])}
                    tableHeader={fpTableHeader}
                    addClasses={['striped', 'large']}
                />
                {secondaryPortraitDesc && (
                    <>
                        <div
                            style={{
                                fontSize: '1.2rem',
                                marginBottom: '.5rem',
                                marginTop: '2rem'
                            }}>
                            {`${t('test:result_page.sec_type_desc')}:`}
                        </div>
                        <p>{secondaryPortraitDesc}</p>
                    </>
                )}
            </Box>

            <Box className="result-box full-profile">
                <h4>{t('test:result_page.psychological_profile_desc')}</h4>
                <div className="row justify-content-between">
                    {isXL ? (
                        [fullProfileData.slice(0, 11), fullProfileData.slice(11)].map(
                            (tablePart, index) => {
                                return (
                                    <div className="col-xl-6" key={index}>
                                        <Table
                                            tableData={tablePart}
                                            tableHeader={fpTableHeader}
                                            addClasses={['striped']}
                                        />
                                    </div>
                                )
                            }
                        )
                    ) : (
                        <Table
                            tableData={fullProfileData}
                            tableHeader={fpTableHeader}
                            addClasses={['striped']}
                        />
                    )}
                </div>
            </Box>
        </div>
    )
}

export default Result
