import React from "react";
import Signin from "./pages/auth/Signin";
import "./index.css";
import FormBuilder from "./pages/FormBuilder/Main";
import Csvparser from "./pages/CsvParser/Main";
import StudentAptitude from "./pages/Student/Aptitude";
import Playground from "./pages/compiler/Playground";
import Landing from "./pages/landing_page/Landing";
import CompilerHome from "./pages/compiler/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./pages/landing_page/header/Header";
import Main from "./pages/FormBuilder/Main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    // <>
    //   {/* <FormBuilder /> */}
    //   <Landing />
    //   {/* <CsvParser /> */}
    //   {/* <StudentAptitude /> */}
    // </>

    <Router>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/compiler" element={<CompilerHome />} />
        <Route path="/compiler/playground" element={<Playground />} />
        <Route path="/form" element={<FormBuilder />} />
        <Route path="/parser" element={<Csvparser />} />
        <Route path="/apt" element={<StudentAptitude />} />
        <Route path="/formBuilder" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;
