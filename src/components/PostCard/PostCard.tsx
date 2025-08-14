import Link from 'next/link';
import {IPostCard} from '@/utils/interfaces/posts';
import {postPathBySlug} from '@/utils/helpers/posts';

import FeaturedImage from '@/components/FeaturedImage';
import styles from './styles/PostCard.module.scss';

const PostCard = ({post, options = {}}: { post: IPostCard, options?: {} }) => {
  const {title, slug, featuredImage, isSticky = false} = post;
  let postThumbnailUrl = '';

  if (
    featuredImage !== undefined &&
    featuredImage.mediaDetails !== undefined &&
    featuredImage.mediaDetails.filteredSizes !== undefined
  ) {
    let thumbnailsData = featuredImage.mediaDetails.filteredSizes;

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
      postThumbnailUrl = thumbnails.post_thumbnail;
    }
  }

  return (
    <div className={styles.postCard}>
      <div className={styles.postCard__thumb}>
        {isSticky && <i className="postCard__sticky-icon"></i>}
        {featuredImage && (
          <FeaturedImage
            src={postThumbnailUrl}
            dangerouslySetInnerHTML={featuredImage.caption}
            width="240"
            height="240"
            srcSet=""
            alt={post.title}
          />
        )}
        <Link
          href={postPathBySlug(slug)}
          className={styles.postCard__overlay}
        >
          <span className="postCard__overlay-button btn btn--accent">Play</span>
        </Link>
      </div>
      <div className={styles.postCard__heading}>
        <Link
          href={postPathBySlug(slug)}
          className={styles.postCard__title}
        >
          {title}
        </Link>
        <div className="likes-info">
          <div className="likes-info__item">
            <svg className="icon" width="20px" height="20px">
              <use href="#smile"></use>
            </svg>
            {post.likes.up}
          </div>
          <div className="likes-info__item">
            <svg className="icon" width="20px" height="20px">
              <use href="#sad-smile"></use>
            </svg>
            {post.likes.down}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
