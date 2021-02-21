import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
} from "@apollo/client";
// import BucketList from "./components/bucketList";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query buckets {
        name
        amount
        transaction {
          name
          amount
        }
      }
    `,
  })
  .then((result) => console.log(result))
  .catch((err) => console.log({ err }));

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1>Kevin's List</h1>
        </header>
        {/* <BucketList /> */}
      </div>
    </ApolloProvider>
  );
}

export default App;
