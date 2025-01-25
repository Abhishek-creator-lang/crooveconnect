import { Box, Typography, Stack, Item } from "@mui/material";
import React from "react";
import { CustomCard } from "../../components/CustomCard/CustomCard";
import { RecepieFilter } from "../../components/recepieFilter/RecepieFilter";
import { TrendingRecepies } from "../../components/trendingRecepies/TrendingRecepies";
import { recepieDAta } from "../../recepieData";
import Grid from "@mui/material/Grid2";

export const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: "10px" }}>
      <Stack
        direction={"row"}
        gap="10px"
        alignItems="center"
        marginBottom="10px"
        marginTop="10px"
      >
        <Typography component={"h1"} color="primary" fontSize="2rem">
          Hi! Abhishek,{" "}
        </Typography>
        <Typography fontSize="1.5rem" color="textSecondary">
          What are you cooking today?
        </Typography>
      </Stack>
      <RecepieFilter />
      <Box>
        <TrendingRecepies />
        <Box>
          <Typography
            component="h1"
            fontSize="1.5rem"
            color="primary"
            marginBottom="10px"
            fontWeight={600}
          >
            Suggested Recipes
          </Typography>
          <Stack direction="row" gap="10px">
            {recepieDAta.map((recepie) => {
              const { description, image, title } = recepie;
              return (
                <CustomCard
                  cardHeading={title}
                  image={image}
                  cardDescription={description}
                />
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
