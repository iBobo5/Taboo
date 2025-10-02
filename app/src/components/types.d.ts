import type { Dispatch, SetStateAction } from "react";

export type TabooCardProps = {
  id: number;
  guess: string;
  taboo: string[];
  tema: string;
};

export type ColoriProps = {
  [key: string]: string;
};

export type TabooContextProps = {
  parole: TabooCardProps[];
  categorie: string[];
  colori: null | ColoriProps;
  durate: number[];
  mobileMode: boolean;
  setParole: Dispatch<SetStateAction<TabooCardProps[]>>;
  setCategorie: Dispatch<SetStateAction<string[]>>;
  setColori: Dispatch<SetStateAction<null | ColoriProps>>;
  setDurate: Dispatch<SetStateAction<number[]>>;
};

export type Punteggi = {
  [key: number]: number;
};

export type AlertInfoProps = {
  show: boolean;
  msg: string;
};

export type StartingSettings = {
  durata: number;
  categoria: string;
  squadra1: string;
  squadra2: string;
};

export type ImpostazioniProps = {
  categorieTerminate: string[];
  onStart: (setting: StartingSettings) => void;
};

export type SquadraProps = {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export type BottomCardButtonsProps = {
  onError: () => void;
  onSuccess: () => void;
  onPass: () => void;
  idsSbagliati: number[];
  idsIndovinati: number[];
  idsPassati: number[];
  timerCompleted: boolean;
  disablePass: boolean;
};

export type SquadraPartecipanteProps = {
  squadraPartecipante: number | null;
  punteggi: Punteggi;
  squadre: string[];
};

export type CategoriaEsauritaModalProps = {
  open: boolean;
  categoriaInUso: string;
  categorieTerminate: string[];
  onSelect: (categoria: string) => void;
  onFinish: () => void;
};

export type FineGiocoProps = {
  punteggi: Punteggi;
  squadre: string[];
  onClick: () => void;
};
