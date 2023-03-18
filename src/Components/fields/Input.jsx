import React from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

const Input = (props) => {
  const { label, value, formdata, handleChange } = props;
  return (
    <>
      {/* <label htmlFor={value}>{label}</label> */}
      <Box>
        <TextField
          margin="normal"
          fullWidth
          label="Outlined"
          variant="outlined"
          {...props}
          id={value}
          name={value}
          value={formdata.value}
          onChange={(e) => handleChange(e)}
        />
      </Box>
    </>
  );
};

export default Input;
