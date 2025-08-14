'use client';

import {useEffect, useState} from "react";

import {ReactNode} from 'react';
import ClassName from '@/utils/models/classname';

import styles from './styles/Likes.module.scss';
import {useMutation} from "@apollo/client";
import {MUTATION_CREATE_LIKES} from "@/utils/data/create-likes";
import {Notify} from "notiflix/build/notiflix-notify-aio";
import {IPost} from "@/utils/interfaces/posts";

type TLikesProps = {
  className?: string,
  post: IPost,
}

const Likes = ({className, post}: TLikesProps) => {
  const likesClassName = new ClassName(styles.likes);
  likesClassName.addIf(className);

  const [voteUp, setVoteUp] = useState(0);
  const [voteDown, setVoteDown] = useState(0);
  const [canLike, setCanLike] = useState(false);

  const [createVote, {data}] = useMutation(MUTATION_CREATE_LIKES);

  useEffect(() => {
    const test = (localStorage.getItem('canVote' + post.postId) !== 'false');
    setVoteUp(post.likes.up);
    setVoteDown(post.likes.down);
    setCanLike(test);

    if (data && canLike) {
      setVoteUp(data.createLikes.likes.up);
      setVoteDown(data.createLikes.likes.down);
      setCanLike(false);
      localStorage.setItem('canVote' + post.postId, 'false');
      Notify.success('Voted success!');
    }
  }, [data, post, canLike]);

  /**
   * Handle the comment form submission.
   */
  async function handleLikes(newVote: number) {
    await createVote({
      variables: {
        vote: newVote,
        postID: post.postId,
      }
    });
  }

  return (
    <section className={likesClassName.toString()}>
      <button
        className={styles.likesItem}
        title="Like"
        onClick={(e)=>handleLikes(1)}
        {...(!canLike && {disabled: true})}
      >
        <svg className="icon" width="24px" height="24px">
          <use href="#likes-up"></use>
        </svg>
        <span>{voteUp || 0}</span>
      </button>
      <button
        className={styles.likesItem}
        title="Dislike"
        onClick={(e)=>handleLikes(-1)}
        {...(!canLike && {disabled: true})}
      >
        <svg className="icon" width="24px" height="24px">
          <use href="#likes-down"></use>
        </svg>
        <span>{voteDown || 0}</span>
      </button>
    </section>
  );
};

export default Likes;
