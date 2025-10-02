import type { JSX } from "react";
import { TextField } from "@mui/material";
import { formattaTimer } from "../../utils";

export const Timer = ({ timer }: { timer: number | null }): JSX.Element | null => {
  if (timer == null) return null;

  return <TextField disabled fullWidth value={formattaTimer(timer)} className={"timer" + (timer <= 5000 ? " expiringTime" : "")} />;
};
