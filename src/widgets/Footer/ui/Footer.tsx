import { Component } from 'react';
import cls from './Footer.module.css';
import { BugButton } from '@/features';

export class Footer extends Component {
  render() {
    return (
      <div className={cls.Footer}>
        <div className={['wrapper', cls.wrapper].join(' ')}>
          <BugButton />
        </div>
      </div>
    );
  }
}
