import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import React, { FC, Fragment, useEffect, useState } from "react";
import { socketConnection } from "../../App";
import "./Home.scss";

interface IHome {}

const Home: FC<IHome> = () => {
  const [nameRepo, setNameRepo] = useState("");
  const [allBranches, setallBranches] = useState<string[]>([]);
  useEffect(() => {
    if (!socketConnection) return;
    socketConnection.emit("name-repo");
    socketConnection.emit("get-branches");

    socketConnection.on("name-repo", ({ name }: { name: string }) => {
      setNameRepo(name);
    });
    socketConnection.on(
      "get-branches",
      ({ branches }: { branches: "error" | string[] }) => {
        Array.isArray(branches) && setallBranches(branches);
      }
    );
    // eslint-disable-next-line
  }, [socketConnection]);

  return (
    <div>
      <h1 className="name-repo">{nameRepo}</h1>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Actions
        </MenuButton>
        <MenuList>
          {allBranches.map((branch) => (
            <MenuItem key={branch}>{branch}</MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default Home;
