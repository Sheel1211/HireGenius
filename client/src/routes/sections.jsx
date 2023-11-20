import { lazy, Suspense, useEffect } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "../layouts/dashboard";
import RegisterPage from "../pages/register";
import InterviewDetails from "../sections/interviews/interview-details/interview-details-view";
import CreateInterviewPage from "../sections/create-interview/view/create-interview-view";
import Profile from "../pages/profile";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../store/slices/UserSlice";
import Cookies from "js-cookie";
import axios from "axios";
import config from "../utils/config";
import RoundDetailsView from "../sections/interviews/round-details/round-details-view";

export const IndexPage = lazy(() => import("../pages/app"));
export const LoginPage = lazy(() => import("../pages/login"));
export const ProductsPage = lazy(() => import("../pages/products"));
export const Page404 = lazy(() => import("../pages/page-not-found"));
export const CreateAptitude = lazy(() =>
  import("../sections/FormBuilder/Aptitude/Main")
);

// ----------------------------------------------------------------------

export default function Router() {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.User);

  useEffect(() => {
    async function fetchData(token) {
      try {
        const response = await axios.get(
          "http://127.0.0.1:4000/api/user/me/" + token,
          config
        );
        const user = response.data.user;
        dispatch(getUserDetails(user));
      } catch (error) {
        // Handle errors, e.g., unauthorized access
        console.log(error);
      }
    }
    const token = Cookies.get("token");
    if (token) {
      fetchData(token);
    } else {
      // setIsLoading(false);
    }
  }, [dispatch]);

  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: "/", element: <IndexPage /> },
        { path: "/:interview", element: <InterviewDetails /> },
        { path: "/:interview/:roundId", element: <RoundDetailsView /> },
        { path: "/create-interview", element: <CreateInterviewPage /> },
        { path: "create/aptitude", element: <CreateAptitude /> },
        { path: "/profile", element: <Profile /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "signup",
      element: <RegisterPage />,
    },
    {
      path: "404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
