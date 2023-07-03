import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./landingPage/LandingPage";
import InputSize from "./inputPages/InputSize";
import InputStart from "./inputPages/InputStart";
import InputBlock from "./inputPages/InputBlock";
import InputEnd from "./inputPages/InputEnd";
import ShowResults from "./showResults/ShowResults";

const AllPages = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/inputSize" element={<InputSize />} />
          <Route path="/inputStart" element={<InputStart />} />
          <Route path="/inputBlock" element={<InputBlock />} />
          <Route path="/inputEnd" element={<InputEnd />} />
          <Route path="/showResults" element={<ShowResults />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AllPages;
