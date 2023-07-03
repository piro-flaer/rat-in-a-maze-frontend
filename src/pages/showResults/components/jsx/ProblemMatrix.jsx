import React, { useEffect } from "react";

const ProblemMatrix = ({ id }) => {
  const matrixSize = parseInt(sessionStorage.getItem("matrixSize"));
  const startRow = parseInt(sessionStorage.getItem("startRow"));
  const startCol = parseInt(sessionStorage.getItem("startCol"));
  const blocksRows = JSON.parse(sessionStorage.getItem("blocksRows"));
  const blocksCols = JSON.parse(sessionStorage.getItem("blocksCols"));
  const endRow = parseInt(sessionStorage.getItem("endRow"));
  const endCol = parseInt(sessionStorage.getItem("endCol"));

  useEffect(() => {
    let i = 0;
    while (i < blocksRows.length && i < blocksCols.length) {
      const idVal =
        "#" + id + "_row_" + blocksRows[i] + "_col_" + blocksCols[i];
      document.querySelector(idVal).style.backgroundColor = "red";

      i++;
    }
  });

  return (
    <>
      <div className="matrixBuilder" id={id}>
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
                    id={id + "_row_" + rowIndx + "_col_" + colIndx}
                  >
                    {startRow === rowIndx && startCol === colIndx && (
                      <img
                        className="jerry_img"
                        src="images/jerry.png"
                        style={{ opacity: 1 }}
                      />
                    )}
                    {endRow === rowIndx && endCol === colIndx && (
                      <img
                        className="cheese_img"
                        src="images/cheese.png"
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
    </>
  );
};

export default ProblemMatrix;
