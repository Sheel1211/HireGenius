import React from "react";
import Signin from "./pages/auth/Signin";
import "./index.css";
import ClientDashboard from "./pages/ClientDashboard/layout";
import ClientDashboardAppPage from "./pages/ClientDashboard/appPage";
import CandidatePage from "./pages/ClientDashboard/candidatePage";
import InterviewPage from "./pages/ClientDashboard/interviewPage";
import AdminDashboard from "./pages/Admin/adminDashboard";
import AdminLogin from './pages/Admin/adminLogin';
import FormBuilder from "./pages/FormBuilder/Main";
import CsvParser from "./pages/CsvParser/Main";
import StudentAptitude from "./pages/Student/Aptitude";
import Playground from "./pages/compiler/Playground";
import ClientProfile from "./pages/Admin/clientProfile";
import Landing from "./pages/landing_page/Landing";
import CompilerHome from "./pages/compiler/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./pages/landing_page/header/Header";
import Main from "./pages/FormBuilder/Main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Registartion from "./pages/ClientRegistration/Registration";
import { Navigate } from "react-router-dom";
import ClientLogin from "./pages/ClientRegistration/ClientLogin";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/compiler" element={<CompilerHome />} />
        <Route path="/compiler/playground" element={<Playground />} />
        <Route path="/form" element={<FormBuilder />} />
        <Route path="/parser" element={<CsvParser />} />
        <Route path="/apt" element={<StudentAptitude />} />
        <Route path="/formBuilder" element={<Main />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/admin/client-profile" element={<ClientProfile/>}/>

        <Route path="/client/registration" element={<Registartion/>} />
        <Route path = "/client/login" element={<ClientLogin/>}/>
        
        <Route path="/clientdashboard" element={<ClientDashboard />}>
          <Route index element={<ClientDashboardAppPage />} />
          <Route path="app" element={<ClientDashboardAppPage />} />
          <Route path="candidate" element={<CandidatePage />} />
          <Route path="schedule-interview" element={<InterviewPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
