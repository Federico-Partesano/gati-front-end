import * as React from "react";
import { useEffect, useState } from "react";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import { io, Socket } from "socket.io-client";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import { useDispatch } from "react-redux";
import { setBranches, setNameRepo } from "./redux/reducers/repository";
import TreeRepository from "./pages/TreeRepository/TreeRepository";

export let socketConnection: null | Socket = null;

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    socketConnection = io("ws://127.0.0.1:3085", {
      transports: ["websocket"],
    }).connect();
    socketConnection.emit("name-repo");
    socketConnection.emit("get-branches");

    socketConnection.on("name-repo", ({ name }: { name: string }) => {
      dispatch(setNameRepo(name))
    });
    socketConnection.on(
      "get-branches",
      ({ branches }: { branches: "error" | string[] }) => {
        Array.isArray(branches) && dispatch(setBranches(branches));
      }
    );
  }, []);

  const [page, setPage] = useState<"home" | "tree-repository">(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get("page");
    return !page ? "home" : (page as "home" | "tree-repository");
  });

  const setStatePage = (newPage: "home" | "tree-repository") => {
    setPage(newPage);
    const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?page=${newPage}`;
    window.history.replaceState({ path: newurl }, "", newurl);
  };

  const getPage = () => {
    switch (page) {
      case "home":
        return <Home />;
      case "tree-repository":
        return <TreeRepository />;
      default:
        return <Home />;
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Header setPage={setStatePage}>{getPage()}</Header>
    </ChakraProvider>
  );
};
