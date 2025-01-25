import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import LoadingScreen from "./LoadingScreen.jsx";

export function AuthenticationGuard({ component, props }) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <LoadingScreen />
    ),
  });

  return <Component {...props} />;
};