import { Alert, Button } from "@mui/material";
import type { JSX, MouseEventHandler } from "react";
import type { AlertInfoProps } from "../types";

export const AlertInfo = ({ onClick, msg }: { onClick: MouseEventHandler; msg: string }): JSX.Element => (
  <Alert
    severity="error"
    action={
      <Button
        variant="outlined"
        size="small"
        onClick={onClick}
        sx={{
          textTransform: "none",
          color: "#d32f2f",
          borderColor: "#d32f2f",
          "&:hover": {
            bgcolor: "#d32f2f",
            color: "white",
          },
        }}
      >
        Riprova
      </Button>
    }
  >
    {msg}
  </Alert>
);

export const alertInfoDefault: AlertInfoProps = {
  show: false,
  msg: "",
};
