import React, { useState } from "react";
import { Button } from "@mui/material";
import WifiProtectedSetupIcon from "@mui/icons-material/WifiProtectedSetup";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "../css/InputBlockHelper.css";
import { Link } from "react-router-dom";

const InputBlockHelper = () => {
  const matrixSize = parseInt(sessionStorage.getItem("matrixSize"));
  const startRow = parseInt(sessionStorage.getItem("startRow"));
  const startCol = parseInt(sessionStorage.getItem("startCol"));
  const [blocksRows, setBlocksRows] = useState([]);
  const [blocksCols, setBlocksCols] = useState([]);

  const matrixItemClicked = (rowIndx, colIndx) => {
    if (rowIndx === startRow && colIndx === startCol) {
      alert("You can't place a block on Jerry's Position!");
      return;
    }

    const blockClicked = document
      .querySelectorAll(".matrixBuilder-rows")
      [rowIndx].querySelectorAll(".matrixBuilder-rows-items")[colIndx];

    if (blockClicked.classList.contains("block-selected")) {
      blockClicked.classList.remove("block-selected");

      const tempRows = blocksRows.filter(
        (rowVal, index) =>
          !(rowVal === rowIndx && blocksCols[index] === colIndx)
      );

      const tempCols = blocksCols.filter(
        (colVal, index) =>
          !(colVal === colIndx && blocksRows[index] === rowIndx)
      );

      setBlocksRows(tempRows);
      setBlocksCols(tempCols);

      return;
    }

    blockClicked.classList.add("block-selected");
    setBlocksRows([...blocksRows, rowIndx]);
    setBlocksCols([...blocksCols, colIndx]);
  };

  return (
    <>
      <div className="size-input">Place the Blocks :</div>
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
                    {startRow === rowIndx && startCol === colIndx && (
                      <img
                        className="jerry_img"
                        src="images/jerry.png"
                        style={{ opacity: 1 }}
                      />
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
          const numberBlocks = Math.ceil(
            Math.random() * matrixSize * matrixSize
          );
          for (let i = 0; i < numberBlocks; i++) {
            const randomRow = Math.floor(Math.random() * matrixSize);
            const randomCol = Math.floor(Math.random() * matrixSize);
            if (randomRow === startRow && randomCol === startCol) {
              continue;
            }
            matrixItemClicked(randomRow, randomCol);
          }
        }}
      >
        Generate
        <br />
        Random
      </Button>
      <div className="navigationButtons">
        <Link to="/inputStart">
          <Button
            variant="outlined"
            startIcon={<ArrowBackIosNewIcon />}
            onClick={() => {
              sessionStorage.removeItem("blocksMatrix");
            }}
          >
            Back
          </Button>
        </Link>
        <Link to="/inputEnd">
          <Button
            variant="contained"
            endIcon={<ArrowForwardIosIcon />}
            disabled={!(blocksCols.length > 0 && blocksRows.length > 0)}
            onClick={() => {
              const rowArray = JSON.stringify(blocksRows);
              const colArray = JSON.stringify(blocksCols);
              sessionStorage.setItem("blocksRows", rowArray);
              sessionStorage.setItem("blocksCols", colArray);
            }}
          >
            Next
          </Button>
        </Link>
      </div>
    </>
  );
};

export default InputBlockHelper;
