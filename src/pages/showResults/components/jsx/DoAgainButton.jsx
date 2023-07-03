import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const DoAgainButton = () => {
  return (
    <>
      <Link to="/inputSize">
        <Button
          variant="contained"
          onClick={() => {
            sessionStorage.removeItem("testVariable");
            sessionStorage.removeItem("matrixSize");
            sessionStorage.removeItem("startRow");
            sessionStorage.removeItem("startCol");
            sessionStorage.removeItem("blocksRows");
            sessionStorage.removeItem("blocksCols");
            sessionStorage.removeItem("endRow");
            sessionStorage.removeItem("endCol");
          }}
          sx={{ mt: 2.5 }}
        >
          Let's Do It Again!
        </Button>
      </Link>
    </>
  );
};

export default DoAgainButton;
