import { gql } from '@apollo/client';

/**
 * Create a rating.
 */
export const MUTATION_CREATE_LIKES = gql`
  mutation createLikes (
    $vote: Int!
    $postID: Int!
  ) {
    createLikes(
      input: {
        vote: $vote
        postID: $postID
      }
    ) {
      success
      likes {
        up
        down
      }
    }
  }
`;
