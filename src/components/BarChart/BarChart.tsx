import { border } from "@chakra-ui/react";
import React from "react";
import Tree from "react-d3-tree";
import "./BarChart.scss";

const containerStyles = {
  width: "100vw",
  height: "80vh",
  border: "2px solid red"
};
const tt = {
    "name": "CEO",
    "children": [
      {
        "name": "feature/test-child_process/child_process",
        "attributes": {
          "department": "Production"
        },
        "children": [
          {
            "name": "feature/test-child_process/child_process",
            "attributes": {
              "department": "Fabrication"
            },
            "children": [
              {
                "name": "feature/test-child_process/child_process"
              }
            ]
          },
          {
            "name": "feature/test-child_process/child_process",
            "attributes": {
              "department": "Assembly"
            },
            "children": [
              {
                "name": "feature/test-child_process/child_process"
              }
            ]
          }
        ]
      },
      {
        "name": "feature/test-child_process/child_process",
        "attributes": {
          "department": "Marketing"
        },
        "children": [
          {
            "name": "feature/test-child_process/child_process",
            "attributes": {
              "department": "A"
            },
            "children": [
              {
                "name": "feature/test-child_process/child_process"
              }
            ]
          },
          {
            "name": "feature/test-child_process/child_process",
            "attributes": {
              "department": "B"
            },
            "children": [
              {
                "name": "feature/test-child_process/child_process"
              }
            ]
          }
        ]
      }
    ]
  }
  
// Here we're using `renderCustomNodeElement` to represent each node
// as an SVG `rect` instead of the default `circle`.
const renderRectSvgNode = ({ nodeDatum, toggleNode }: any) => (
  <g>
    <rect width="20" height="20" x="-10" onClick={toggleNode} />
    <text fill="black" strokeWidth="1" x="20">
      {nodeDatum.name}
    </text>
    {nodeDatum.attributes?.department && (
      <text fill="black" x="20" dy="20" strokeWidth="1">
        Department: {nodeDatum.attributes?.department}
      </text>
    )}
  </g>
);

const straightPathFunc = (linkDatum:any, orientation: any) => {
    const { source, target } = linkDatum;
    return orientation === 'horizontal'
      ? `M${source.y},${source.x}L${target.y},${target.x}`
      : `M${source.x},${source.y}L${target.x},${target.y}`;
  };


export default function App() {

  return (
    <div style={containerStyles}>
      <Tree
        data={tt}
        pathFunc={straightPathFunc}
        orientation="horizontal"
        nodeSize={{ x: 420, y: 160 }}
    collapsible={false}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
      />
    </div>
  );
}
