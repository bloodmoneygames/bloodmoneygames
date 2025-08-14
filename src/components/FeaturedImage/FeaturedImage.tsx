import ClassName from '@/utils/models/classname';

// import Image from '@/components/Image';
import Image from 'next/image';

import styles from './styles/FeaturedImage.module.scss';

type TFeaturedImageProps = {
  src: string
  className?: string
  alt: string,
  [propName: string]: any
}
const FeaturedImage = ({ className = "", alt, ...rest }: TFeaturedImageProps) => {
  const featuredImageClassName = new ClassName(styles.featuredImage);

  featuredImageClassName.addIf(className);

  return <Image
    className={featuredImageClassName.toString()}
    alt={alt} {...rest}
  />;
};

export default FeaturedImage;
