import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import BucketList from "./components/bucketList";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Container, Icon, Paper, Grid, Button } from "@material-ui/core";
import "./App.css";

// mobX and reach-context
// import { useLocalStore, useObserver } from "mobx-react";
// const StoreContext = React.createContext();

// const StoreProvider = ({ children }) => {
//   const store = useLocalStore(() => ({
//     users: ["kevin", "Liz"],
//   }));

//   return (
//     <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
//   );
// };

// const UserList = () => {
//   const store = React.useContext(StoreContext);

//   return (
//     <ul>
//       {store.users.map((user) => (
//         <li key={user}>{user}</li>
//       ))}
//     </ul>
//   );
// };

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
  return (
    // <StoreProvider>
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
    // </StoreProvider>
  );
}

export default App;
