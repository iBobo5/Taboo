import type { JSX } from "react";
import { Badge, Stack, Typography } from "@mui/material";
import type { SquadraPartecipanteProps } from "../types";
import { theme } from "../../theme";
import { useIsMobileMode } from "../../container/TabooContext";

export const SquadraPartecipante = (props: SquadraPartecipanteProps): JSX.Element | null => {
  const { squadraPartecipante, punteggi, squadre } = props;

  const mobileMode: boolean = useIsMobileMode();

  if (squadraPartecipante == null) return null;

  return (
    <Stack sx={{ mt: mobileMode ? "1rem" : "2rem" }}>
      <Badge
        badgeContent={punteggi[squadraPartecipante]}
        sx={{ margin: "auto" }}
        slotProps={{
          badge: {
            sx: {
              border: "1px solid " + theme.palette.primary.main,
              borderRadius: "50%",
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.common.white,
              fontSize: "20px",
              height: "40px",
              width: "40px",
            },
          },
        }}
      >
        <Typography className="squadraPartecipante">{squadre[squadraPartecipante]}</Typography>
      </Badge>
    </Stack>
  );
};
