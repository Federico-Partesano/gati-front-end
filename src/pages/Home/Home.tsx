import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import React, { FC, Fragment, useEffect, useState } from "react";
import * as d3 from "d3";
import { socketConnection } from "../../App";
import "./Home.scss";
import BarChart from "../../components/BarChart/BarChart";
import { useRepository } from "../../hooks/useRepository";
import WorkInProgress from "../../components/WorkInProgress/WorkInProgress";

interface IHome {}

const Home: FC<IHome> = () => {
 const {nameRepo, branches: allBranches} = useRepository();

  return (
    <div className="container-home">
      <div className="wrapper">
      <h1 className="name-repo">{nameRepo}</h1>
      <WorkInProgress />
      </div>
    </div>
  );
};

export default Home;
