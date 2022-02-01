import { Children, createContext, ReactNode } from "react";

export const AppContext = createContext<{
}>({

});

export const AppContextProvider = ({ children }: { children: ReactNode; }) => {

  return (
    <AppContext.Provider
      value={
        {

        }
      }
    >
      {children}
    </AppContext.Provider>
  )
}