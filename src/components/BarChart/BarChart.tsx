import React, { useEffect, useRef, useState } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import "./BarChart.scss";
import { useRepository } from "../../hooks/useRepository";
import { getFamilyBranches } from "./utils";
import Button from "../Button/Button";

var nodeDataArray = [
  { key: 34, parent: 14, name: "James Ogilvy", gender: "M", birthYear: "1964" },
  { key: 78, parent: 34, name: "Flora Ogilvy", gender: "F", birthYear: "1994" },
  {
    key: 79,
    parent: 34,
    name: "Alexander Ogilvy",
    gender: "M",
    birthYear: "1996",
  },
];

// interface IDiagramBranches {key: number, parent:number, name: string}[] || undefined

const BarChart = () => {
  const { branches } = useRepository();
  const [branchesForDiagram, setBranchesForDiagram] = useState<
    { key: number; parent?: number; name: string }[] | undefined
  >();
  useEffect(() => {
    if (!branches) return;
    const formattedBranches = getFamilyBranches(
      branches
        ?.map((branch) => branch.replace("remotes/origin/", ""))
        .filter(function (item, pos, self) {
          return self.indexOf(item) == pos;
        })
    );
    setBranchesForDiagram(formattedBranches);
    console.log("branches", formattedBranches);
  }, [branches]);

  const diagramRef = useRef<ReactDiagram>(null);

  function initDiagram() {
    const $ = go.GraphObject.make;
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
    const diagram = $(go.Diagram, {
      "toolManager.hoverDelay": 100, // 100 milliseconds instead of the default 850
      allowCopy: false,
      model: new go.TreeModel(),
      // create a TreeLayout for the family tree
      layout: $(go.TreeLayout, {
        angle: 90,
        nodeSpacing: 10,
        layerSpacing: 40,
        layerStyle: go.TreeLayout.LayerUniform,
      }),
    });

    var bluegrad = "#90CAF9";
    var pinkgrad = "#F48FB1";

    // Set up a Part as a legend, and place it directly on the diagram
    // diagram.add(
    //   $(
    //     go.Part,
    //     "Table",
    //     { position: new go.Point(300, 10), selectable: false },
    //     $(go.TextBlock, "Key", {
    //       row: 0,
    //       font: "700 14px Droid Serif, sans-serif",
    //     }), // end row 0
    //     $(
    //       go.Panel,
    //       "Horizontal",
    //       { row: 1, alignment: go.Spot.Left },
    //       $(go.Shape, "Rectangle", {
    //         desiredSize: new go.Size(30, 30),
    //         fill: bluegrad,
    //         margin: 5,
    //       }),
    //       $(go.TextBlock, "Males", { font: "700 13px Droid Serif, sans-serif" })
    //     ), // end row 1
    //     $(
    //       go.Panel,
    //       "Horizontal",
    //       { row: 2, alignment: go.Spot.Left },
    //       $(go.Shape, "Rectangle", {
    //         desiredSize: new go.Size(30, 30),
    //         fill: pinkgrad,
    //         margin: 5,
    //       }),
    //       $(go.TextBlock, "Females", {
    //         font: "700 13px Droid Serif, sans-serif",
    //       })
    //     ) // end row 2
    //   )
    // );

    // diagram.addDiagramListener("ObjectSingleClicked",
    // function(e) {
    //   var part = e.subject.part;
    //   if (!(part instanceof go.Link)) console.log("Clicked on " + part.data.key);
    // });


    // get tooltip text from the object's data
    function tooltipTextConverter(branch: {
        key: number;
        parent?: number | undefined;
        name: string;
        nameBranch: string;
        sourceName: string;
    }) {
      var str = "";
      str += "Name: " + branch.nameBranch;
      if (branch.sourceName !== undefined) str += "\nSource name: " + branch.sourceName;
      return str;
    }
  

    // define tooltips for nodes
    var tooltiptemplate = $(
      "ToolTip",
      { "Border.fill": "whitesmoke", "Border.stroke": "black" },
      $(
        go.TextBlock,
        {
          font: "bold 8pt Helvetica, bold Arial, sans-serif",
          wrap: go.TextBlock.WrapFit,
          margin: 5,
        },
        new go.Binding("text", "", tooltipTextConverter)
      )
    );

    // define Converters to be used for Bindings
    function genderBrushConverter(gender: any) {
      if (gender === "M") return bluegrad;
      if (gender === "F") return pinkgrad;
      return "orange";
    }

    const orphanBranch = (sourceName: string) => sourceName ? "#a9a9b3" : "#797979"


    diagram.nodeTemplate = $(
      go.Node,
      "Auto",
      { deletable: false, toolTip: tooltiptemplate },
      new go.Binding("text", "name"),
      $(
        go.Shape,
        "Rectangle",
        {
          fill: "lightgray",
          stroke: null,
          strokeWidth: 0,
          stretch: go.GraphObject.Fill,
          alignment: go.Spot.Center,
        },
        new go.Binding("fill", "sourceName", orphanBranch)
      ),
      $(
        go.TextBlock,
        {
          font: "700 14px Droid Serif, sans-serif",
          textAlign: "center",
          margin: 15,
          maxSize: new go.Size(200, NaN),
        },
        new go.Binding("text", "name")
      )
    );

    // define the Link template
    diagram.linkTemplate = $(
      go.Link, // the whole link panel
      { routing: go.Link.Orthogonal, corner: 5, selectable: false },
      $(go.Shape, { strokeWidth: 3, stroke: "#424242" })
    ); // the gray link shape

    return diagram;
  }

  /**
   * This function handles any changes to the GoJS model.
   * It is here that you would make any updates to your React state, which is dicussed below.
   */
//   function handleModelChange(changes: any) {
//     console.log('changes', changes)
// }

  return (
    <div className="container-tre-repository">
        <h1 className="title-tree">Visualize tree repository</h1>
      {branchesForDiagram && (
        <>
        <ReactDiagram
          ref={diagramRef}
          initDiagram={initDiagram}
          divClassName="diagram-component"
          nodeDataArray={branchesForDiagram}
        //   onModelChange={handleModelChange}
        />
          <div className="d-flex gap-4 mt-2 justify-content-center">
        <Button
        label="center"
        theme="primary"
          onClick={() => {
            if (!diagramRef.current) return;
            const diagram = diagramRef.current.getDiagram()!;
            diagram.scale = 1;
            diagram.scrollToRect(diagram.findNodeForKey(0)!.actualBounds);
          }}
        />
          
        
        <Button
        label="zoom"
        theme="primary"
          onClick={() => {
            if (!diagramRef.current) return;
            const diagram = diagramRef.current.getDiagram()!;
            diagram.commandHandler.zoomToFit();
          }}
        />
      </div>
        </>
      )}
    
    </div>
  );
};

export default BarChart;
