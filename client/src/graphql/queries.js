import { gql } from "@apollo/client";

const getUserBucketsList = gql`
  query {
    user(email: "kevin@kevin.com") {
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

export {getUserBucketsList};
