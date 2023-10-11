import React from "react";
import Signin from "./pages/auth/Signin";
import "./index.css";
import FormBuilder from "./pages/FormBuilder/Aptitude/Main";
import CsvParser from "./pages/CsvParser/Main";
import Playground from "./pages/compiler/Playground";
import Landing from "./pages/landing_page/Landing";
import CompilerHome from "./pages/compiler/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./pages/landing_page/header/Header";
import Main from "./pages/FormBuilder/Aptitude/Main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CandidateAptitude from "./pages/Candidate/Aptitude";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      {/* <Header /> */}
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/compiler" element={<CompilerHome />} />
        <Route path="/compiler/playground" element={<Playground />} />
        <Route path="/create/aptitude" element={<FormBuilder />} />
        <Route path="/aptitude/:aptitudeId" element={<CandidateAptitude />} />

        <Route path="/parser" element={<CsvParser />} />
      </Routes>
    </Router>
  );
};

export default App;
