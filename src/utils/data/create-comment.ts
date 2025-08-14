import { gql } from '@apollo/client';

/**
 * Create a comment.
 */
export const MUTATION_CREATE_COMMENT = gql`
  mutation createComment (
      $name: String!
      $email: String!
      $comment: String!
      $postID: Int!
    ) {
      createComment(
        input: {
          author: $name
          authorEmail: $email
          commentOn: $postID
          content: $comment
        }
      ) {
        success
        comment {
          author {
            node {
              avatar {
                url
              }
              email
              name
              url
            }
          }
          content(format: RENDERED)
          date
        }
      }
    }
`;
