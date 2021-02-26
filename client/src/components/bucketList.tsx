import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import { useDataStore } from "../context/context";
import { getUserBucketsList } from '../graphql/queries';

// const getUserBucketsList = gql`
//   query {
//     user(email: "kevin@kevin.com") {
//       username
//       email
//       buckets {
//         name
//         amount
//         transactions {
//           name
//           amount
//         }
//       }
//     }
//   }
// `;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.primary,
    },
  })
);

const BucketList: React.FC = () => {
  const { data } = useQuery(getUserBucketsList, {
    variables: { email: "kevin@kevin.com" },
  });
  // const store = useDataStore();
  // const { user, addUser, removeUser } = store;
  const [buckets, setBuckets] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (data) {
      // addUser(data)
      setBuckets(data.user.buckets);
      // setBuckets(data);
    }
  }, [data]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {buckets.map(({ name, amount }) => (
          <Grid key={name} item xs={6}>
            <Paper className={classes.paper}>
              {name}: {amount}
            </Paper>
          </Grid>
        ))}
        {/* {buckets.map((user) => (
          <Grid key={user} item xs={6}>
            <Paper className={classes.paper}>{user}</Paper>
          </Grid>
        ))} */}
      </Grid>
    </div>
  );
};

export default BucketList;
