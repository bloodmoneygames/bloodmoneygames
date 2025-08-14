"use client"

import styles from './styles/CommentForm.module.scss';
import {useMutation} from "@apollo/client";
import {loadErrorMessages, loadDevMessages} from '@apollo/client/dev';

if (process.env.NODE_ENV !== 'production') {
  loadErrorMessages();
  loadDevMessages();
}

import {MUTATION_CREATE_COMMENT} from '@/utils/data/create-comment';

import {useState} from 'react'

/**
 * The comment form component.
 */
const CommentForm = ({postId}: {postId: string}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState('')

  const [createComment, {data, loading, error}] = useMutation(MUTATION_CREATE_COMMENT, {
    variables: {
      name: name,
      email: email,
      comment: comment,
      postID: postId,
    }
  });

  /**
   * Handle the comment form submission.
   */
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault()

    // Create the comment and await the status.
    await createComment({
      variables: {
        name,
        email,
        comment,
        postId
      }
    })

    // If the comment was created successfully...
    if (data) {
      // Clear the form.
      setName('')
      setEmail('')
      setComment('')

      // Set the status message.
      setStatus(
        `Thank you ${name}! Your comment has been submitted and is awaiting moderation.`
      )
    }
  }

  return (
    <div className={styles.commentForm}>
      <form className={styles.commentFormInner} onSubmit={handleSubmit}>
        <div className={`${styles.commentFormRow} ${styles.commentFormRowMessage}`}>
          <textarea
            id="comment"
            onChange={(e) => setComment(e.target.value)}
            required
            value={comment}
            className="textarea"
            placeholder="Comment"
            aria-label="Enter your message"
          ></textarea>
        </div>
        <div className={styles.commentFormRow}>
          <input
            id="name"
            onChange={(e) => setName(e.target.value)}
            required
            type="text"
            value={name}
            className="input"
            placeholder="Name"
            aria-label="Enter your name"
          />
        </div>
        <div className={styles.commentFormRow}>
          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            required
            type="email"
            value={email}
            className="input"
            placeholder="Email"
            aria-label="Enter your email"
          />
        </div>
        <div className={`${styles.commentFormRow} ${styles.commentFormRowSubmit}`}>
          <button
            type="submit"
            className="{`${styles.commentFormRowButton}`} btn btn--accent"
          >
            Submit
          </button>
          <div className={styles.commentFormResult}>
            {loading && (
              <p>Submitting...</p>
            )}
            {error && (
              <p>{error.message}</p>
            )}
            {status && (
              <p>{status}</p>
            )}
          </div>
        </div>
        <label htmlFor="comment-accept" className={styles.commentFormAccept}>
          <input type="checkbox" className="form-check-input" id="comment-accept"/>
          Save my name, email, and website in this browser for the next time I comment.
        </label>
      </form>
    </div>
  )
}

export default CommentForm;