import { createContext, useContext, useEffect, useState, type Dispatch, type JSX, type ReactNode, type SetStateAction } from "react";
import type { ColoriProps, TabooCardProps, TabooContextProps } from "../components/types";

const TabooContext = createContext<null | TabooContextProps>(null);

const TabooProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [parole, setParole] = useState<TabooCardProps[]>([]);
  const [categorie, setCategorie] = useState<string[]>([]);
  const [colori, setColori] = useState<null | ColoriProps>(null);
  const [durate, setDurate] = useState<number[]>([]);
  const [mobileMode, setMobileMode] = useState<boolean>(window.innerWidth < 600 ? true : false);

  useEffect(() => {
    const handleResize = () => setMobileMode(window.innerWidth < 600 ? true : false);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <TabooContext.Provider value={{ parole, categorie, colori, durate, mobileMode, setParole, setCategorie, setColori, setDurate }}>
      {children}
    </TabooContext.Provider>
  );
};

const useParole = (): TabooCardProps[] => {
  const tabooContext = useContext(TabooContext);
  if (!tabooContext) throw new Error("Il custom hook 'useParole' deve essere utilizzato all'interno del TabooProvider");
  return tabooContext.parole;
};

const useCategorie = (): string[] => {
  const tabooContext = useContext(TabooContext);
  if (!tabooContext) throw new Error("Il custom hook 'useCategorie' deve essere utilizzato all'interno del TabooProvider");
  return tabooContext.categorie;
};

const useColori = (): null | ColoriProps => {
  const tabooContext = useContext(TabooContext);
  if (!tabooContext) throw new Error("Il custom hook 'useColori' deve essere utilizzato all'interno del TabooProvider");
  return tabooContext.colori;
};

const useDurate = (): number[] => {
  const tabooContext = useContext(TabooContext);
  if (!tabooContext) throw new Error("Il custom hook 'useDurate' deve essere utilizzato all'interno del TabooProvider");
  return tabooContext.durate;
};

const useIsMobileMode = (): boolean => {
  const tabooContext = useContext(TabooContext);
  if (!tabooContext) throw new Error("Il custom hook 'useIsMobileMode' deve essere utilizzato all'interno del TabooProvider");
  return tabooContext.mobileMode;
};

const useSetParole = (): Dispatch<SetStateAction<TabooCardProps[]>> => {
  const tabooContext = useContext(TabooContext);
  if (!tabooContext) throw new Error("Il custom hook 'useSetParole' deve essere utilizzato all'interno del TabooProvider");
  return tabooContext.setParole;
};

const useSetCategorie = (): Dispatch<SetStateAction<string[]>> => {
  const tabooContext = useContext(TabooContext);
  if (!tabooContext) throw new Error("Il custom hook 'useSetCategorie' deve essere utilizzato all'interno del TabooProvider");
  return tabooContext.setCategorie;
};

const useSetColori = (): Dispatch<SetStateAction<null | ColoriProps>> => {
  const tabooContext = useContext(TabooContext);
  if (!tabooContext) throw new Error("Il custom hook 'useSetColori' deve essere utilizzato all'interno del TabooProvider");
  return tabooContext.setColori;
};

const useSetDurate = (): Dispatch<number[]> => {
  const tabooContext = useContext(TabooContext);
  if (!tabooContext) throw new Error("Il custom hook 'useSetDurate' deve essere utilizzato all'interno del TabooProvider");
  return tabooContext.setDurate;
};

export { TabooProvider, useParole, useCategorie, useColori, useDurate, useIsMobileMode, useSetParole, useSetCategorie, useSetColori, useSetDurate };
