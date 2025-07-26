import { Author, School } from '@/entities';
import { Link } from 'react-router';
import cls from './About.module.css';
import { Button } from '@/shared';

export const About = () => {
  return (
    <div className={cls.About}>
      <div className="wrapper">
        <div className={cls.content}>
          <Author />
          <School />
          <Link to="/" className={cls.link}>
            <Button variant="filled" colorBtn="success" className={cls.return}>
              Return to home page
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
