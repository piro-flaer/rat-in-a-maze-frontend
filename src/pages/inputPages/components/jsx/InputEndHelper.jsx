import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import WifiProtectedSetupIcon from "@mui/icons-material/WifiProtectedSetup";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "../css/InputEndHelper.css";
import { Link } from "react-router-dom";

const InputEndHelper = () => {
  const matrixSize = parseInt(sessionStorage.getItem("matrixSize"));
  const startRow = parseInt(sessionStorage.getItem("startRow"));
  const startCol = parseInt(sessionStorage.getItem("startCol"));
  const blocksRows = JSON.parse(sessionStorage.getItem("blocksRows"));
  const blocksCols = JSON.parse(sessionStorage.getItem("blocksCols"));

  const [endRow, setEndRow] = useState();
  const [endCol, setEndCol] = useState();

  const matrixItemClicked = (rowIndx, colIndx) => {
    if (rowIndx === startRow && colIndx === startCol) {
      alert("You can't place cheese on Jerry's Position!");
      return;
    }

    if (
      document
        .querySelectorAll(".matrixBuilder-rows")
        [rowIndx].querySelectorAll(".matrixBuilder-rows-items")
        [colIndx].classList.contains("block-selected")
    ) {
      alert("You can't place cheese on a block!");
      return;
    }

    document.querySelector(".show-cheese")?.classList.remove("show-cheese");

    document
      .querySelectorAll(".matrixBuilder-rows")
      [rowIndx].querySelectorAll(".matrixBuilder-rows-items")
      [colIndx].querySelector("img")
      .classList.add("show-cheese");

    setEndRow(rowIndx);
    setEndCol(colIndx);
  };

  useEffect(() => {
    let i = 0;
    while (i < blocksRows.length && i < blocksCols.length) {
      const rowIndex = blocksRows[i];
      const colIndex = blocksCols[i];
      const blockElement = document
        .querySelectorAll(".matrixBuilder-rows")
        [rowIndex].querySelectorAll(".matrixBuilder-rows-items")[colIndex];

      blockElement.classList.add("block-selected");
      blockElement.style.cursor = "no-drop";
      i++;
    }
  });

  return (
    <>
      <div className="size-input">Place the Ending Point :</div>
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
                    style={{
                      cursor:
                        startRow === rowIndx && startCol === colIndx
                          ? "no-drop"
                          : "default",
                    }}
                  >
                    {startRow === rowIndx && startCol === colIndx ? (
                      <img
                        className="jerry_img"
                        src="images/jerry.png"
                        style={{ opacity: 1 }}
                      />
                    ) : (
                      <img className="cheese_img" src="images/cheese.png" />
                    )}
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
          while (1) {
            const randomRow = Math.floor(Math.random() * matrixSize);
            const randomCol = Math.floor(Math.random() * matrixSize);

            if (
              randomRow !== startRow &&
              randomCol !== startCol &&
              !document
                .querySelectorAll(".matrixBuilder-rows")
                [randomRow].querySelectorAll(".matrixBuilder-rows-items")
                [randomCol].classList.contains("block-selected")
            ) {
              matrixItemClicked(randomRow, randomCol);
              break;
            }
          }
        }}
      >
        Generate
        <br />
        Random
      </Button>
      <div className="navigationButtons">
        <Link to="/inputBlock">
          <Button
            variant="outlined"
            startIcon={<ArrowBackIosNewIcon />}
            onClick={() => {
              sessionStorage.removeItem("endRow");
              sessionStorage.removeItem("endCol");
            }}
          >
            Back
          </Button>
        </Link>
        <Link to="/showResults">
          <Button
            variant="contained"
            endIcon={<ArrowForwardIosIcon />}
            disabled={typeof endRow !== "number" && typeof endCol !== "number"}
            onClick={() => {
              sessionStorage.setItem("endRow", endRow);
              sessionStorage.setItem("endCol", endCol);
            }}
          >
            Generate Path
          </Button>
        </Link>
      </div>
    </>
  );
};

export default InputEndHelper;
