import { Component } from 'react';
import cls from './ErrorPageBoundary.module.css';

export class ErrorPageBoundary extends Component {
  render() {
    return <div className={cls.text}>Something went wrong!</div>;
  }
}
