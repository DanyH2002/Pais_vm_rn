import { User } from "./User";
export type Continent = {
    id: number;
    name: string;
}

export type Currency = {
    id: number;
    name: string;
}

export type Language = {
    id: number;
    name: string;
}

export type Country = {
    id: number;
    name: string;
    official_name: string;
    president: string;
    capital: string;
    size: number | string;
    population: number | string;
    flag: string;

    continent_id: number;
    language_id: number;
    currency_id: number;
    user_id: number;
    created_at?: string;
    updated_at?: string;

    continent?: Continent;
    language?: Language;
    currency?: Currency;
    user?: User;
}

export type ApiResponseList<T> = {
    success: boolean;
    status: number;
    message: string;
    data: T[];
}

export type ApiResponseItem<T> = {
    success: boolean;
    status: number;
    message: string;
    data: T;
}
