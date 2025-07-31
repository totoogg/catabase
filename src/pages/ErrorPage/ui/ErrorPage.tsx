import { Button } from '@/shared';
import { useNavigate } from 'react-router';
import cls from './ErrorPage.module.css';

export const ErrorPage = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate(`/?page=1`);
  };

  return (
    <div className={cls.wrapper}>
      <h1>404 NotFound</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <Button variant="filled" colorBtn="success" onClick={handleHome}>
        Home page
      </Button>
    </div>
  );
};

ErrorPage.displayName = 'ErrorPage';
