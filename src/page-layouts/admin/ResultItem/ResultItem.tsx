import { useState } from 'react';
import Link from 'next/link';
import { ResultItemType } from '../AdminLayout';
import style from './result-item.module.scss';
import { intervalToDuration, format } from 'date-fns';
import { encodeBase64 } from '../../../helper/helper';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import ChartRadar from '../../test/test-result/radar-chart/ChartRadar';
import { DecodedDataType, IUserResult } from '../../../libs/psychology/build/main/types/types';
import { getAndDecodeData, UserResult } from '../../../libs/psychology';
import allTerms from './../../../libs/terms.json';
import { useRouter } from 'next/router';

interface ResultItemProps {
  data: ResultItemType;
  number: number;
}

export const ResultItem: React.FC<ResultItemProps> = ({ data, number }) => {
  const router = useRouter();

  const { id, testResult, duration, email, fullName, createdAt } = data;

  const time = intervalToDuration({ start: 0, end: parseInt(duration) || 0 });
  const formattedTime = `${time.hours}h:${time.minutes}min:${time.seconds}sec`;
  const formattedDate = format(new Date(createdAt), 'dd.MM.yyyy / hh:mm a');
  const link = `/result?encdata=${testResult}&name=${encodeURIComponent(fullName)}`

  const [isExpanded, setExpanded] = useState(false);

  const decodedData: DecodedDataType | null = getAndDecodeData(null, testResult).data;
  const resultForProfile = decodedData?.[1] || null;
  const fullProfile: IUserResult = UserResult(resultForProfile);

  const terms = allTerms[router.locale];

  return (
    <div className={style.item}>
      <div className={style.info}>
        <span className={style.number}>{number}</span>
        <Link href={link}>
          <a className={style.email}>{fullName}</a>
        </Link>
        <span className={style.date}>{formattedDate}</span>
        <span className={style.duration}>{formattedTime}</span>
        <button className={style.showBtn} onClick={() => setExpanded(!isExpanded)}>
          {isExpanded ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>

      {isExpanded && (
        <div className={style.content}>
          <ChartRadar profile={fullProfile.profile} chartLabels={terms.tendencies} />
        </div>
      )}
    </div>
  );
};
