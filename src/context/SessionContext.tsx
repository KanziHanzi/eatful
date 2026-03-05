import {createContext, type ReactNode, useCallback, useContext, useMemo, useState} from 'react';

type SessionAttributes = {
  fallbackIcons: boolean;
  assetsLoaded: boolean;
  ready: boolean;
};

type SetSessionAttribute = (attributes: Partial<SessionAttributes>) => void;

type SessionContextValue = SessionAttributes & {
  setAttributes: SetSessionAttribute;
};

const SessionContext = createContext<SessionContextValue>({
  fallbackIcons: false,
  assetsLoaded: false,
  ready: false,

  setAttributes: () => {},
});

type SessionProviderProps = {
  children: ReactNode;
};

export const SessionProvider = ({children}: SessionProviderProps) => {
  const [data, setData] = useState<SessionAttributes>({
    fallbackIcons: false,
    assetsLoaded: false,
    ready: false,
  });

  const setAttributes = useCallback<SetSessionAttribute>(attributes => {
    setData(current => ({
      ...current,
      ...attributes,
    }));
  }, []);

  const value = useMemo(
    () => ({
      fallbackIcons: data.fallbackIcons,
      assetsLoaded: data.assetsLoaded,
      ready: data.assetsLoaded,
      setAttributes,
    }),
    [data, setAttributes],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
  return useContext(SessionContext);
};
