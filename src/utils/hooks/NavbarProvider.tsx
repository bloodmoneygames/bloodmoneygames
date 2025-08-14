'use client';

import {createContext, useContext, useState} from "react";

export type TNavbarProviderState = {
  isNavOpen: boolean;
  setIsNavOpen: (isNavOpen: boolean) => void;
}

const initialState: TNavbarProviderState = {
  isNavOpen: false,
  setIsNavOpen: () => null,
}

type TNavbarProviderProps = {
  children: React.ReactNode;
}

const navbarContext= createContext(initialState);

export function NavbarProvider({children}: TNavbarProviderProps) {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  return (
    <navbarContext.Provider value={{isNavOpen, setIsNavOpen}}>
      {children}
    </navbarContext.Provider>
  );
}

export const useNavbarContext = () => {
  const context = useContext(navbarContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};