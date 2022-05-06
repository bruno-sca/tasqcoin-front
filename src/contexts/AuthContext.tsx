import { createContext, FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { services } from '../services';

export type AuthContextType = {
  data: { user: UserData | null };
  actions: {
    logout: () => void;
    updateUserData: () => void;
  };
};

export const AuthContext = createContext<AuthContextType>({
  data: {
    user: null,
  },
  actions: {
    logout: () => null,
    updateUserData: () => null,
  },
});

export const AuthProvider: FC = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserData | null>(null);

  const updateUserData = () =>
    services.user.getUserInfo().then(({ data }) => setUser(data));

  useEffect(() => {
    updateUserData();
  }, []);

  const logout = () => {
    localStorage.removeItem('@tasq/refresh_token');
    localStorage.removeItem('@tasq/token');
    navigate('/auth');
  };

  return (
    <AuthContext.Provider
      // TODO: Add value to useMemo
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data: {
          user,
        },
        actions: {
          logout,
          updateUserData,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('Component not contained by provider!');

  return context;
};
