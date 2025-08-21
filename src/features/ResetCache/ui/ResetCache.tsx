import { apiSlice, Button, useAppDispatch } from '@/shared';

export const ResetCache = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(apiSlice.util.resetApiState());
  };

  return (
    <Button onClick={handleClick} variant="filled" colorBtn="normal">
      Reset Cache
    </Button>
  );
};
