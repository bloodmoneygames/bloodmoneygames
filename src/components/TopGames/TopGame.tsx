import styles from './styles/TopGame.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import {IPostCard} from "@/utils/interfaces/posts";

import { postPathBySlug } from '@/utils/helpers/posts';

const TopGame = ({ post }: {post: IPostCard}) => {
    let featuredImageUrl = post.featuredImage ? post.featuredImage.sourceUrl : '';

    let postThumbnailUrl = '';

    if (
      post.featuredImage !== undefined &&
      post.featuredImage.mediaDetails !== undefined &&
      post.featuredImage.mediaDetails.filteredSizes !== undefined
    ) {
        let thumbnailsData = post.featuredImage.mediaDetails.filteredSizes;

        const thumbnails = thumbnailsData.reduce(
          (acc: {}, imageSize: { name: string, sourceUrl: string }): {[p:string]: string} => {
              let key = imageSize.name.replace(/-/g, '_');
              let url = imageSize.sourceUrl;

              return {
                  ...acc,
                  [key]: url
              }
          },
          {}
        );

        if (thumbnails.post_thumbnail !== undefined) {
            featuredImageUrl = thumbnails.post_thumbnail;
        }
    }

    return (
        <Link
            className={styles.topGame}
            href={postPathBySlug(post.slug)}
        >
            <span className={styles.topGame__thumb}>
                <Image
                    src={featuredImageUrl}
                    width="120"
                    height="120"
                    alt={post.title}
                />
            </span>
            <span className={styles.topGame__title}>{post.title}</span>
        </Link>
    );
};

export default TopGame;
