import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  token: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({ token: null, isLoading: true });

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would handle real authentication (Firebase Auth, OAuth, etc.)
    // For this prototype, we'll fetch a mock token from the backend
    const initializeAuth = async () => {
      try {
        const res = await fetch('/api/auth/login', { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          setToken(data.token);
        }
      } catch (error) {
        console.error('Failed to initialize mock auth', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ token, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
