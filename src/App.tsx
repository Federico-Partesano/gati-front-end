import * as React from "react";
import { useEffect, useState } from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import { io, Socket } from "socket.io-client";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";

export let socketConnection: null | Socket = null;

export const App = () => {
  useEffect(() => {
    socketConnection = io("ws://127.0.0.1:3000", {
      transports: ["websocket"],
    }).connect();
  }, []);

  const [page, setPage] = useState<"home" | "profile">(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get("page");
    return !page ? "home" : page as "home" | "profile";
  });

  const setStatePage = (newPage: "home" | "profile") => {
    setPage(newPage);
    const newurl =
      `${window.location.protocol 
      }//${ 
      window.location.host 
      }${window.location.pathname 
      }?page=${page}`;
    window.history.replaceState({ path: newurl }, "", newurl);
  };

  const getPage = () => {
    switch (page) {
      case "home":
        return <Home />;
      case "profile":
        return <Home />;
      default:
        return <Home />;
    }
  };


  return (
    <ChakraProvider theme={theme}>
      <Header>
     {getPage()}
     </Header>
    </ChakraProvider>
  );
};
