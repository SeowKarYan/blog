"use server";

import * as z from 'zod'
import bcrypt from 'bcrypt'
import { db } from '@/prisma/db'
import { createSession, deleteSession, verifySession } from '@/lib/session'
import { redirect } from "next/navigation";
import { UserState } from '@/lib/definitions';
import { checkEmail, checkPassword, checkUsername } from '@/lib/validation';

const LoginSchema = z.object({
    email: checkEmail,
    password: checkPassword,
})

const RegisterSchema = z.object({
    email: checkEmail,
    password: checkPassword,
    username: checkUsername
})

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

export async function getUser() {
    const session = await verifySession()
    let userId = Number(session?.userId)
    if (!userId) {
        return null
    } else {
        const user = db.orm.public.User
            .select("id", "username", "email")
            .where({ id: userId })
            .first()

        return user
    }
}