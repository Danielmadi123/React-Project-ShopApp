import React from "react";
import { TextField } from "@mui/material";

const CardField = ({
  id,
  label,
  value,
  onChange,
  required,
  error,
  helperText,
}) => {
  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      sx={{ mt: "10px" }}
      onChange={onChange}
      value={value}
      required={required}
      error={error}
      helperText={helperText}
    />
  );
};

export default CardField;
