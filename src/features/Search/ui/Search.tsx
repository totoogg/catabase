import { Button } from '@/shared';
import { Input } from '@/shared/ui/Input/Input';
import { Component, KeyboardEvent } from 'react';
import cls from './Search.module.css';

interface SearchProps {
  className?: string;
}

interface SearchState {
  value: string;
}

export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      value: '',
    };
  }

  typeEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(1);
    }
  };

  render() {
    const classes = [cls.block, this.props.className].join(' ');

    return (
      <div className={classes}>
        <Input
          value={this.state.value}
          placeholder="Search..."
          onKeyUp={this.typeEnter}
        />
        <Button className={cls.btn} variant="filled">
          Search
        </Button>
      </div>
    );
  }
}
