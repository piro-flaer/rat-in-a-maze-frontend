import React, { useState } from "react";
import { Button } from "@mui/material";
import WifiProtectedSetupIcon from "@mui/icons-material/WifiProtectedSetup";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "../css/InputStartHelper.css";
import { Link } from "react-router-dom";

const InputStartHelper = () => {
  const [startRow, setStartRow] = useState();
  const [startCol, setStartCol] = useState();
  const matrixSize = parseInt(sessionStorage.getItem("matrixSize"));

  const matrixItemClicked = (rowIndx, colIndx) => {
    document.querySelector(".show-jerry")?.classList.remove("show-jerry");

    document
      .querySelectorAll(".matrixBuilder-rows")
      [rowIndx].querySelectorAll(".matrixBuilder-rows-items")
      [colIndx].querySelector("img")
      .classList.add("show-jerry");

    setStartRow(rowIndx);
    setStartCol(colIndx);
  };

  return (
    <>
      <div className="size-input">Place the Starting Point :</div>
      <div className="matrixBuilder">
        {[...new Array(matrixSize)].map((_, index) => {
          const rowIndx = index;
          return (
            <div className="matrixBuilder-rows" key={rowIndx}>
              {[...new Array(matrixSize)].map((_, index) => {
                const colIndx = index;
                return (
                  <div
                    className="matrixBuilder-rows-items"
                    key={colIndx}
                    onClick={() => matrixItemClicked(rowIndx, colIndx)}
                  >
                    <img className="jerry_img" src="images/jerry.png" />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <Button
        variant="contained"
        sx={{ pl: 2, pr: 2 }}
        endIcon={<WifiProtectedSetupIcon />}
        onClick={() => {
          const randomRow = Math.floor(Math.random() * matrixSize);
          const randomCol = Math.floor(Math.random() * matrixSize);
          matrixItemClicked(randomRow, randomCol);
        }}
      >
        Generate
        <br />
        Random
      </Button>
      <div className="navigationButtons">
        <Link to="/inputSize">
          <Button
            variant="outlined"
            startIcon={<ArrowBackIosNewIcon />}
            onClick={() => {
              sessionStorage.removeItem("startRow");
              sessionStorage.removeItem("startCol");
            }}
          >
            Back
          </Button>
        </Link>
        <Link to="/inputBlock">
          <Button
            variant="contained"
            endIcon={<ArrowForwardIosIcon />}
            disabled={
              typeof startRow !== "number" && typeof startCol !== "number"
            }
            onClick={() => {
              sessionStorage.setItem("startRow", startRow);
              sessionStorage.setItem("startCol", startCol);
            }}
          >
            Next
          </Button>
        </Link>
      </div>
    </>
  );
};

export default InputStartHelper;
