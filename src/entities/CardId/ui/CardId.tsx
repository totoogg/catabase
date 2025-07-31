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
    async function requestCard() {
      if (catId && !data) {
        setIsLoading(true);
        const res = await getCardById(catId);
        setData(res.res);
        setStatus(res.status);
        setIsLoading(false);
      }
    }
    requestCard();
  }, [catId, data]);

  if (isLoading) {
    return <SkeletonLoading />;
  }

  if (!data || !status) {
    return null;
  }

  if (status >= 400 && status <= 599) {
    return <div className={cls.error}>{data as string}</div>;
  }

  const { name, imageUrl } = data as CardTypes;

  const attribs = transformDataForCard(data as CardTypes, true);

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
