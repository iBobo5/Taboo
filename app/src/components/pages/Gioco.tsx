import { useCallback, useEffect, useState, type JSX } from "react";
import { Box, Button, Grid, Stack } from "@mui/material";
import { useIsMobileMode, useParole } from "../../container/TabooContext";
import {
  BottomCardButtons,
  CATEGORIA_CASUALE,
  CategoriaEsauritaModal,
  Empty,
  FineGioco,
  Header,
  Impostazioni,
  SquadraPartecipante,
  TabooCard,
  Timer,
} from "../";
import type { Punteggi, TabooCardProps, StartingSettings } from "../types";

const ESITI = {
  SUCCESS: "indovinata",
  ERROR: "sbagliata",
  PASS: "passata",
};

const PAROLE_UTILIZZATE = "idsUtilizzate";
const CATEGORIE_TERMINATE = "categorieTerminate";

const punteggioIniziale: Punteggi = { 0: 0, 1: 0 };

export const Gioco = (): JSX.Element => {
  const [impostazioniGioco, setImpostazioniGioco] = useState<StartingSettings | null>(null);
  const [datasourceIds, setDatasourceIds] = useState<number[]>([]);
  const [idsParoleIndovinate, setIdsParoleIndovinate] = useState<number[]>([]);
  const [idsParoleSbagliate, setIdsParoleSbagliate] = useState<number[]>([]);
  const [idsParolePassate, setIdsParolePassate] = useState<number[]>([]);
  const [idsParoleUtilizzate, setIdsParoleUtilizzate] = useState<number[]>(
    window.sessionStorage.getItem(PAROLE_UTILIZZATE)
      ? JSON.parse(window.sessionStorage.getItem(PAROLE_UTILIZZATE)!).map((item: string) => parseInt(item))
      : []
  );
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [timer, setTimer] = useState<number | null>(null);
  const [mostraParole, setMostraParole] = useState<boolean>(false);
  const [categorieTerminate, setCategorieTerminate] = useState<string[]>(
    window.sessionStorage.getItem(CATEGORIE_TERMINATE) ? JSON.parse(window.sessionStorage.getItem(CATEGORIE_TERMINATE)!) : []
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [partitaTerminata, setPartitaTerminata] = useState<boolean>(false);
  const [squadraPartecipante, setSquadraPartecipante] = useState<number | null>(null);
  const [punteggi, setPunteggi] = useState<Punteggi>(punteggioIniziale);

  const parole: TabooCardProps[] = useParole();

  const durataSelezionata: number | null = impostazioniGioco ? impostazioniGioco.durata : null;
  const categoriaSelezionata: string | null = impostazioniGioco ? impostazioniGioco.categoria : null;
  const squadre: string[] = impostazioniGioco ? [impostazioniGioco.squadra1, impostazioniGioco.squadra2] : [];

  const mobileMode: boolean = useIsMobileMode();

  // Aggiorno il timer ogni secondo, solo se "isRunning" è true
  useEffect(() => {
    if (!isRunning || timer === null) return;

    if (timer <= 0) {
      setIsRunning(false);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => (prev !== null && prev > 0 ? prev - 1000 : prev));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timer]);

  // Mano a mano che si utilizzano parole verifico se ci sono eventuali categorie terminate
  useEffect(() => {
    if (categoriaSelezionata && idsParoleUtilizzate.length > 0) {
      let paroleDisponibili = [];
      if (categoriaSelezionata !== CATEGORIA_CASUALE)
        paroleDisponibili = parole.filter(
          (parola: TabooCardProps) => parola.tema === categoriaSelezionata && !idsParoleUtilizzate.includes(parola.id)
        );
      else paroleDisponibili = parole.filter((parola: TabooCardProps) => !idsParoleUtilizzate.includes(parola.id));
      if (paroleDisponibili.length === 0) setCategorieTerminate([...categorieTerminate, categoriaSelezionata]);
    }
  }, [categoriaSelezionata, idsParoleUtilizzate]);

  // Se sono state utilizzate tutte le parole mostro le statistiche di fine partita
  useEffect(() => {
    if (idsParoleUtilizzate.length > 0) window.sessionStorage.setItem(PAROLE_UTILIZZATE, JSON.stringify(idsParoleUtilizzate));
    if (categorieTerminate.length > 0) window.sessionStorage.setItem(CATEGORIE_TERMINATE, JSON.stringify(categorieTerminate));
  }, [categorieTerminate, idsParoleUtilizzate]);

  // Se sono state utilizzate tutte le parole mostro le statistiche di fine partita
  useEffect(() => {
    if (categorieTerminate.length > 0 && idsParoleUtilizzate.length === parole.length) setPartitaTerminata(true);
  }, [categorieTerminate, idsParoleUtilizzate, parole]);

  const estraiNuovaParola = useCallback(
    (esito: (typeof ESITI)[keyof typeof ESITI]): void => {
      if (currentId) {
        const idsUtilizzati: number[] = [...new Set([currentId, ...idsParoleUtilizzate, ...idsParoleSbagliate, ...idsParoleIndovinate, ...idsParolePassate])]; // prettier-ignore
        if (esito === ESITI.ERROR) setIdsParoleSbagliate([...idsParoleSbagliate, currentId]);
        if (esito === ESITI.SUCCESS) setIdsParoleIndovinate([...idsParoleIndovinate, currentId]);
        if (esito === ESITI.PASS) setIdsParolePassate([...idsParolePassate, currentId]);
        // Aggiorno il punteggio in caso di parola indovinata o sbagliata
        if ([ESITI.SUCCESS, ESITI.ERROR].includes(esito)) {
          let nuoviPunteggi = Object.assign({}, punteggi);
          nuoviPunteggi[squadraPartecipante!] = nuoviPunteggi[squadraPartecipante!] + (esito === ESITI.SUCCESS ? 1 : -1);
          setPunteggi(nuoviPunteggi);
        }
        setIdsParoleUtilizzate(idsUtilizzati);
        const filteredDatasourceIds: number[] = datasourceIds.filter((num) => !idsUtilizzati.includes(num));
        if (filteredDatasourceIds.length === 0) {
          setCurrentId(null);
          // Interrompo il timer se non ho più parole a disposizione e mostro il modale per scegliere la nuova categoria
          setIsRunning(false);
          setShowModal(true);
        } else {
          const randomIndex: number = Math.floor(Math.random() * filteredDatasourceIds.length);
          setCurrentId(filteredDatasourceIds[randomIndex]);
        }
      }
    },
    [
      punteggi,
      squadraPartecipante,
      currentId,
      datasourceIds,
      idsParoleSbagliate,
      idsParoleIndovinate,
      idsParolePassate,
      idsParoleUtilizzate,
      categoriaSelezionata,
      categorieTerminate,
    ]
  );

  const cambioSquadra = useCallback((): void => {
    setTimer(impostazioniGioco!.durata * 1000);
    setSquadraPartecipante(squadraPartecipante === 0 ? 1 : 0);
    setIdsParoleSbagliate([]);
    setIdsParoleIndovinate([]);
    setIdsParolePassate([]);
    setIdsParoleUtilizzate([...idsParoleUtilizzate, currentId!]);
    setCurrentId(null);
    setMostraParole(false);
  }, [impostazioniGioco, punteggi, squadraPartecipante, idsParoleIndovinate, idsParoleSbagliate, idsParoleUtilizzate, currentId]);

  // Reinizializzo tutti i parametri per iniziare una nuova partita
  const nuovaPartita = (): void => {
    sessionStorage.clear();
    setImpostazioniGioco(null);
    setDatasourceIds([]);
    setIdsParoleIndovinate([]);
    setIdsParoleSbagliate([]);
    setIdsParolePassate([]);
    setIdsParoleUtilizzate([]);
    setCurrentId(null);
    setTimer(null);
    setMostraParole(false);
    setCategorieTerminate([]);
    setShowModal(false);
    setIsRunning(false);
    setPartitaTerminata(false);
    setSquadraPartecipante(null);
    setPunteggi(punteggioIniziale);
  };

  if (partitaTerminata) return <FineGioco {...{ squadre, punteggi }} onClick={nuovaPartita} />;

  return (
    <>
      <Header />
      <Box px={3}>
        {!impostazioniGioco && (
          <Impostazioni
            {...{ categorieTerminate }}
            onStart={(settings: StartingSettings) => {
              const { durata, categoria } = settings;
              setTimer(durata * 1000);
              if (categoria !== CATEGORIA_CASUALE)
                setDatasourceIds(parole.filter((parola: TabooCardProps) => parola.tema === categoria).map((parola: TabooCardProps) => parola.id));
              else setDatasourceIds(parole.map((parola: TabooCardProps) => parola.id));
              setImpostazioniGioco(settings);
              setSquadraPartecipante(0);
            }}
          />
        )}
        <SquadraPartecipante {...{ squadraPartecipante, punteggi, squadre }} />
        <Timer {...{ timer }} />
        {mostraParole && (
          <Grid container>
            <Grid size={12} textAlign="center">
              {currentId && <TabooCard {...parole.find((parola: TabooCardProps) => parola.id === currentId)!} />}
              {parole.length === idsParoleUtilizzate.length && (
                <Stack sx={{ mb: 4 }}>
                  <Empty placeholder="Esaurite tutte le parole disponibili" />
                </Stack>
              )}
            </Grid>
            <BottomCardButtons
              onError={() => estraiNuovaParola(ESITI.ERROR)}
              onSuccess={() => estraiNuovaParola(ESITI.SUCCESS)}
              onPass={() => estraiNuovaParola(ESITI.PASS)}
              idsSbagliati={idsParoleSbagliate}
              idsPassati={idsParolePassate}
              idsIndovinati={idsParoleIndovinate}
              timerCompleted={timer === 0}
              disablePass={idsParolePassate.length === 3}
            />
          </Grid>
        )}
        {timer != null && parole.length > idsParoleUtilizzate.length && (
          <Grid container spacing={{ xs: 2, md: 8 }} {...(mostraParole && { sx: { mt: 4 } })}>
            {timer > 0 ? (
              <Grid size={4} offset={4}>
                <Button
                  fullWidth
                  disabled={categorieTerminate.includes(categoriaSelezionata!)}
                  variant="contained"
                  onClick={() => {
                    if (!currentId) {
                      const filteredDatasourceIds: number[] = datasourceIds.filter((num) => !idsParoleUtilizzate.includes(num));
                      if (filteredDatasourceIds.length !== 0) {
                        // Genero un indice casuale da 0 a datasourceIds.length - 1 e lo utilizzo per settare l'id della parola da indovinare
                        const randomIndex: number = Math.floor(Math.random() * filteredDatasourceIds.length);
                        setCurrentId(filteredDatasourceIds[randomIndex]);
                      }
                    }
                    if (!mostraParole) setMostraParole(true);
                    setIsRunning(!isRunning);
                  }}
                >
                  {isRunning ? "Pausa" : durataSelezionata !== timer! / 1000 ? "Continua" : "Inizia"}
                </Button>
              </Grid>
            ) : (
              <Grid size={mobileMode ? 6 : 4} offset={mobileMode ? 3 : 4}>
                <Button fullWidth variant="contained" onClick={cambioSquadra}>
                  Passa la mano
                </Button>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
      <CategoriaEsauritaModal
        open={showModal}
        categoriaInUso={categoriaSelezionata!}
        {...{ categorieTerminate }}
        onFinish={() => {
          setPartitaTerminata(true);
          setShowModal(false);
        }}
        onSelect={(categoria) => {
          const impostazioniAggiornate: StartingSettings = Object.assign({}, impostazioniGioco);
          impostazioniAggiornate.categoria = categoria;
          setImpostazioniGioco(impostazioniAggiornate);
          if (categoria !== CATEGORIA_CASUALE)
            setDatasourceIds(parole.filter((parola: TabooCardProps) => parola.tema === categoria).map((parola: TabooCardProps) => parola.id));
          else setDatasourceIds(parole.map((parola: TabooCardProps) => parola.id));
          setMostraParole(false);
          setShowModal(false);
        }}
      />
    </>
  );
};
