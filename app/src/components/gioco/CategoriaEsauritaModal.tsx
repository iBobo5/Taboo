import { useState, type JSX } from "react";
import { Backdrop, Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import { useCategorie } from "../../container/TabooContext";
import { theme } from "../../theme";
import type { CategoriaEsauritaModalProps } from "../types";
import { CATEGORIA_CASUALE } from "./Impostazioni";
import { Empty } from "../";

export const CategoriaEsauritaModal = (props: CategoriaEsauritaModalProps): JSX.Element => {
  const { open, categoriaInUso, categorieTerminate, onSelect, onFinish } = props;
  const [categoriaSelezionata, setCategoriaSelezionata] = useState<string | null>(null);

  let categorie: string[] = useCategorie();
  categorie = [...categorie.sort(), CATEGORIA_CASUALE];

  return (
    <Backdrop open={open} sx={{ bgcolor: theme.palette.primary.main, zIndex: 2 }}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid
              size={12}
              textAlign="center"
              sx={{
                ".MuiTypography-root": {
                  fontSize: "1rem",
                },
              }}
            >
              <Empty placeholder={"Esaurite le parole per la categoria " + categoriaInUso} />
            </Grid>
            {categorie.map((categoria: string, index: number) => (
              <Grid size={{ xs: 4, sm: categorie.length < 5 ? 12 / categorie.length : 3 }} key={index}>
                <Button
                  disabled={categorieTerminate.includes(categoria)}
                  fullWidth
                  color="primary"
                  variant={categoria === categoriaSelezionata ? "contained" : "outlined"}
                  onClick={() => setCategoriaSelezionata(categoria)}
                >
                  {categoria}
                </Button>
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button color="primary" variant="outlined" onClick={onFinish}>
            Finisci la partita così
          </Button>
          {categorieTerminate.length < categorie.length && (
            <Button
              color="primary"
              variant="contained"
              disabled={!categoriaSelezionata}
              onClick={() => {
                onSelect(categoriaSelezionata!);
                setCategoriaSelezionata(null);
              }}
            >
              Continua la partita
            </Button>
          )}
        </CardActions>
      </Card>
    </Backdrop>
  );
};
