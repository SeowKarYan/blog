"use server";
import * as z from 'zod'
import { BlogState } from "@/lib/definitions";
import { verifySession } from "@/lib/session";
import { db } from "@/prisma/db";
import { redirect } from 'next/navigation';

const BlogSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, { error: 'title is required' }),
    content: z
        .string()
        .optional(),
    category: z
        .string()
        .optional(),
})

export async function getBlogs() {
    const blogs = db.orm.public.Blog
        .include("user")
        .orderBy((b) => b.createdAt.desc())
        .all()

    return blogs
}

export async function getUserBlogs() {
    const session = await verifySession()
    let userId = Number(session?.userId)

    const blogs = db.orm.public.Blog
        .where({ userId })
        .orderBy((b) => b.createdAt.desc())
        .all()

    return blogs
}

export async function getBlog(blogId: string) {
    const blog = db.orm.public.Blog
        .where({ id: Number(blogId) })
        .include("user")
        .first()

    return blog
}

export async function createBlog(state: BlogState, formData: FormData) {
    // Validate form fields
    const validatedFields = BlogSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content') || undefined,
        category: formData.get('category') || undefined
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: z.flattenError(validatedFields.error).fieldErrors,
        }
    }

    const { title, content, category } = validatedFields.data

    const session = await verifySession()
    let userId = Number(session?.userId)

    if (!userId) {
        return {
            message: 'Session expired, please login again',
        }
    }

    const blog = await db.orm.public.Blog.create({
        title,
        content,
        category,
        userId
    })

    redirect('/blog/user')
}

export async function deleteBlog(blogId: number) {
    const session = await verifySession()
    let userId = Number(session?.userId)

    if (!userId) {
        return {
            success: false,
            message: 'Session expired, please login again',
        }
    }

    const blog = await db.orm.public.Blog
        .where({ id: blogId })
        .first()

    if (!blog) {
        return {
            success: false,
            message: 'Blog not found',
        }
    } else if (blog.userId !== userId) {
        return {
            success: false,
            message: 'Blog not belongs to this user, unauthorized to delete',
        }
    }

    const deletedBlog = await db.orm.public.Blog
        .where({ id: blogId })
        .delete()

    return {
        success: true,
        message: "Blog deleted successfully"
    }
}