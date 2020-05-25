import React, { useState, useEffect } from 'react';

import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

import Routes from "./Routes";
import Navbar from './components/Navbar';
import ErrorBoundary from "./components/ErrorBoundary";

import { onError } from "./libs/errorLib";
import { AppContext } from "./libs/contextLib";

import './App.css';

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const history = useHistory();

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/login");
  }

  return (
    !isAuthenticating &&
      <div className="App">
        <header className="App-header">
          <Navbar auth={isAuthenticated} handleLogout={handleLogout} />
        </header>
        <ErrorBoundary>
          <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
            <Routes />
          </AppContext.Provider>
        </ErrorBoundary>
      </div>
  );
}

export default App;
