import type { JSX } from "react";
import { Badge as MuiBadge, Button, Grid, Stack, Typography, type BadgeProps } from "@mui/material";
import styled from "@emotion/styled";
import { useParole } from "../../container/TabooContext";
import type { BottomCardButtonsProps, TabooCardProps } from "../types";
import { theme } from "../../theme";

const Badge = styled((props: BadgeProps) => <MuiBadge {...props} />)(() => ({
  "& .MuiBadge-badge": { backgroundColor: "white", borderRadius: "10px", fontSize: "0.9em", padding: 0 },
}));

export const BottomCardButtons = (props: BottomCardButtonsProps): JSX.Element => {
  const { onError, onSuccess, onPass, idsSbagliati, idsIndovinati, idsPassati, timerCompleted, disablePass } = props;

  const parole = useParole();

  return (
    <Grid size={12}>
      <Grid container spacing={{ xs: 2, md: 8 }}>
        <Grid size={4} textAlign="center">
          <Stack>
            <Badge badgeContent={idsSbagliati.length} slotProps={{ badge: { sx: { border: "1px solid red", color: "red" } } }}>
              <Button fullWidth className="bottomCardButton wrongButton" onClick={onError} disabled={timerCompleted}>
                Tabù
              </Button>
            </Badge>
            {idsSbagliati.map((id: number, index: number) => (
              <Typography key={index} className="wrongWord">
                {parole.find((parola: TabooCardProps) => parola.id === id)!.guess}
              </Typography>
            ))}
          </Stack>
        </Grid>
        <Grid size={4} textAlign="center">
          <Stack>
            <Badge
              badgeContent={idsPassati.length}
              slotProps={{ badge: { sx: { border: "1px solid " + theme.palette.primary.light, color: theme.palette.primary.light } } }}
            >
              <Button fullWidth className="bottomCardButton passButton" disabled={disablePass || timerCompleted} onClick={onPass}>
                Passo
              </Button>
            </Badge>
            {idsPassati.map((id: number, index: number) => (
              <Typography key={index} className="passWord">
                {parole.find((parola: TabooCardProps) => parola.id === id)!.guess}
              </Typography>
            ))}
          </Stack>
        </Grid>
        <Grid size={4} textAlign="center">
          <Stack>
            <Badge badgeContent={idsIndovinati.length} slotProps={{ badge: { sx: { border: "1px solid green", color: "green" } } }}>
              <Button fullWidth className="bottomCardButton correctButton" onClick={onSuccess} disabled={timerCompleted}>
                Corretto
              </Button>
            </Badge>
            {idsIndovinati.map((id: number, index: number) => (
              <Typography key={index} className="correctWord">
                {parole.find((parola: TabooCardProps) => parola.id === id)!.guess}
              </Typography>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};
