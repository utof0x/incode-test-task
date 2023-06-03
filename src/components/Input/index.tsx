import { useState } from "react";
import { TextField } from "@mui/material";

import styles from "./Input.module.scss";

type Props = {
  type: "text" | "password";
  label: string;
  value: string;
  error: boolean;
  onChange: (value: string) => void;
};

export const Input = ({ type, label, value, error, onChange }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.wrapper}>
      <TextField
        label={label}
        type={type}
        variant="standard"
        value={value}
        error={error}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "328px",
          height: "59px",
          fontFamily: "Montserrat",

          "& .MuiInputBase-root": {
            width: "100%",
            margin: 0,
            letterSpacing: 0,
            ":before": {
              transition: "none",
              borderColor: "white",
            },
            ":after": {
              transition: "none",
              borderBottom: "1px solid #fff",
            },
            ":hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "1px solid #fff",
            },
          },

          "& .MuiInput-input": {
            height: 25,
            padding: "5.5px 0",
            lineHeight: "25px",
            color: "rgba(255, 255, 255, 0.7)",
            textOverflow: "ellipsis",
          },
        }}
        InputLabelProps={{
          sx: {
            color: "#fff",
            fontFamily: "Montserrat",
            fontSize: "14px",
            lineHeight: "22px",
            letterSpacing: 0,

            "&.Mui-focused": {
              color: "#fff",
            },
          },
        }}
      />
    </div>
  );
};
