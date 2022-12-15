import { createContext, FC, useContext } from 'react';
import { useQuery } from 'react-query';

import { services } from '../services';

export type AuthContextType = {
  data: { user: UserData | null };
  actions: {
    logout: () => void;
  };
};

export const AuthContext = createContext<AuthContextType>({
  data: {
    user: null,
  },
  actions: {
    logout: () => null,
  },
});

export const AuthProvider: FC = ({ children }) => {
  const { data: user } = useQuery('user-data', () =>
    services.user.getUserInfo().then(({ data }) => data)
  );

  const logout = () => {
    localStorage.removeItem('@tasq/refresh_token');
    localStorage.removeItem('@tasq/token');
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
