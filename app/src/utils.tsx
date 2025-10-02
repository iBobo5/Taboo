const centraPaginaVerticalmente = (): void => {
  document.getElementsByTagName("html")[0].style.height = "100%";
  document.getElementsByTagName("body")[0].style.height = "100%";
  document.getElementById("root")!.style.height = "100%";
  (document.getElementsByClassName("MuiContainer-root")[0] as HTMLElement).style.height = "100%";
};

const formattaTimer = (time: number): string => {
  const totalSeconds: number = Math.floor(time / 1000);
  const minutes: number = Math.floor(totalSeconds / 60);
  const seconds: number = totalSeconds % 60;

  return minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
};

/* ---------- Funzione per scrivere tutte le parole all'interno di una frase con la prima lettera maiuscola e il resto minuscolo ---------- */
const capitalizePhrase = (frase: string): string =>
  frase
    .toLowerCase()
    .split(/\s+/) // divide per spazi multipli
    .map((parola) => parola.charAt(0).toUpperCase() + parola.slice(1))
    .join(" ");

export { centraPaginaVerticalmente, formattaTimer, capitalizePhrase };
