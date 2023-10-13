import React, { useEffect, useState } from "react";
import Signin from "./pages/auth/Signin";

import "./index.css";
import ClientDashboard from "./pages/ClientDashboard/layout";
import ClientDashboardAppPage from "./pages/ClientDashboard/appPage";
import CandidatePage from "./pages/ClientDashboard/candidatePage";
import InterviewPage from "./pages/ClientDashboard/interviewPage";
import AdminDashboard from "./pages/Admin/adminDashboard";
import AdminLogin from "./pages/Admin/adminLogin";
import FormBuilder from "./pages/FormBuilder/Main";
import ClientProfile from "./pages/Admin/clientProfile";
import Landing from "./pages/landing_page/Landing";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./pages/landing_page/header/Header";
import Main from "./pages/FormBuilder/Main";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Registration from "./pages/ClientRegistration/Registration";
import Registartion from "./pages/ClientRegistration/Registration";
import { Navigate } from "react-router-dom";
import axios from "axios";
// import MeetHome from "./pages/Meet/home"
import { useDispatch, useSelector } from "react-redux";
import ClientLogin from "./pages/ClientRegistration/ClientLogin";
import { getUserDetails } from "./store/slices/UserSlice";
import CandidateAptitude from "./pages/Candidate/Aptitude";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import CompilerForm from "./pages/FormBuilder/compilerForm/CompilerForm";

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  mode: "cors",
  credentials: "include",
  withCredentials: true,
};



const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const userDetails = useSelector((state) => state.User);
  console.log("details", userDetails);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:4000/api/user/me",
          config
        );
        const user = response.data.user;
        console.log("user in app.jsx",user);
        dispatch(getUserDetails(user));
        setIsLoading(false);
      } catch (error) {
        // Handle errors, e.g., unauthorized access
        setIsLoading(false);
      }
    }
    fetchData();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/create/compiler" element={<CompilerForm />} />

        {/* <Route path="/meet" element={<MeetHome/>}/> */}
        {/* Candidate */}

        <Route path="/aptitude/:aptitudeId" element={<CandidateAptitude />} />
        
        {/* <Route path="/compiler" element={<CompilerHome />} />
        <Route path="/compiler/playground" element={<Playground />} /> */}

        {/* Client */}
        <Route path="/client/registration" element={<Registartion />} />
        <Route path="/client/login" element={<ClientLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {userDetails &&
          userDetails.User &&
          userDetails.User.role === "client" && (
            <>
              <Route path="/create/aptitude" element={<FormBuilder />} />
              <Route path="/formBuilder" element={<Main />} />
              <Route path="/clientdashboard" element={<ClientDashboard />}>
                <Route index element={<ClientDashboardAppPage />} />
                <Route path="app" element={<ClientDashboardAppPage />} />
                <Route path="candidate" element={<CandidatePage />} />
                <Route path="schedule-interview" element={<InterviewPage />} />
              </Route>
            </>
          )}
        {userDetails &&
          userDetails.User &&
          userDetails.User.role === "admin" && (
            <>
              <Route path="/admindashboard" element={<AdminDashboard />} />
              <Route path="/admin/client-profile" element={<ClientProfile />} />
            </>
          )}
        {/* Admin */}

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
