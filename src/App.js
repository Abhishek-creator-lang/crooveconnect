import React from "react";
import { ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { lightTheme } from "./theme/theme";
import { routesConfig } from "./routes/routesConfig";

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <RouterProvider router={routesConfig} />
    </ThemeProvider>
  );
};

export default App;
