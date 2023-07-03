import React, { useState, useEffect } from "react";
import LandingPageMain from "../landingPage/components/jsx/LandingPageMain";
import ProblemMatrix from "./components/jsx/ProblemMatrix";
import ShowSolvedMatrix from "./components/jsx/ShowSolvedMatrix";
import NoSolution from "./components/jsx/NoSolution";
import DoAgainButton from "./components/jsx/DoAgainButton";
import SolveMatrix from "../../apis/SolveMatrix";
import CircularProgress from "@mui/material/CircularProgress";

const ShowResults = () => {
  const testVariable = sessionStorage.getItem("testVariable");
  const matrixSize = sessionStorage.getItem("matrixSize");
  const startRow = sessionStorage.getItem("startRow");
  const startCol = sessionStorage.getItem("startCol");
  const blocksRows = sessionStorage.getItem("blocksRows");
  const blocksCols = sessionStorage.getItem("blocksCols");
  const endRow = sessionStorage.getItem("endRow");
  const endCol = sessionStorage.getItem("endCol");

  const [solvedMatrix, setSolvedMatrix] = useState();

  const generateMatrix = async () => {
    const apiResponse = await SolveMatrix({
      testVariable,
      matrixSize,
      startRow,
      startCol,
      blocksRows,
      blocksCols,
      endRow,
      endCol,
    });

    setSolvedMatrix(apiResponse);
  };

  useEffect(() => {
    generateMatrix();
  }, []);

  return (
    <>
      <div className="inputPage-background" style={{ height: "auto" }}>
        <LandingPageMain />
        <>
          <h2>The Problem:</h2>
          <ProblemMatrix id="no-sol" />
        </>
        {solvedMatrix ? (
          <>
            {solvedMatrix.solutionCol.length > 0 ? (
              <>
                <h2 style={{ marginTop: "75px" }}>The Solutions:</h2>
                <ShowSolvedMatrix
                  solutionCols={solvedMatrix.solutionCol}
                  solutionRows={solvedMatrix.solutionRow}
                />
              </>
            ) : (
              <>
                <NoSolution />
              </>
            )}
          </>
        ) : (
          <CircularProgress />
        )}
        <>
          <DoAgainButton />
        </>
      </div>
    </>
  );
};

export default ShowResults;
