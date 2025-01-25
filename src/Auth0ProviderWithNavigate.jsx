import { Auth0Provider } from '@auth0/auth0-react'
import React from "react";
import { useNavigate } from "react-router";


export function Auth0ProviderWithNavigate({ children }) {
  const navigate = useNavigate();
  
  
  // Reading from the .env file
  const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REACT_APP_AUTH0_CALLBACK_URL;
  
  
  function onRedirectCallback(appState) {
    navigate(appState?.returnTo || window.location.pathname);
  };
  
  
  if (!(domain && clientId && redirectUri)) {
    return null;
  }
  
  
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};