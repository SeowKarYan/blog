"use server";
import * as z from 'zod'
import bcrypt from 'bcrypt'
import { UserState } from '@/lib/definitions';
import { db } from '@/prisma/db';
import { not } from '@prisma/orm-postgres/orm-client';
import { redirect } from 'next/navigation';

const ProfileSchema = z.object({
    id: z.string().min(1),
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    username: z
        .string()
        .min(1, { error: 'Username is required' })
})

const PasswordSchema = z.object({
    id: z.string().min(1),
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

export async function updateProfile(state: UserState, formData: FormData) {
    // Validate form fields
    const validatedFields = ProfileSchema.safeParse({
        id: formData.get('id'),
        username: formData.get('username'),
        email: formData.get('email'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: z.flattenError(validatedFields.error).fieldErrors,
        }
    }

    const { id, username, email } = validatedFields.data

    const duplicateUser = await db.orm.public.User
        .where({ email: email.trim().toLowerCase() })
        .where((u) => not(u.id.eq(Number(id))))
        .first()

    if (duplicateUser) {
        return {
            message: 'Email already registered',
        }
    }

    const updatedUser = await db.orm.public.User
        .where({ id: Number(id) })
        .update({ username, email: email.trim().toLowerCase() });

    redirect('/profile')
}

export async function changePassword(state: UserState, formData: FormData) {
    // Validate form fields
    const validatedFields = PasswordSchema.safeParse({
        id: formData.get('id'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: z.flattenError(validatedFields.error).fieldErrors,
        }
    }

    const { id, password } = validatedFields.data

    const hashedPassword = await bcrypt.hash(password, 10)

    const updatedUser = await db.orm.public.User
        .where({ id: Number(id) })
        .update({ password: hashedPassword });

    redirect('/profile')
}