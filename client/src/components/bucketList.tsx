import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

const getBucketsList = gql`
  query {
    buckets {
      name
      amount
    }
  }
`;

const BucketList: React.FC = () => {
  const { error, loading, data } = useQuery(getBucketsList);
  const [buckets, setBuckets] = useState([]);
  useEffect(() => {
    if (data) {
      setBuckets(data.buckets);
    }
  }, [data]);

  return (
    <div>
      <h3>Buckets</h3>
      <ul id="bucket-list">
        {buckets.map(({name, amount}) => (
          <li key={name}>
            {name}: {amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BucketList;
