import { Component } from 'react';
import cls from './CardList.module.css';
import { Skeleton } from '@/shared';

export class SkeletonLoading extends Component {
  render() {
    return (
      <div className={cls.CardList}>
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <Skeleton height={400} width={250} key={i} />
          ))}
      </div>
    );
  }
}
