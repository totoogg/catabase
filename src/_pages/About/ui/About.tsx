import { Author, School } from '@/entities';
import cls from './About.module.css';
import { Button, ThemeContext } from '@/shared';
import { ToggleTheme } from '@/features';
import { useContext } from 'react';
import Link from 'next/link';

export const About = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={[theme !== 'light' ? cls.moon : '', cls.About].join(' ')}>
      <div className="wrapper">
        <div className={cls.content}>
          <ToggleTheme />
          <Author />
          <School />
          <Link href="/" className={cls.link}>
            <Button variant="filled" colorBtn="success" className={cls.return}>
              Return to home page
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
