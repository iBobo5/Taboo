import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import type { JSX } from "react";
import { Header } from "../shared";
import type { FineGiocoProps } from "../types";

export const FineGioco = (props: FineGiocoProps): JSX.Element => {
  const { punteggi, squadre, onClick } = props;

  const vincitore: number | null = punteggi[0] > punteggi[1] ? 0 : punteggi[1] > punteggi[0] ? 1 : null;

  return (
    <Box>
      <Header />
      <Grid container spacing={2}>
        <Grid size={12} textAlign="center" sx={{ mb: "2rem" }}>
          <Typography variant="h4">La partita è terminata con questo punteggio</Typography>
        </Grid>
        {squadre.map((squadra: string, index: number) => (
          <Grid size={{ xs: 12, sm: 6 }} key={index} textAlign="center">
            <Stack className={index === vincitore ? "winner" : "punteggioFinale"}>
              <Typography>{squadra}</Typography>
              <Typography>{punteggi[index]}</Typography>
            </Stack>
          </Grid>
        ))}
        <Grid size={12} textAlign="center" sx={{ mt: "2rem" }}>
          <Button variant="contained" onClick={onClick}>
            Clicca per iniziare una nuova partita
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
