import React, { useEffect } from "react";
import ProblemMatrix from "./ProblemMatrix";

const IndividualMatrix = ({ id, ColArray, RowArray }) => {
  const startRow = parseInt(sessionStorage.getItem("startRow"));
  const startCol = parseInt(sessionStorage.getItem("startCol"));
  useEffect(() => {
    let i = 0;
    while (i < ColArray.length && i < RowArray.length) {
      if (!(startRow === RowArray[i] && startCol === ColArray[i])) {
        const idVal = "#" + id + "_row_" + RowArray[i] + "_col_" + ColArray[i];
        document.querySelector(idVal).style.backgroundColor = "green";
      }
      i++;
    }
  }, []);
  return (
    <div
      style={{
        marginTop: "50px",
        textAlign: "center",
        border: "5px solid gray",
      }}
    >
      <h3>{id}</h3>
      <ProblemMatrix id={id} />
    </div>
  );
};

export default IndividualMatrix;
