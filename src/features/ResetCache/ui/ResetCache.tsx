import { Button } from '@/shared';

export const ResetCache = () => {
  const handleClick = () => {
    console.log('reset');
  };

  return (
    <Button onClick={handleClick} variant="filled" colorBtn="normal">
      Reset Cache
    </Button>
  );
};
