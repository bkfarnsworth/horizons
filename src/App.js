import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as ReactRouterLink
} from "react-router-dom";
import { ChakraProvider, extendTheme, Link, Flex } from "@chakra-ui/react";
import Home from "./Home";
import Game from "./Game";
import SplashScreen from "./SplashScreen";
import { ReactComponent as YourSvg } from "./World_Map.svg";
import customTheme from "./customTheme";
import "./styles.css";

const theme = extendTheme(customTheme);

export default function App() {
  let [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 5000);
    // }, 5000000);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <div>
        {showSplashScreen ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "25%"
            }}
          >
            <SplashScreen />
          </div>
        ) : (
          <Router>
            <div className="App">
              <Flex justify="space-around">
                <Link to="/" as={ReactRouterLink}>
                  Home
                </Link>
                <Link to="/about" as={ReactRouterLink}>
                  About
                </Link>
                <Link to="/users" as={ReactRouterLink}>
                  SplashScreen
                </Link>
                <Link to="/map" as={ReactRouterLink}>
                  Map
                </Link>
                <Link to="/game" as={ReactRouterLink}>
                  Game
                </Link>
              </Flex>
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
        )}
      </div>
    </ChakraProvider>
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
