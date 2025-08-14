import { gql } from '@apollo/client';

/**
 * Create a rating.
 */
export const MUTATION_CREATE_RATING = gql`
  mutation createRating (
      $vote: Int!
      $postID: Int!
    ) {
      createRating(
        input: {
          vote: $vote
          postID: $postID
        }
      ) {
        success
        rating {
          total
          count
        }
      }
    }
`;
