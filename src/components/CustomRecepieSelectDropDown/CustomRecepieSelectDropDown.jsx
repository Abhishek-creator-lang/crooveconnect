import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { ListSubheader } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const MultipleSelectChip = (props) => {
  const { label, displayData, handleChangeFilter, value = [] } = props;
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value, "Selected Ingredients");
    setPersonName(value);
    handleChangeFilter(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }} size="small">
        <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected?.map((value) => (
                <Chip
                  key={value.ingredient_name}
                  label={value.ingredient_name}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {displayData?.map((data) => {
            const items = data?.ingredients?.map((ingredient) => (
              <MenuItem key={ingredient.ingredient_name} value={ingredient}>
                {ingredient.ingredient_name}
              </MenuItem>
            ));
            return [<ListSubheader>{data.category_name}</ListSubheader>, items];
          })}
        </Select>
      </FormControl>
    </div>
  );
};
