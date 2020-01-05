import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql"
});

export default function MyProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
