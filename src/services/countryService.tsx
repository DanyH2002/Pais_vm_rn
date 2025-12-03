import api from "./api";
import type { Country, ApiResponseList, ApiResponseItem, Continent, Language, Currency } from "../types/Country";

export async function getCountries(): Promise<ApiResponseList<Country>> {
    try {
        const res = await api.get<ApiResponseList<Country>>("/countries/list");
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Error al obtener países");
    }
}

export async function getCountry(id: number): Promise<ApiResponseItem<Country>> {
    try {
        const res = await api.get<ApiResponseItem<Country>>(`/countries/${id}`);
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Error al obtener país");
    }
}

export async function createCountry(formData: FormData): Promise<ApiResponseItem<Country>> {
    try {
        const res = await api.post<ApiResponseItem<Country>>("/countries/create", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Error al crear país");
    }
}

export async function updateCountry(id: number, formData: FormData): Promise<ApiResponseItem<Country>> {
    try {
        const res = await api.post<ApiResponseItem<Country>>(`/countries/update/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Error al actualizar país");
    }
}


export async function deleteCountry(id: number): Promise<boolean> {
    try {
        await api.delete(`/countries/delete/${id}`);
        return true;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Error al eliminar país");
    }
}

// Catalogos
export async function getContinents(): Promise<ApiResponseList<Continent>> {
    try {
        const res = await api.get<ApiResponseList<Continent>>("/catalogs/continents");
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Error al obtener continentes");
    }
}

export async function getLanguages(): Promise<ApiResponseList<Language>> {
    try {
        const res = await api.get<ApiResponseList<Language>>("/catalogs/languages");
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Error al obtener idiomas");
    }
}

export async function getCurrencies(): Promise<ApiResponseList<Currency>> {
    try {
        const res = await api.get<ApiResponseList<Currency>>("/catalogs/currencies");
        return res.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Error al obtener monedas");
    }
}