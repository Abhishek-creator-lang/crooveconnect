import { createBrowserRouter } from "react-router-dom";
import { LayoutWithHeader } from "../layout/LayoutWithHeader";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { ROUTES } from "./routesConstant";
import { withPublicAccess } from "../hoc/withPublicAccess";

const LayoutWithHeaderPublicAccess = withPublicAccess(LayoutWithHeader);

export const routesConfig = createBrowserRouter([
  {
    path: ROUTES.empty,
    element: <LayoutWithHeaderPublicAccess />,
    children: [
      {
        path: ROUTES.dashboard,
        element: <Dashboard />,
      },
    ],
  },
]);
