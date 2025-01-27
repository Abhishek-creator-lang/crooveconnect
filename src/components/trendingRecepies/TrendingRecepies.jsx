import { Typography, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAPI } from "../../hooks/useAPI";
import { recepieDAta } from "../../recepieData";
import { APIRequestType } from "../../utils/constant";
import { CustomCard } from "../CustomCard/CustomCard";

export const TrendingRecepies = () => {
  const { data, loading, error, callAPI } = useAPI({
    type: APIRequestType.get,
    isPublic: true,
  });
  const navigate = useNavigate();

  const { data: trendingRecipeData } = data || {};

  useEffect(() => {
    callAPI("api/get-trending-recipe");
  }, []);

  console.log(trendingRecipeData, "trendingRecipeData");
  return (
    <>
      <Typography
        component="h1"
        fontSize="1.5rem"
        color="primary"
        marginBottom="10px"
        marginTop={"10px"}
        fontWeight={600}
      >
        Trending Recipes
      </Typography>
      <Stack direction="row" gap="10px" sx={{ overflow: "auto" }}>
        {trendingRecipeData?.map((recepie) => {
          const { description, image, recipe_name, recipe_id } = recepie;
          return (
            <CustomCard
              cardHeading={recipe_name}
              image={image}
              cardDescription={description}
              onViewDetail={() => {
                navigate(`/recipeDetail/${recipe_id}`);
              }}
            />
          );
        })}
      </Stack>
    </>
  );
};
