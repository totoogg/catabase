import { Component } from 'react';
import cls from './Skeleton.module.css';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  border?: string;
}

export class Skeleton extends Component<SkeletonProps> {
  render() {
    const { border, className, height, width } = this.props;
    const styles: React.CSSProperties = {
      width,
      height,
      borderRadius: border,
    };

    const classes = [cls.skeleton, className].join(' ');

    return <div className={classes} style={styles} />;
  }
}
