import { Box, InputAdornment, TextField } from "@mui/material";

export const CustomInput = (props) => {
  const {
    label,
    startAdornment,
    endAdornment,
    type,
    error,
    helperText,
    onChange,
    name,
    disabled,
  } = props;
  return (
    <Box>
      <TextField
        label={label}
        size="small"
        name={name}
        onChange={onChange}
        fullWidth
        type={type || "text"}
        slotProps={{
          input: {
            startAdornment: startAdornment && (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ),
            endAdornment: endAdornment && (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ),
          },
        }}
        helperText={helperText}
        error={error}
        disabled={disabled}
      />
    </Box>
  );
};
