import { createBrowserRouter } from "react-router-dom";
//layouts
import Layout from "../common/layouts";
import Root from "../common/layouts/root";
import Auth from "../common/layouts/auth";

//pages
import Home from "../pages/home";
// import Profile from "../pages/profile";

import Register from "../pages/signUp";
import Login from "../pages/signIn";
import NotFound from "../pages/notFound";
import GoalsPage from "../pages/goals";
import Profile from "../pages/profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/goals",
            element: <GoalsPage />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/auth",
        element: <Auth />,
        children: [
          {
            path: "/auth/signin",
            element: <Login />,
          },
          {
            path: "/auth/signup",
            element: <Register />,
          },
        ],
      },
      {
        // This is the notFound route
        path: "*",
        element: <NotFound/>,
      },
    ],
  },
]);

export default router;
