import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

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

const BucketList: React.FC = () => {
  const { error, loading, data } = useQuery(getUserBucketsList);
  const [buckets, setBuckets] = useState([]);
  
  useEffect(() => {
    if (data) {
      setBuckets(data.user.buckets);
    }
  }, [data]);

  return (
    <div>
      <h3>Buckets</h3>
      <ul id="bucket-list">
        {buckets.map(({ name, amount }) => (
          <li key={name}>
            {name}: {amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BucketList;
