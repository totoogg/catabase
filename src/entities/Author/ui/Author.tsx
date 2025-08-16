import csl from './Author.module.css';
import { useTranslations } from 'next-intl';

export const Author = () => {
  const t = useTranslations('AboutPage');

  return (
    <div className={csl.author}>
      <h2>{t('titleAuthor')}</h2>
      <div className={csl.content}>
        <div className={csl.photo}></div>
        <div className={csl.text}>
          <h3>{t('nameAuthor')}</h3>
          <p>{t('skillAuthor')}</p>
          <p>{t('describeAuthor')}</p>
        </div>
      </div>
    </div>
  );
};
