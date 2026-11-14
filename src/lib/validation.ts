import * as z from 'zod'

export const checkEmail = z.email({ error: 'Please enter a valid email.' }).trim()
export const checkPassword = z
    .string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
        error: 'Contain at least one special character.',
    })
    .trim()
export const checkUsername = z
    .string()
    .min(1, { error: 'Username is required' })

export const checkBlogId = z
    .string()
    .trim()
    .min(1, { error: 'Missing Blog ID' })
export const checkBlogTitle = z
    .string()
    .trim()
    .min(1, { error: 'title is required' })

export const optionalField = z
    .string()
    .optional()