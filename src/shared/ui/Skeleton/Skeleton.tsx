import { CSSProperties, FC } from 'react';
import cls from './Skeleton.module.css';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  border?: string;
}

export const Skeleton: FC<SkeletonProps> = (props) => {
  const { border, className, height, width } = props;

  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border,
  };

  const classes = [cls.skeleton, className].join(' ');

  return <div className={classes} style={styles} />;
};

Skeleton.displayName = 'Skeleton';
