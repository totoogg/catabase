import {
  AppImage,
  CardTypes,
  getCardById,
  transformDataForCard,
} from '@/shared';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import cls from './CardId.module.css';
import { SkeletonLoading } from './SkeletonLoading';

export const CardId = () => {
  const { catId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<CardTypes | null | string>(null);
  const [status, setStatus] = useState<number | null>(null);

  useEffect(() => {
    if (catId && !data) {
      setIsLoading(true);
      getCardById(catId).then((res) => {
        setData(res.res);
        setStatus(res.status);
        setIsLoading(false);
      });
    }
  }, [catId, data]);

  if (isLoading) {
    return <SkeletonLoading />;
  }

  if (status && (status < 0 || status > 399) && typeof data === 'string') {
    return <div className={cls.error}>{data}</div>;
  }

  if (!data || typeof data === 'string') {
    return null;
  }

  const { name, imageUrl } = data;

  const attribs = transformDataForCard(data, true);

  return (
    <div className={cls.content}>
      <AppImage
        className={cls.cardImage}
        src={imageUrl}
        alt={name}
        height="800"
      />
      <div className={cls.cardBlock}>
        {attribs.map((item) => (
          <p key={item.name}>
            <b>{item.name}:</b> <i>{item.value}</i>
          </p>
        ))}
      </div>
    </div>
  );
};
