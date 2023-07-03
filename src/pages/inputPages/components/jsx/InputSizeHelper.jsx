import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Input from "@mui/material/Input";
import { Button } from "@mui/material";
import WifiProtectedSetupIcon from "@mui/icons-material/WifiProtectedSetup";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "../css/InputSizeHelper.css";
import { Link } from "react-router-dom";

const InputSizeHelper = () => {
  const [matrixSize, setMatrixSize] = useState(3);

  const handleSliderChange = (event, newValue) => {
    setMatrixSize(newValue);
  };

  const handleInputChange = (event) => {
    setMatrixSize(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (matrixSize < 3) {
      setMatrixSize(3);
    } else if (matrixSize > 9) {
      setMatrixSize(9);
    }
  };

  return (
    <>
      <div className="size-input">
        Enter the Size of Matrix :
        <Input
          value={matrixSize}
          size="small"
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            step: 1,
            min: 3,
            max: 9,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
          sx={{ ml: 1 }}
        />
      </div>
      <div className="size-slider">
        <Slider
          value={typeof matrixSize === "number" ? matrixSize : 3}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={3}
          max={9}
        />
      </div>
      <Button
        variant="contained"
        sx={{ pl: 2, pr: 2 }}
        endIcon={<WifiProtectedSetupIcon />}
        onClick={() => {
          const randomValue = Math.ceil(Math.random() * 7) + 2;
          setMatrixSize(randomValue);
        }}
      >
        Generate
        <br />
        Random
      </Button>
      <div className="navigationButtons">
        <Link to="/">
          <Button
            variant="outlined"
            startIcon={<ArrowBackIosNewIcon />}
            onClick={() => {
              sessionStorage.removeItem("matrixSize");
            }}
          >
            Back
          </Button>
        </Link>
        <Link to="/inputStart">
          <Button
            variant="contained"
            endIcon={<ArrowForwardIosIcon />}
            onClick={() => {
              sessionStorage.setItem("matrixSize", matrixSize);
            }}
          >
            Next
          </Button>
        </Link>
      </div>
    </>
  );
};

export default InputSizeHelper;
