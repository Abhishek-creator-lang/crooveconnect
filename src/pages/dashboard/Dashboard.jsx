import { Box, Typography, Stack, Item } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomCard } from "../../components/CustomCard/CustomCard";
import { RecepieFilter } from "../../components/recepieFilter/RecepieFilter";
import { TrendingRecepies } from "../../components/trendingRecepies/TrendingRecepies";
import { recepieDAta } from "../../recepieData";
import Grid from "@mui/material/Grid2";
import { APIRequestType } from "../../utils/constant";
import { useAPI } from "../../hooks/useAPI";
import { useNavigate } from "react-router-dom";
import qs from "query-string";
import { convertToBase64, recognizeImage } from "../../utils";

export const Dashboard = () => {
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();
  const { data, loading, error, callAPI } = useAPI({
    type: APIRequestType.get,
    isPublic: true,
  });
  const { data: suggestedRecipes } = data || [];

  const handleChangeFilter = (key, value) => {
    setFilters((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  useEffect(() => {
    const newQsValue = qs.stringify(
      { ...filters },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );
    callAPI(`api/get-recipe/?${newQsValue}`);
  }, [filters]);


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
      <RecepieFilter
        handleChangeFilter={handleChangeFilter}
        filterData={filters}
      />
      <Box>
        {suggestedRecipes?.length ? (
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
              {suggestedRecipes?.map((recepie) => {
                const { recipe_description, image, recipe_name, recipe_id } =
                  recepie;
                return (
                  <CustomCard
                    cardHeading={recipe_name}
                    image={image}
                    cardDescription={recipe_description}
                    onViewDetail={() => {
                      navigate(`/recipeDetail/${recipe_id}`);
                    }}
                  />
                );
              })}
            </Stack>
          </Box>
        ) : (
          <></>
        )}
        <TrendingRecepies />
      </Box>
    </Box>
  );
};
