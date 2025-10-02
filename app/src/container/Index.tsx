import { useCallback, useEffect, useState, type JSX } from "react";
import { Container, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router";
import { SwitchContent } from "./SwitchContent";
import {
  TabooProvider,
  useColori,
  useDurate,
  useIsMobileMode,
  useParole,
  useSetCategorie,
  useSetColori,
  useSetDurate,
  useSetParole,
} from "./TabooContext";
import { alertInfoDefault, AlertInfo, LoadingSpinner } from "../components";
import { GET_COLORI_API_PATH, GET_DURATE_API_PATH, GET_PAROLE_API_PATH } from "../api";
import { theme } from "../theme";
import type { AlertInfoProps, ColoriProps, TabooCardProps } from "../components/types";

const App = (): JSX.Element => {
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<AlertInfoProps>(alertInfoDefault);
  const mobileMode: boolean = useIsMobileMode();

  const parole = useParole();
  const colori = useColori();
  const durate = useDurate();
  const setParole = useSetParole();
  const setCategorie = useSetCategorie();
  const setColori = useSetColori();
  const setDurate = useSetDurate();

  const fetchParole = (): void => {
    setShowSpinner(true);
    fetch(GET_PAROLE_API_PATH)
      .then((res) => {
        if (res.ok) return res.json();
        else throw "Errore nel caricamento delle parole";
      })
      .then((res: TabooCardProps[]) => {
        const categorie = res.map((card: TabooCardProps) => card.tema);
        // Metto un timeout di 0.5 s per uniformarmi con lo spinner
        setTimeout(() => {
          setAlertInfo(alertInfoDefault);
          setParole(res);
          setCategorie([...new Set(categorie)]);
        }, 500);
      })
      .catch((err) => {
        console.error(err);
        setAlertInfo({ show: true, msg: err });
      })
      .finally(() => setTimeout(() => setShowSpinner(false), 500));
  };

  const fetchColori = (): void => {
    setShowSpinner(true);
    fetch(GET_COLORI_API_PATH)
      .then((res) => {
        if (res.ok) return res.json();
        else throw "Errore nel caricamento delle parole";
      })
      .then((res: ColoriProps) => {
        // Metto un timeout di 0.5 s per uniformarmi con lo spinner
        setTimeout(() => {
          setAlertInfo(alertInfoDefault);
          setColori(res);
        }, 500);
      })
      .catch((err) => {
        console.error(err);
        setAlertInfo({ show: true, msg: err });
      })
      .finally(() => setTimeout(() => setShowSpinner(false), 500));
  };

  const fetchDurate = (): void => {
    setShowSpinner(true);
    fetch(GET_DURATE_API_PATH)
      .then((res) => {
        if (res.ok) return res.json();
        else throw "Errore nel caricamento delle parole";
      })
      .then((res: number[]) => {
        // Metto un timeout di 0.5 s per uniformarmi con lo spinner
        setTimeout(() => {
          setAlertInfo(alertInfoDefault);
          setDurate(res);
        }, 500);
      })
      .catch((err) => {
        console.error(err);
        setAlertInfo({ show: true, msg: err });
      })
      .finally(() => setTimeout(() => setShowSpinner(false), 500));
  };

  const inizializzaGioco = useCallback(() => {
    if (parole.length === 0) fetchParole();
    if (!colori) fetchColori();
    if (durate.length === 0) fetchDurate();
  }, [parole, colori, durate]);

  useEffect(() => {
    inizializzaGioco();
  }, []);

  return (
    <Container maxWidth={mobileMode ? "xl" : "md"} sx={{ px: 0 }}>
      {alertInfo.show ? (
        <AlertInfo onClick={inizializzaGioco} msg={alertInfo.msg} />
      ) : (
        <BrowserRouter>
          <SwitchContent />
        </BrowserRouter>
      )}
      <LoadingSpinner open={showSpinner} />
    </Container>
  );
};

export const Index = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <TabooProvider>
      <App />
    </TabooProvider>
  </ThemeProvider>
);
