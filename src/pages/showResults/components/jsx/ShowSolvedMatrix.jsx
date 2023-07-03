import React from "react";
import IndividualMatrix from "./IndividualMatrix";

const ShowSolvedMatrix = ({ solutionCols, solutionRows }) => {
  return (
    <>
      {solutionCols.map((ColArray, index) => {
        return (
          <IndividualMatrix
            key={index}
            id={"Solution_" + (index + 1)}
            ColArray={ColArray}
            RowArray={solutionRows[index]}
          />
        );
      })}
    </>
  );
};

export default ShowSolvedMatrix;
