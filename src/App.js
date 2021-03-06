
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Home from "./pages/Home"
import ChatRoom from "./pages/ChatRoom"

import { ChatsProvider } from './hooks/chatsContext'

function App() {
  return (
    <ChatsProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:roomId" component={ChatRoom} />
        </Switch>
      </Router>
    </ChatsProvider>
  );
}

export default App