import { gql } from "@apollo/client";

const getUserBucketsList = gql`
  query user($email: String!) {
    user(email: $email) {
      username
      email
      buckets {
        name
        amount
        transactions {
          name
          amount
        }
      }
    }
  }
`;

export { getUserBucketsList };
