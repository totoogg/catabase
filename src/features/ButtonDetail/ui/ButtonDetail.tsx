import { Button } from '@/shared';
import { FC } from 'react';
import { useNavigate } from 'react-router';

interface ButtonDetailProps {
  link: string;
  className?: string;
}

export const ButtonDetail: FC<ButtonDetailProps> = ({ link, className }) => {
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(link);
  };

  return (
    <Button
      className={className}
      variant="filled"
      colorBtn="success"
      onClick={handleDetail}
    >
      Read more
    </Button>
  );
};
