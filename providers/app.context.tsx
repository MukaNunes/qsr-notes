import React, { createContext, useContext, useState, PropsWithChildren } from "npm:react";

type AppContextType = {
  logs: string[];
  addLog: (msg: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev: string) => [...prev, msg]);
  };

  return (
    <AppContext.Provider value={{ logs, addLog }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
  return ctx;
};
