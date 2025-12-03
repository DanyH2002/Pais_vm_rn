import React, { createContext, useContext, useState } from "react";
import {
    getCountries, getCountry as getCountryService, createCountry as createCountryService,
    updateCountry as updateCountryService, deleteCountry as deleteCountryService,
    getContinents as getContinentsService, getLanguages as getLanguagesService, getCurrencies as getCurrenciesService
} from "../services/countryService";
import type { Country, Continent, Language, Currency } from "../types/Country";


type CountryContextType = {
    countries: Country[];
    selectedCountry: Country | null;
    continents: Continent[];
    languages: Language[];
    currencies: Currency[];

    loading: boolean;
    error: string | null;

    listCountries: () => Promise<void>;
    getCountry: (id: number) => Promise<void>;
    createCountry: (formData: FormData) => Promise<boolean>;
    updateCountry: (id: number, formData: FormData) => Promise<boolean>;
    deleteCountry: (id: number) => Promise<boolean>;

    getContinents: () => Promise<void>;
    getLanguages: () => Promise<void>;
    getCurrencies: () => Promise<void>;
    listAuxData: () => Promise<void>;

};

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({ children }: { children: React.ReactNode }) {
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [continents, setContinents] = useState<Continent[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const listCountries = async () => {
        try {
            setLoading(true);
            const res = await getCountries();
            setCountries(res.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const getCountry = async (id: number) => {
        try {
            setLoading(true);
            const res = await getCountryService(id);
            setSelectedCountry(res.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const createCountry = async (formData: FormData): Promise<boolean> => {
        try {
            setLoading(true);
            const response = await createCountryService(formData);
            if (response.success) {
                await listCountries();
                return true;
            }
            setError(response.message);
            return false;
        } catch (err: any) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    }

    const updateCountry = async (id: number, formData: FormData): Promise<boolean> => {
        try {
            setLoading(true);
            const response = await updateCountryService(id, formData);
            if (response.success) {
                await listCountries();
                return true;
            }
            setError(response.message);
            return false;
        } catch (err: any) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    }

    const deleteCountry = async (id: number): Promise<boolean> => {
        try {
            setLoading(true);
            const ok = await deleteCountryService(id);
            await listCountries();
            return ok;
        } catch (err: any) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    }

    // Catalogos
    const getContinents = async () => {
        try {
            const res = await getContinentsService();
            setContinents(res.data);
        } catch (err: any) {
            setError(err.message);
        }
    }

    const getLanguages = async () => {
        try {
            const res = await getLanguagesService();
            setLanguages(res.data);
        } catch (err: any) {
            setError(err.message);
        }
    }

    const getCurrencies = async () => {
        try {
            const res = await getCurrenciesService();
            setCurrencies(res.data);
        } catch (err: any) {
            setError(err.message);
        }
    }

    const listAuxData = async () => {
        try {
            const [c1, c2, c3] = await Promise.all([
                getContinentsService(),
                getLanguagesService(),
                getCurrenciesService()
            ]);

            setContinents(c1.data);
            setLanguages(c2.data);
            setCurrencies(c3.data);

        } catch (err: any) {
            setError(err.message);
        }
    }
    
    return (
        <CountryContext.Provider
            value={{
                countries,
                selectedCountry,
                continents,
                languages,
                currencies,
                loading,
                error,
                listCountries,
                getCountry,
                createCountry,
                updateCountry,
                deleteCountry,
                getContinents,
                getLanguages,
                getCurrencies,
                listAuxData,
            }}
        >
            {children}
        </CountryContext.Provider>
    )
}

export function useCountry() {
    const context = useContext(CountryContext);
    if (!context) {
        throw new Error("useCountry debe usarse dentro de CountryProvider");
    }
    return context;
}