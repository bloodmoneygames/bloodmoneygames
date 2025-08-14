'use client';

import styles from './styles/GameHead.module.scss';
import {useMutation} from '@apollo/client';
import {MUTATION_CREATE_RATING} from '@/utils/data/create-rating';
import ReactStars from 'react-rating-stars-component';
import {Notify} from 'notiflix/build/notiflix-notify-aio';
import {FaStar, FaStarHalfAlt} from 'react-icons/fa';
import {useState, useEffect} from 'react';
import {ReactNode} from "react";
import {IPost} from "@/utils/interfaces/posts";
import Likes from "@/components/Likes";

type TGameHeadProps = {
  children: ReactNode,
  className?: string,
  title?: string,
  post: IPost,
  [x: string]: any;
}


const Header = ({children, post}: TGameHeadProps) => {
  /**
   * Rating
   */
  const [starsKey, setStarsKey] = useState(Math.random());
  const [canVote, setCanVote] = useState(false);

  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  const [createRating, {data}] = useMutation(MUTATION_CREATE_RATING);

  useEffect(() => {

    // Initial render stars rating
    const test = (localStorage.getItem('canVote' + post.postId) !== 'false');
    setTotal(post.rating.total);
    setCount(post.rating.count);
    setCanVote(test);
    setStarsKey(Math.random());

    if (data) {
      setTotal(data.createRating.rating.total);
      setCount(data.createRating.rating.count);
      setCanVote(false);
      localStorage.setItem('canVote' + post.postId, 'false');
      setStarsKey(Math.random());
      Notify.success('Voted success!');
    }

  }, [data, post]);

  /**
   * Handle the comment form submission.
   */
  async function handleRating(newVote: number) {
    await createRating({
      variables: {
        vote: newVote,
        postID: post.postId,
      }
    });
  }

  return (
    <div className={styles.gameHead}>
      {children}
      <div className={styles.gameHead__likes}>
        <Likes post={post} />
      </div>
      <div className={styles.gameHead__rating}>
        <ReactStars
          key={starsKey}
          count={5}
          value={(count > 0 && total > 0) ? (total / count) : 0}
          size={32}
          color={'rgb(255 255 255 / 50%)'}
          activeColor={'#faa71b'}
          onChange={handleRating}
          edit={canVote}
          emptyIcon={<FaStar/>}
          halfIcon={<FaStarHalfAlt/>}
          filledIcon={<FaStar/>}
        />
      </div>
    </div>
  );
};

export default Header;
