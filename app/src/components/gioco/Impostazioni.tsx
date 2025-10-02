import { useState, type ChangeEvent, type JSX } from "react";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { useCategorie, useDurate } from "../../container/TabooContext";
import { Squadra } from "./Squadra";
import { capitalizePhrase } from "../../utils";
import type { ImpostazioniProps } from "../types";

const CATEGORIA_CASUALE: string = "Random";

const Impostazioni = (props: ImpostazioniProps): JSX.Element => {
  const { categorieTerminate, onStart } = props;
  const [durataSelezionata, setDurataSelezionata] = useState<number | null>(null);
  const [categoriaSelezionata, setCategoriaSelezionata] = useState<string | null>(null);
  const [squadra1, setSquadra1] = useState<string>("Squadra 1");
  const [squadra2, setSquadra2] = useState<string>("Squadra 2");

  const durate: number[] = useDurate();
  let categorie: string[] = useCategorie();

  categorie = [...categorie.sort(), CATEGORIA_CASUALE];

  const handleNomeChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, onChange: (nome: string) => void) => {
    var value = e.target.value;
    const regex = /^([a-zàèìòù0-9]+[\s]?[']?)+$/i;

    if (value.length === 0 || regex.test(value.toLowerCase())) onChange(capitalizePhrase(value));
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="h6" className="impostazioniLabel" mr={2}>
          Seleziona la durata del gioco:
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <Grid container spacing={2}>
          {durate.map((durata: number, index: number) => (
            <Grid size={{ xs: 4, sm: 12 / durate.length }} key={index}>
              <Button
                fullWidth
                color="primary"
                variant={durata === durataSelezionata ? "contained" : "outlined"}
                onClick={() => setDurataSelezionata(durata)}
              >
                {durata + " secondi"}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid size={12}>
        <Divider />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Typography variant="h6" className="impostazioniLabel">
          Seleziona la cateoria di parole:
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <Grid container spacing={2}>
          {categorie.map((categoria: string, index: number) => (
            <Grid size={{ xs: 4, sm: categorie.length < 5 ? 12 / categorie.length : 3 }} key={index}>
              <Button
                fullWidth
                disabled={categorieTerminate.includes(categoria)}
                color="primary"
                variant={categoria === categoriaSelezionata ? "contained" : "outlined"}
                onClick={() => setCategoriaSelezionata(categoria)}
              >
                {categoria}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid size={12}>
        <Divider />
      </Grid>
      <Squadra label="Nome squadra 1" value={squadra1} onChange={(e) => handleNomeChange(e, setSquadra1)} />
      <Grid size={12}>
        <Divider />
      </Grid>
      <Squadra label="Nome squadra 2" value={squadra2} onChange={(e) => handleNomeChange(e, setSquadra2)} />
      <Grid size={12}>
        <Divider />
      </Grid>
      <Grid size={12} textAlign="center">
        <Button
          disabled={!durataSelezionata || !categoriaSelezionata || squadra1.trim().length === 0 || squadra2.trim().length === 0}
          variant="contained"
          onClick={() => onStart({ durata: durataSelezionata!, categoria: categoriaSelezionata!, squadra1, squadra2 })}
        >
          Inizia la partita
        </Button>
      </Grid>
    </Grid>
  );
};

export { CATEGORIA_CASUALE, Impostazioni };
