import { Component } from 'react';
import cls from './Header.module.css';
import { Search } from '@/features';

export class Header extends Component {
  render() {
    return (
      <div className={cls.Header}>
        <div className="wrapper">
          <Search />
        </div>
      </div>
    );
  }
}
