import { Button, LOCAL_SEARCH } from '@/shared';
import { Input } from '@/shared/ui/Input/Input';
import { Component, KeyboardEvent } from 'react';
import cls from './Search.module.css';

interface SearchProps {
  className?: string;
}

interface SearchState {
  value: string;
}

interface LocalStorageChangedEvent extends Event {
  newValue: string;
}

export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    const local = localStorage.getItem(LOCAL_SEARCH) ?? '';
    this.setState({ value: local });
  }

  saveLocal = () => {
    const event = new Event('localStorageChanged') as LocalStorageChangedEvent;
    event.newValue = this.state.value;
    window.dispatchEvent(event);
  };

  getValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  typeEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.saveLocal();
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
          onChange={this.getValue}
        />
        <Button className={cls.btn} variant="filled" onClick={this.saveLocal}>
          Search
        </Button>
      </div>
    );
  }
}
