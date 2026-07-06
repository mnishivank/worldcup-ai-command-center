import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  login: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ token: null, isLoading: true, login: async () => {} });

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
      } else {
        console.error('Login failed with status', res.status);
      }
    } catch (error) {
      console.error('Failed to initialize mock auth', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    login();
  }, []);

  return (
    <AuthContext.Provider value={{ token, isLoading, login }}>
      {children}
    </AuthContext.Provider>
  );
}
