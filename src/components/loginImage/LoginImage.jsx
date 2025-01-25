import { Box, Typography } from "@mui/material";
import StudentImage from "../../assets/recipe.webp";

export const LoginImage = () => {
  return (
    <Box sx={{ backgroundColor: "primary.main", position: "relative", height:"100%" }}>
      <Typography
        component="img"
        src={StudentImage}
        sx={{
          width: "100%",
          height: "600px",
          objectFit: "contain",
          position: "absolute",
          bottom: "0px",
        }}
      />
    </Box>
  );
};
