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

const BucketList = () => {
  const { error, loading, data } = useQuery(getBucketsList);
  const [buckets, setBuckets] = useState([]);
  useEffect(() => {
    if (data) {
      setBuckets(data.buckets);
    }
  }, [data]);

  return (
    <div>
      <ul id="bucket-list">
        <li>bucket</li>
        {
          buckets.map(bucket => <li key={bucket.name}>{bucket.name}: {bucket.amount}</li>)
        }
      </ul>
    </div>
  );
}

export default BucketList;
