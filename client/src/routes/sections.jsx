import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "../layouts/dashboard";
import RegisterPage from "../pages/register";
import InterviewDetails from "../sections/interviews/interview-details/interview-details-view";
import CreateInterviewPage from "../sections/create-interview/view/create-interview-view";
import Profile from "../pages/profile";

export const IndexPage = lazy(() => import("../pages/app"));
export const TempPage = lazy(() => import("../pages/temp"));
export const BlogPage = lazy(() => import("../pages/blog"));
export const UserPage = lazy(() => import("../pages/user"));
export const LoginPage = lazy(() => import("../pages/login"));
export const ProductsPage = lazy(() => import("../pages/products"));
export const Page404 = lazy(() => import("../pages/page-not-found"));

// ----------------------------------------------------------------------

export default function Router() {
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
        { path: "/create-interview", element: <CreateInterviewPage /> },
        { path: "/profile", element: <Profile /> },
        { path: "user", element: <UserPage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "blog", element: <BlogPage /> },
        { path: "temp", element: <TempPage /> },
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
