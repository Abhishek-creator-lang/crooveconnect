import { createTheme } from "@mui/material/styles";
import { COLORS } from "./color";

let lightTheme = createTheme({
  palette: {
    primary: {
      main: COLORS.primary,
    }
  },
});

export { lightTheme };
