import { createContext, FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { service } from '../services';

export type AuthContextType = {
  data: { user: UserData | null };
  actions: {
    login: (
      payload: UserLoginRequest,
      setLoading?: (loading: boolean) => void
    ) => void;
  };
};

export const AuthContext = createContext<AuthContextType>({
  data: {
    user: null,
  },
  actions: {
    login: () => null,
  },
});

export const AuthProvider: FC = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserData | null>(null);

  const login = (
    payload: UserLoginRequest,
    setLoading?: (loading: boolean) => void
  ) => {
    console.log(payload);
    if (setLoading) setLoading(true);
    service.auth
      .login(payload)
      .then(({ data: { refresh_token, token, user } }) => {
        localStorage.setItem('@tasq/refresh_token', refresh_token);
        localStorage.setItem('@tasq/token', token);
        setUser(user);
        navigate('/');
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        data: {
          user,
        },
        actions: {
          login,
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
