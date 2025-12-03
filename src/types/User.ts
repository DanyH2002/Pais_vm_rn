export type User = {
    id: number;
    name: string;
    last_name: string;
    email: string;
    phone: string;
    active?: boolean;
    created_at?: string;
    updated_at?: string;
}

export type LoginResponse = {
    success: boolean;
    status: number;
    message: string;
    data: User;
    token: string;
}

export type RegisterResponse = {
    success: boolean;
    status: number;
    message: string;
    data: User;
    token: string;
}
