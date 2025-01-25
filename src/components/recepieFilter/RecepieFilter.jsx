import React from "react";
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
import { cuisineSelection, difficultySelection, ratingSelection } from "../../utils/constant";

export const RecepieFilter = () => {
  return (
    <Box>
      <Stack direction="row" sx={{ width: "100%", gap: "10px" }}>
        <Box sx={{ flexGrow: 1 }}>
          <CustomInput
            placeholder="find recepie"
            startAdornment={<SearchIcon />}
          />
        </Box>
        <Button variant="contained" endIcon={<AddAPhotoIcon />}>
          Upload ingredients
        </Button>
      </Stack>
      <Stack direction="row" alignItems="center" gap="10px">
        <MultipleSelectChip />
        <CustomChip icon={<FavoriteIcon fontSize="sm" />} label="Favorites" />
        <ChipSelect SelectIcon={ClearAllIcon} selectLabel="Cuisine" items={cuisineSelection}/>
        <ChipSelect SelectIcon={StarBorderIcon} selectLabel="Rating" items={ratingSelection}/>
        <ChipSelect SelectIcon={AccessAlarmIcon} selectLabel="Difficulty" items={difficultySelection} />
      </Stack>
    </Box>
  );
};
