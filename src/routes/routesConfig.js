import { createBrowserRouter } from "react-router-dom";
import { LayoutWithHeader } from "../layout/LayoutWithHeader";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { ROUTES } from "./routesConstant";
import { withPublicAccess } from "../hoc/withPublicAccess";
import { Login } from "../pages/login/Login";
import { Signup } from "../pages/signup/Signup";
import { RecipeDetail } from "../pages/recipeDetail/RecipeDetail";
import { LayoutWithOutHeader } from "../layout/LayoutWithOutHeader";

const LayoutWithHeaderPublicAccess = withPublicAccess(LayoutWithHeader);
const LayoutWithOutHeaderPublicAccess = withPublicAccess(LayoutWithOutHeader);

export const routesConfig = createBrowserRouter([
  {
    path: ROUTES.empty,
    element: <LayoutWithHeaderPublicAccess />,
    children: [
      {
        path: ROUTES.dashboard,
        element: <Dashboard />,
      },
      {
        path: ROUTES.recipeDetail,
        element: <RecipeDetail />,
      },
    ],
  },
  {
    path: ROUTES.empty,
    element: <LayoutWithOutHeaderPublicAccess />,
    children: [
      {
        path: ROUTES.login,
        element: <Login />,
      },
      {
        path: ROUTES.signup,
        element: <Signup />,
      }
    ],
  },
]);
