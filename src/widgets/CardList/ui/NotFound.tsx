import { Component } from 'react';
import cls from './CardList.module.css';

interface NotFoundProps {
  text: string;
}

export class NotFound extends Component<NotFoundProps> {
  render() {
    return (
      <p className={cls.notFound}>
        No cat with the name &quot;
        {this.props.text}
        &quot; found
      </p>
    );
  }
}
