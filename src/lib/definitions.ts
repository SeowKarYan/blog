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

export type BlogState =
    | {
        errors?: {
            title?: string[]
            content?: string[]
            category?: string[]
        }
        message?: string
    }
    | undefined