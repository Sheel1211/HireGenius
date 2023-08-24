import React from "react";
import Signin from "./pages/auth/Signin";
import "./index.css";
import FormBuilder from "./pages/FormBuilder/Main";
import CsvParser from "./pages/CsvParser/Main";
import StudentAptitude from "./pages/Student/Aptitude";
import Playground from './pages/compiler/Playground';
import Landing from "./pages/landing_page/Landing";
import CompilerHome from './pages/compiler/Home'
import { Route,BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./pages/landing_page/header/Header";
const App = () => {
  return (
    // <>


    //   {/* <FormBuilder /> */}
    //   <Landing />
    //   {/* <CsvParser /> */}
    //   {/* <StudentAptitude /> */}
    // </>

    <Router>
       <Header />
      <Routes>
        
        <Route path="/" exact element={<Landing />} />
        <Route path="/compiler" element={<CompilerHome />} />
        <Route path="/compiler/playground" element={<Playground />} />
        <Route path="/form" element={<FormBuilder /> } />
        <Route path="/parser" element={<CsvParser /> } />
        <Route path="/apt" element={<StudentAptitude /> } />
        
      </Routes>
    </Router>
  );
};

export default App;
