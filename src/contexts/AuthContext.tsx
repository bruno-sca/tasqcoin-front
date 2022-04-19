import { createContext, FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '../hooks';
import { services } from '../services';

export type AuthContextType = {
  data: { user: UserData | null; token: string };
  actions: {
    login: (
      payload: UserLoginRequest,
      setLoading?: (loading: boolean) => void
    ) => void;
    logout: () => void;
  };
};

export const AuthContext = createContext<AuthContextType>({
  data: {
    user: null,
    token: null,
  },
  actions: {
    login: () => null,
    logout: () => null,
  },
});

export const AuthProvider: FC = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useLocalStorage<string>('token', '');

  const login = (
    payload: UserLoginRequest,
    setLoading?: (loading: boolean) => void
  ) => {
    if (setLoading) setLoading(true);
    services.auth
      .login(payload)
      .then(({ data: { refresh_token, token: userToken, user: userData } }) => {
        localStorage.setItem('@tasq/refresh_token', refresh_token);
        setToken(userToken);
        setUser(userData);

        const url = sessionStorage.getItem('prevUrl');
        if (url) sessionStorage.removeItem('prevUrl');

        navigate(url || '/', { replace: !!url });
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };

  useEffect(() => {
    services.user.getUserInfo().then(({ data }) => setUser(data));
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
          token,
        },
        actions: {
          login,
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
