import api from "./api";
import type { LoginResponse, RegisterResponse } from "../types/User";

export async function login(email: string, password: string): Promise<LoginResponse> {
    try {
        const res = await api.post<LoginResponse>("/login", { email, password })
            .catch(err => err.response);;
        return res.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Error inesperado en login");
    }
}


export async function register(formData: any): Promise<RegisterResponse> {
    try {
        const res = await api.post<RegisterResponse>("/register", formData);
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.message);
    }
}

export async function logout(): Promise<boolean> {
    try {
        await api.post("/users/logout");
        return true;
    } catch {
        return false;
    }
}