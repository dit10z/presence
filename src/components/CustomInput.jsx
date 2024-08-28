import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";

const FormFieldDate = styled(DatePicker)({
  width: "100%",
});

const CustomInput = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  helperText,
  showPassword,
  handleTogglePasswordVisibility,
  options, // For select type
  slotProps, // For date picker
  slots, // For date picker
}) => {
  return type === "password" ? (
    <TextField
      label={label}
      name={name}
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
    />
  ) : type === "select" ? (
    <TextField
      select
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      fullWidth
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  ) : type === "date" ? (
    <FormFieldDate
      label={label}
      value={value}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <CalendarTodayIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      )}
      {...slotProps}
      {...slots}
    />
  ) : (
    <TextField
      label={label}
      name={name}
      type="text"
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      fullWidth
    />
  );
};

export default CustomInput;
