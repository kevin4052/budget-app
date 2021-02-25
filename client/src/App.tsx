import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useObserver } from "mobx-react";
import BucketList from "./components/bucketList";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Container, Icon, Paper, Button } from "@material-ui/core";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

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

function App() {
  const classes = useStyles();
  return useObserver(() => (
    <ApolloProvider client={client}>
        <Container maxWidth="sm">
          <Paper className={classes.paper}>
            <h3>Kevin's List</h3>
          </Paper>
          <br />
          {/* <UserList/> */}
          <BucketList />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              alert("clicked");
            }}
            size="small"
            endIcon={<Icon>send</Icon>}
          >
            Hello World
          </Button>
        </Container>
    </ApolloProvider>
  ));
};

export default App;
