import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type Cut = {
  name: string;
  price: string;
};

type UserContextType = {
  username: string | null;
  selectedCut: Cut | null;
  selectedHairdresser: string | null; // Nuevo estado para almacenar el nombre del peluquero seleccionado
  setUsername: Dispatch<SetStateAction<string | null>>;
  setSelectedCut: Dispatch<SetStateAction<Cut | null>>;
  setSelectedHairdresser: Dispatch<SetStateAction<string | null>>; // Nueva función para actualizar el peluquero seleccionado
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext debe ser utilizado dentro de un UserProvider');
  }
  return context;
};

type UserProviderProps = {
  children: ReactNode;
};

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [selectedCut, setSelectedCut] = useState<Cut | null>(null);
  const [selectedHairdresser, setSelectedHairdresser] = useState<string | null>(null); // Estado para el nombre del peluquero seleccionado

  const setNewUsername = (newUsername: string) => {
    setUsername(newUsername);
  };

  const setNewSelectedCut = (cut: Cut) => {
    setSelectedCut(cut);
  };

  const setNewSelectedHairdresser = (hairdresser: string) => {
    setSelectedHairdresser(hairdresser);
  };

  return (
    <UserContext.Provider
      value={{
        username,
        selectedCut,
        selectedHairdresser, // Agregamos el nuevo estado al contexto del usuario
        setUsername: setNewUsername,
        setSelectedCut: setNewSelectedCut,
        setSelectedHairdresser: setNewSelectedHairdresser // Agregamos la nueva función para actualizar el peluquero seleccionado al contexto del usuario
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
