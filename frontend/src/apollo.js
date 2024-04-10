import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "apollo-link-error";

const getToken = () => {
  return localStorage.getItem("token");
};

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

// Error link to handle global errors, including expired token errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      // Check if the error message indicates an expired token
      if (
        message.includes("Unauthorized") ||
        message.includes("Invalid token")
      ) {
        // Log out the user or perform other logout actions
        console.log("User is not authenticated. Logging out...");
        // Clear the token from local storage and redirect to the login page
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    });
  }

  if (networkError) {
    console.error("Network error:", networkError);
  }
});

const authLink = setContext((_, { headers }) => {
  // Retrieve the token from localStorage
  const token = getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

export default client;
