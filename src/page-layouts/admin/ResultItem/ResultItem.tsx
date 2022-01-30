import Link from 'next/link';
import { ResultItemType } from '../AdminLayout';
import style from '../admin.module.scss';
import {intervalToDuration, format} from 'date-fns';
import {encodeBase64} from "../../../helper/helper";

interface ResultItemProps {
  data: ResultItemType;
  number: number
}

export const ResultItem: React.FC<ResultItemProps> = ({ data,  number }) => {
  const { id, testResult, duration, email, tags, createdAt, fullName } = data;
  
  const time = intervalToDuration({ start: 0, end: parseInt(duration) || 0 })
  const formattedTime = `${time.hours}h:${time.minutes}min:${time.seconds}sec`
  const formattedDate = format(new Date(createdAt), 'dd.MM.yyyy / hh:mm a')
  const link = `/result?encdata=${testResult}&name=${encodeURIComponent(fullName)}`
  
  return (
    <div className={style.item}>
      <Link href={link}>
        <a className={style.link}>
          <span className={style.number}>{number}</span>
          <span className={style.email}>{email || fullName}</span>
          <span className={style.date}>{formattedDate}</span>
          <span className={style.duration}>{formattedTime}</span>
        </a>
      </Link>
    </div>
  );
};
