import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import Game from "./Game";
import SplashScreen from "./SplashScreen";
import { ReactComponent as YourSvg } from "./World_Map.svg";
import "./styles.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">SplashScreen</Link>
            </li>
            <li>
              <Link to="/map">Map</Link>
            </li>
            <li>
              <Link to="/game">Game</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about">
            <div>about</div>
          </Route>
          <Route path="/users">
            <SplashScreen />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/map">
            <div>
              <YourSvg width="100%" />
            </div>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// landing page
// start game -> game page
// game page
// we need to make sure to not repeat questions
// we could order them for now and have a page num in the url
// when the game is up we need to render a done page
// done/score page
// back to landing page
