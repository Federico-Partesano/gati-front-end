import React, { FC } from "react";
import BarChart from "../../components/BarChart/BarChart";
import "./TreeRepository.scss";

interface ITreeRepository {}

const TreeRepository: FC<ITreeRepository> = () => {
  return (
    <div className="container-tree-repository">
      <div className="wrapper">
        <div className="container-tree">
          <BarChart></BarChart>
        </div>
      </div>
    </div>
  );
};

export default TreeRepository;
