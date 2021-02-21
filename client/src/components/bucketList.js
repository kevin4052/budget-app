import React, { Component } from "react";
import { gql, graphql } from "@apollo/client";

const getBucketsList = gql`
  {
    buckets {
      name
      amount
      transactions {
        name
        amount
      }
    }
  }
`;

class BucketList extends Component {
  render() {
    return (
      <div>
        <ul id="bucket-list">
          <il>bucket</il>
        </ul>
      </div>
    );
  }
}

export default graphql(getBucketsList)(BucketList);
