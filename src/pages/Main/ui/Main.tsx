import { CardList } from '@/widgets';
import { Component } from 'react';
import cls from './Main.module.css';

export class Main extends Component {
  render() {
    return (
      <div className={cls.Main}>
        <div className="wrapper">
          <CardList />
        </div>
      </div>
    );
  }
}
