import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login as loginService, register as registerService, logout as logoutService } from "../services/authService";
import { setAuthToken } from "../services/api";
import type { User } from "../types/User";

// Contexto para la autenticacion
type AuthContextType = {
    user: User | null;
    token: string | null;
    loading: boolean;

    login: (email: string, password: string) => Promise<boolean>;
    register: (formData: any) => Promise<boolean>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor del contexto 
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Carga sesion al iniciar la app 
    useEffect(() => {
        const loadSession = async () => {
            try {
                const storedUser = await AsyncStorage.getItem("userData");
                const storedToken = await AsyncStorage.getItem("authToken");
                if (storedUser && storedToken) {
                    setUser(JSON.parse(storedUser));
                    setToken(storedToken);
                    setAuthToken(storedToken);
                }
            } catch (e) {
                console.log("Error cargando sesión:", e);
            }

            setLoading(false);
        }
        loadSession();
    }, [])

    // Login 
    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const res = await loginService(email, password);

            if (!res.success) {
                console.log("Credenciales incorrectas:", res.message);
                return false;
            }
            const userData = res.data;
            const newToken = res.token;

            setUser(userData);
            setToken(newToken);
            setAuthToken(newToken);

            await AsyncStorage.setItem("userData", JSON.stringify(userData));
            await AsyncStorage.setItem("authToken", newToken);

            return true;
        } catch (error: any) {
            console.log("Login error:", error.message);
            throw new Error(error.message);
        }
    }


    // Registro
    const register = async (formData: any): Promise<boolean> => {
        try {
            const res = await registerService(formData);
            const userData = res.data;
            const newToken = res.token;

            setUser(userData);
            setToken(newToken);
            setAuthToken(newToken);

            await AsyncStorage.setItem("userData", JSON.stringify(userData));
            await AsyncStorage.setItem("authToken", newToken);
            return true;
        } catch (error) {
            console.log("Register error:", error);
            return false;
        }
    }


    // Logout
    const logout = async () => {
        try {
            await logoutService();
        } catch { }

        setAuthToken(null);
        setUser(null);
        setToken(null);

        await AsyncStorage.removeItem("userData");
        await AsyncStorage.removeItem("authToken");
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// Hook para usar el contexto
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
}