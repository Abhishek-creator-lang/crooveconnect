import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";

import { Box, Stack, Typography, Button, IconButton } from "@mui/material";
import { CustomChip } from "../customChip/CustomChip";
import { CustomInput } from "../customInput/CustomInput";
import { MultipleSelectChip } from "../CustomRecepieSelectDropDown/CustomRecepieSelectDropDown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { ChipSelect } from "../chipSelect/ChipSelect";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CloseIcon from "@mui/icons-material/Close";
import {
  APIRequestType,
  cuisineSelection,
  difficultySelection,
  ratingSelection,
} from "../../utils/constant";
import { useAPI } from "../../hooks/useAPI";
import { convertToBase64, recognizeImage } from "../../utils";

export const RecepieFilter = (props) => {
  const { handleChangeFilter, filterData = {} } = props;
  const [recognizedLabels, setRecognizedLabels] = useState([]);
  const {
    data: ingredientsData,
    loading,
    error,
    callAPI,
  } = useAPI({
    type: APIRequestType.get,
    isPublic: true,
  });

  useEffect(() => {
    // Flatten the ingredient data for Fuse.js
    // Flatten the ingredient data into a searchable format
    const ingredientData = ingredientsData?.data?.flatMap((category) =>
      category.ingredients.map((ingredient) => ({
        ingredient_id: ingredient.ingredient_id,
        ingredient_name: ingredient.ingredient_name,
      }))
    );

    // Set up Fuse.js options
    const options = {
      includeScore: true,
      threshold: 0.3, // Adjust this threshold for more or less strict matching
      keys: ["ingredient_name"], // The key to search in the objects
    };

    // Create a Fuse instance
    const fuse = new Fuse(ingredientData, options);

    // Perform fuzzy matching
    const matchedIngredients = recognizedLabels
      ?.map((label) => {
        const result = fuse.search(label);
        if (result.length > 0) {
          const matchedItem = result[0].item; // Get the best match
          return {
            ingredient_id: matchedItem.ingredient_id,
            ingredient_name: matchedItem.ingredient_name,
          };
        }
        return null; // No match found
      })
      .filter((item) => item !== null); // Filter out nulls
    handleChangeFilter("ingredients", matchedIngredients);
  }, [recognizedLabels, ingredientsData]);

  useEffect(() => {
    callAPI("api/get-ingredients");
  }, []);
  console.log(ingredientsData, "data3");

  const handleImageChange = async (e) => {
    console.log("hhha");
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        const data = await recognizeImage(base64);
        console.log(data, "data.recognizedLabels");
        setRecognizedLabels(data.recognizedLabels);
      } catch (error) {
        console.error("Error converting image to Base64:", error);
      }
    }
  };

  return (
    <Box>
      <Stack direction="row" sx={{ width: "100%", gap: "10px" }}>
        <Box sx={{ flexGrow: 1 }}>
          <CustomInput label="Search by name" startAdornment={<SearchIcon />} />
        </Box>
        <Button
          variant="contained"
          endIcon={<AddAPhotoIcon />}
          component="label"
        >
          <Typography
            component="input"
            type="file"
            onChange={handleImageChange}
            sx={{ visibility: "hidden", height: "0px", width: "0px" }}
          />
          Upload ingredients
        </Button>
      </Stack>
      <Stack direction="row" alignItems="center" gap="10px" marginTop="5px">
        <MultipleSelectChip
          label="Filter by ingredients"
          displayData={ingredientsData?.data}
          handleChangeFilter={(value) => {
            handleChangeFilter(
              "ingredients",
              value?.map((data) => data.ingredient_id)
            );
          }}
          value={filterData.ingredients}
        />
        <CustomChip
          icon={
            <FavoriteIcon
              fontSize="sm"
              color={filterData.isFavorite ? "primary" : "text.secondary"}
            />
          }
          label="Favorites"
          onClick={() => {
            handleChangeFilter("isFavorite", !filterData.isFavorite);
          }}
        />
        <ChipSelect
          SelectIcon={filterData?.cuisine ? CloseIcon : ClearAllIcon}
          onClick={() => handleChangeFilter("cuisine", undefined)}
          selectLabel={
            filterData?.cuisine ? (
              <Stack direction="row">
                <Typography>{filterData?.cuisine}</Typography>
              </Stack>
            ) : (
              "Cuisine"
            )
          }
          items={cuisineSelection}
          handleChange={(value) => {
            handleChangeFilter("cuisine", value);
          }}
          onClickIcon={() => {
            filterData?.cuisine && handleChangeFilter("cuisine", "");
          }}
        />
        <ChipSelect
          SelectIcon={StarBorderIcon}
          selectLabel="Rating"
          items={ratingSelection}
          handleChange={(value) => {
            handleChangeFilter("rating", value);
          }}
        />
        <ChipSelect
          SelectIcon={AccessAlarmIcon}
          selectLabel="Difficulty"
          items={difficultySelection}
          handleChange={(value) => {
            handleChangeFilter("difficulty", value);
          }}
        />
      </Stack>
    </Box>
  );
};
