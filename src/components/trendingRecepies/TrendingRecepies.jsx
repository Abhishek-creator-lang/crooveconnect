import { Typography, Stack } from "@mui/material";
import React from "react";
import { recepieDAta } from "../../recepieData";
import { CustomCard } from "../CustomCard/CustomCard";

export const TrendingRecepies = () => {
  return (
    <>
      <Typography
        component="h1"
        fontSize="1.5rem"
        color="primary"
        marginBottom="10px"
        fontWeight={600}
      >
        Trending Recipes
      </Typography>
      <Stack direction="row" gap="10px" sx={{ overflow: "auto" }}>
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
    </>
  );
};
