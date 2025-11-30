export type User = {
    id: number;
    name: string;
    last_name: string;
    email: string;
    password?: string;
    phone: string;
    gender: string;
    birthdate: Date | string;
    active?: boolean;
    created_at?: string;
    updated_at?: string;
}

export type LoginResponse = {
    success: boolean;
    message: string;
    data: {
        user: User;
        token: string;
    }
}

export type RegisterResponse = {
    success: boolean;
    message: string;
    data: {
        user: User;
        token: string;
    }
}
