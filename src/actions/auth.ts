"use server";

import * as z from 'zod'
import bcrypt from 'bcrypt'
import { db } from '@/prisma/db'
import { createSession, deleteSession } from '@/lib/session'
import { redirect } from "next/navigation";

const LoginSchema = z.object({
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { error: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
        .regex(/[0-9]/, { error: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            error: 'Contain at least one special character.',
        })
        .trim(),
})

const RegisterSchema = z.object({
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { error: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
        .regex(/[0-9]/, { error: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            error: 'Contain at least one special character.',
        })
        .trim(),
    username: z
        .string()
        .min(1, { error: 'Username is required' })
})

type UserState =
    | {
        errors?: {
            email?: string[]
            password?: string[]
            username?: string[]
        }
        message?: string
    }
    | undefined

export async function login(state: UserState, formData: FormData) {
    // Validate form fields
    const validatedFields = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: z.flattenError(validatedFields.error).fieldErrors
        }
    }

    const { email, password } = validatedFields.data

    // find user account from db
    const user = await db.orm.public.User.where({ email: email.trim().toLowerCase() }).first()

    if (!user) {
        return {
            message: 'User not found',
        }
    }

    if (!(await bcrypt.compare(password, user.password))) {
        return {
            message: 'Wrong password',
        }
    }

    // create user session
    await createSession(user.id)

    // redirect
    redirect('/blog')
}


export async function register(state: UserState, formData: FormData) {
    // Validate form fields
    const validatedFields = RegisterSchema.safeParse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: z.flattenError(validatedFields.error).fieldErrors,
        }
    }

    const { username, email, password } = validatedFields.data

    const hashedPassword = await bcrypt.hash(password, 10)

    const duplicateUser = await db.orm.public.User.where({ email: email.trim().toLowerCase() }).first()
    if (duplicateUser) {
        return {
            message: 'Email already registered',
        }
    }

    const user = await db.orm.public.User.create({
        username,
        email: email.trim().toLowerCase(),
        password: hashedPassword
    })

    // create user session
    await createSession(user.id)

    // redirect
    redirect('/blog')
}

export async function logout() {
    await deleteSession()
    redirect('/')
}