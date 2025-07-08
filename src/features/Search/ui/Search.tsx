import { Button } from '@/shared';
import { Input } from '@/shared/ui/Input/Input';
import { Component, KeyboardEvent } from 'react';
import cls from './Search.module.css';

export class Search extends Component {
  typeEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(1);
    }
  };

  render() {
    return (
      <div className={cls.block}>
        <Input placeholder="Search" onKeyUp={this.typeEnter} />
        <Button className={cls.btn} variant="filled">
          Search
        </Button>
      </div>
    );
  }
}
