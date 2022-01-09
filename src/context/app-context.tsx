import { Children, createContext, ReactNode } from "react";
import { useNofitication } from "./notification/notification";

export const AppContext = createContext<{
  notification: ReturnType<typeof useNofitication>["notification"];
  setNotification: ReturnType<typeof useNofitication>["setNotification"];
}>({
  notification: '',
  setNotification: () => { },
});

export const AppContextProvider = ({ children }: { children: ReactNode; }) => {
  const { notification, setNotification } = useNofitication()

  return (
    <AppContext.Provider
      value={
        {
          notification,
          setNotification
        }
      }
    >
      {children}
    </AppContext.Provider>
  )
}