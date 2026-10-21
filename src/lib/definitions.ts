export type UserState =
    | {
        errors?: {
            email?: string[]
            password?: string[]
            username?: string[]
        }
        message?: string
    }
    | undefined