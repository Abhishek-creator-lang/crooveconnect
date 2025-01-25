import { Box } from "@mui/material";
import { styles } from "./TwoColumnLayoutStyles";

export const TwoColumnLayout = (props) => {
  const { LeftComponent, RightComponent } = props;
  return (
    <Box sx={styles.layoutContainer}>
      <Box>{LeftComponent}</Box>
      <Box>{RightComponent}</Box>
    </Box>
  );
};
