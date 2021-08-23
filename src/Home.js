import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Flex } from "@chakra-ui/react";

export default function Home() {
  let history = useHistory();

  return (
    <Flex flexDirection="column" width="50%" alignItems="center">
      <div style={{ height: 300, width: 300, border: "1px solid black" }}>
        some picture
      </div>
      <br />
      <Button onClick={() => history.push("/game")}>Single Player</Button>
      <Button>Multi-Player</Button>
      <Button>High Scores</Button>
      <Button>Settings</Button>
    </Flex>
  );
}
