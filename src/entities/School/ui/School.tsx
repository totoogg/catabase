import cls from './School.module.css';
import { useTranslations } from 'next-intl';

export const School = () => {
  const t = useTranslations('AboutPage');

  return (
    <div className={cls.school}>
      <a
        href="https://rs.school/react/"
        target="_blank"
        rel="noopener noreferrer"
        className={cls.link}
      >
        <div className={cls.logo}></div>
        <div>
          <h3>{t('titleSchool')}</h3>
          <p>{t('titleDescribe')}</p>
        </div>
      </a>
      <p>{t('describeSchool')}</p>
    </div>
  );
};
