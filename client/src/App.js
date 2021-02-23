import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import BucketList from "./components/bucketList";
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

function App() {
  return (
    // <StoreProvider>
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1>Kevin's List</h1>
          {/* <UserList/> */}
          <BucketList />
        </header>
      </div>
    </ApolloProvider>
    // </StoreProvider>
  );
}

export default App;
