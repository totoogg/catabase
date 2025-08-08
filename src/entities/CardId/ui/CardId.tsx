import {
  AppImage,
  CardTypes,
  ResError,
  transformDataForCard,
  transformError,
} from '@/shared';
import { useParams } from 'react-router';
import cls from './CardId.module.css';
import { SkeletonLoading } from './SkeletonLoading';
import { useGetCatByIdQuery } from '../model/slice/apiSliceWithCatById';

export const CardId = () => {
  const { catId } = useParams();

  const { data, isFetching, isError, error } = useGetCatByIdQuery(catId || '');

  if (isFetching) {
    return <SkeletonLoading />;
  }

  if (isError) {
    return (
      <div className={cls.error}>
        {transformError((error as ResError).status ?? '1')}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { name, imageUrl } = data as CardTypes;

  const attribs = transformDataForCard(data as CardTypes, true);

  return (
    <div className={cls.content}>
      <AppImage
        className={cls.cardImage}
        src={imageUrl}
        alt={name}
        height="800px"
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
