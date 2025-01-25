import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { CustomChip } from "../../components/customChip/CustomChip";
import { CustomRating } from "../../components/customRating/customRating";
import { recepieDAta } from "../../recipeDetail";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import Grid from "@mui/material/Grid2";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CustomSlider } from "../../components/customSlider/CustomSlider";
import DifferenceIcon from '@mui/icons-material/Difference';

export const RecipeDetail = (props) => {
  const [recipeData, setRecipeData] = useState(recepieDAta);
  const { steps, ingredients, title, description, difficulty, cuisine, image } =
    recipeData;
  return (
    <Box padding={"10px"}>
      <Grid container sx={{ marginBottom: "20px", marginTop: "20px" }}>
        <Grid item size={{ md: 4 }}>
          <Typography
            component={"img"}
            src={image}
            alt="image"
            sx={{
              width: "100%",
              height: "100%",
              maxWidth: "300px",
              maxHeight: "300px",
            }}
          />
        </Grid>
        <Grid item size={{ md: 8 }}>
          <Box flexGrow={1}>
            <Typography component={"h1"} fontSize="2rem">
              {title}
            </Typography>
            <Typography marginBottom="10px">{description}</Typography>
            <CustomRating />
            <Stack
              direction={"row"}
              marginTop="10px"
              gap="10px"
              alignItems="center"
            >
              <CustomChip
                icon={<FavoriteIcon fontSize="sm" />}
                label="Favorites"
              />
              <CustomChip label={difficulty} icon={<DifferenceIcon fontSize="sm" />}/>
              <CustomChip
                label={cuisine}
                icon={<ClearAllIcon fontSize="sm" />}
              />
              <Box
                sx={{
                  marginLeft: "15px",
                  display: "flex",
                  minWidth: "100px",
                  gap: "20px",
                  alignItems: "center",
                  flexGrow: 1,
                  justifySelf:"end",
                  justifyContent:"end"
                }}
              >
                <Typography fontWeight={600}>servings:</Typography>
                <Box sx={{ minWidth: "100px" }}>
                  <CustomSlider />
                </Box>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item size={{ md: 4 }}>
          <Stack direction="row" gap="50px" alignItems="center">
            <Typography fontWeight={600} fontSize="1rem">
              Ingredients
            </Typography>
          </Stack>
          {ingredients?.map((ingredient, index) => {
            return (
              <Box>
                <Typography>{ingredient}</Typography>
              </Box>
            );
          })}
        </Grid>
        <Grid item size={{ md: 8 }}>
          <Typography fontWeight={600} fontSize="1rem">
            Steps
          </Typography>
          {steps?.map((step, index) => {
            return (
              <Box>
                <Typography>Step {index+1}</Typography>
                <Typography>{step}</Typography>
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};
