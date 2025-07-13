import { Component } from 'react';
import ImageError from '../../assets/icons/imgError.svg';
import cls from './Image.module.css';
import { Skeleton } from '../Skeleton/Skeleton';

interface ImageProps {
  src: string;
  alt: string;
  height: string;
}

interface ImageState {
  isLoading: boolean;
  hasError: boolean;
}

export class AppImage extends Component<ImageProps, ImageState> {
  constructor(props: ImageProps) {
    super(props);
    this.state = {
      isLoading: false,
      hasError: false,
    };
  }

  componentDidMount() {
    const { src } = this.props;
    const image = new Image();

    image.src = src ?? '';

    image.onload = () => {
      this.setState({
        isLoading: true,
      });
    };
    image.onerror = () => {
      this.setState({
        isLoading: true,
        hasError: true,
      });
    };
  }

  render() {
    if (!this.state.isLoading) {
      return <Skeleton width={250} height={250} />;
    }

    if (this.state.hasError) {
      return (
        <div className={cls.Image}>
          <ImageError />
        </div>
      );
    }
    const { alt, src, height } = this.props;

    return <img className={cls.Image} height={height} src={src} alt={alt} />;
  }
}
