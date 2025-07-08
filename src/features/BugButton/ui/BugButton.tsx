import { Button } from '@/shared';
import { Component } from 'react';
import cls from './BugButton.module.css';

interface BugButtonProps {
  text?: string;
}

interface BugButtonState {
  error: boolean;
}

export class BugButton extends Component<BugButtonProps, BugButtonState> {
  constructor(props: BugButtonProps) {
    super(props);
    this.state = { error: false };
  }

  componentDidUpdate(): void {
    if (this.state.error) {
      throw new Error();
    }
  }

  throwError = () => {
    this.setState({ error: true });
  };

  render() {
    return (
      <Button
        onClick={this.throwError}
        className={cls.btn}
        variant="filled"
        colorBtn="error"
      >
        {this.props.text ?? 'Error'}
      </Button>
    );
  }
}
