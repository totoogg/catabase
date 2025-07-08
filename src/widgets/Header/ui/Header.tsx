import { Component } from 'react';
import cls from './Header.module.css';

export class Header extends Component {
  render() {
    return (
      <div className={cls.Header}>
        <div className="wrapper">Header</div>
      </div>
    );
  }
}
