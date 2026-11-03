'use client'
import { useActionState } from 'react'
import { createBlog } from '@/actions/blog';
import Link from "next/link";

export default function CreateBlog() {
    const [state, action, pending] = useActionState(createBlog, undefined)
    return (
        <div>
            <h1 className="text-center">Create Blog</h1>
            <form action={action} className="text-left">
                <div className="pt-5">
                    <label htmlFor="title">Title</label><br />
                    <input className="border-solid border-2 border-blue-400 rounded-lg w-1/1" id="title" name="title" type="text" placeholder="title" required />
                    {state?.errors?.title && <p className="text-red-500">{state.errors.title}</p>}
                </div>

                <div className="pt-5">
                    <label htmlFor="category">Category</label><br />
                    <input className="border-solid border-2 border-blue-400 rounded-lg w-1/1" id="category" name="category" type="text" placeholder="category" />
                    {state?.errors?.category && <p className="text-red-500">{state.errors.category}</p>}
                </div>

                <div className="pt-5">
                    <label htmlFor="content">Content</label><br />
                    <textarea className="border-solid border-2 border-blue-400 rounded-lg w-1/1" id="content" rows={5} cols={40} name="content" placeholder="content" />
                    {state?.errors?.content && <p className="text-red-500">{state.errors.content}</p>}
                </div>

                <div className="pt-5 text-center">
                    {state?.message && (
                        <p className="text-red-500">{state.message}</p>
                    )}
                    <button type="submit" disabled={pending} className="bg-blue-400 p-1 hover:bg-blue-400/75 rounded-lg text-white m-2 w-50">Create</button>
                </div>
                <div className="text-center">
                    <Link href="/blog/user" className="bg-red-400 p-1 hover:bg-red-400/75 rounded-lg text-white m-2 w-50 inline-block">Cancel</Link>
                </div>
            </form>
        </div>
    )
}