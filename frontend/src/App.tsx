import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import client from "./apollo";
import routes from "./utils/routes";
import AppContainer from "./pages/AppContainer";
import LoginPage from "./pages/auth/login";
import SiginUpPage from "./pages/auth/signup";
import React from "react";
import { AuthContext } from "./context/auth/AuthContext";

function App() {
  const authState = React.useContext(AuthContext);

  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    if (Boolean(authState?.token)) {
      return <>{children}</>;
    } else {
      return <Navigate to="/login" replace />;
    }
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <AppContainer />
              </RequireAuth>
            }
          >
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SiginUpPage />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
