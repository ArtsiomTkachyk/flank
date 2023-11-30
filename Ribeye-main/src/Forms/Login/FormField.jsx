import React from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

function FormField({
  label,
  name,
  type,
  value,
  onChange,
  showPassword,
  togglePasswordVisibility,
}) {
  return (
    <div className="w-full mt-4">
      {type === "password" ? (
        <FormControl
          className="outlined_input"
          sx={{ width: "100%" }}
          variant="outlined"
        >
          <InputLabel htmlFor={`outlined-adornment-${name}`}>
            {label}
          </InputLabel>
          <OutlinedInput
            autoComplete=""
            id={`outlined-adornment-${name}`}
            type={showPassword ? "text" : "password"}
            name={name}
            value={value}
            onChange={onChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePasswordVisibility}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOffOutlinedIcon
                      style={{ fontSize: "20px" }}
                      className="text-[#708090]"
                    />
                  ) : (
                    <VisibilityOutlinedIcon
                      style={{ fontSize: "20px" }}
                      className="text-[#708090]"
                    />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label={label}
          />
        </FormControl>
      ) : (
        <TextField
          autoComplete=""
          id={`outlined-basic-${name}`}
          className="w-full outline-none"
          label={label}
          variant="outlined"
          name={name}
          type={type}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}

export default FormField;
