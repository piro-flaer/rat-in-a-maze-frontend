const SolveMatrix = async ({
  testVariable,
  matrixSize,
  startRow,
  startCol,
  blocksRows,
  blocksCols,
  endRow,
  endCol,
}) => {
  const url = new URL(process.env.REACT_APP_BACKEND_URL);

  url.searchParams.append("testVariable", testVariable);
  url.searchParams.append("matrixSize", matrixSize);
  url.searchParams.append("startRow", startRow);
  url.searchParams.append("startCol", startCol);
  url.searchParams.append("blocksRows", blocksRows);
  url.searchParams.append("blocksCols", blocksCols);
  url.searchParams.append("endRow", endRow);
  url.searchParams.append("endCol", endCol);

  const response = await (await fetch(url)).json();
  return response.message;
};

export default SolveMatrix;
