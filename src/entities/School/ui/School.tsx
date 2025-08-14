import Image from 'next/image';
import cls from './School.module.css';
import logo from '@/shared/assets/icons/rss-logo.svg';

export const School = () => {
  return (
    <div className={cls.school}>
      <a
        href="https://rs.school/react/"
        target="_blank"
        rel="noopener noreferrer"
        className={cls.link}
      >
        <Image priority src={logo} width={100} height={100} alt="logo" />
        <div>
          <h3>RS School React</h3>
          <p>Course on modern React development</p>
        </div>
      </a>
      <p>
        RS School is a free educational program with a practical focus. The
        course covers modern approaches to React development, including hooks,
        TypeScript, testing, and performance optimization.
      </p>
    </div>
  );
};
