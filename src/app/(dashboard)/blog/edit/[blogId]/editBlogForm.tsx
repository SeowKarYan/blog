'use client'
import { updateBlog } from "@/actions/blog";
import Loader from "@/component/loader";
import Link from "next/link";
import { useActionState } from 'react'

type Props = {
    blogId: number;
    title: string | undefined;
    content: string | undefined;
    category: string | undefined;
}

export default function EditBlogForm({
    blogId,
    title,
    content,
    category
}: Props) {
    const [state, action, pending] = useActionState(updateBlog, undefined)

    return (
        <div>
            <h1 className="text-center">Edit Blog</h1>
            <form action={action} className="text-left">
                <div className="pt-5 hidden">
                    <label htmlFor="blogId">blogId</label><br />
                    <input className="border-solid border-2 border-blue-400 rounded-lg w-1/1 ps-1" id="blogId" name="blogId" type="text" placeholder="blogId" defaultValue={blogId} required />
                    {state?.errors?.blogId && <p className="text-red-500">{state.errors.blogId}</p>}
                </div>

                <div className="pt-5">
                    <label htmlFor="title">Title</label><br />
                    <input className="border-solid border-2 border-blue-400 rounded-lg w-1/1 ps-1" id="title" name="title" type="text" placeholder="title" defaultValue={title} required />
                    {state?.errors?.title && <p className="text-red-500">{state.errors.title}</p>}
                </div>

                <div className="pt-5">
                    <label htmlFor="category">Category</label><br />
                    <input className="border-solid border-2 border-blue-400 rounded-lg w-1/1 ps-1" id="category" name="category" type="text" defaultValue={category} placeholder="category" />
                    {state?.errors?.category && <p className="text-red-500">{state.errors.category}</p>}
                </div>

                <div className="pt-5">
                    <label htmlFor="content">Content</label><br />
                    <textarea className="border-solid border-2 border-blue-400 rounded-lg w-1/1 ps-1" id="content" rows={5} cols={40} name="content" defaultValue={content} placeholder="content" />
                    {state?.errors?.content && <p className="text-red-500">{state.errors.content}</p>}
                </div>

                <div className="pt-5 text-center">
                    {state?.message && (
                        <p className="text-red-500">{state.message}</p>
                    )}
                    {
                        pending
                            ? <Loader />
                            : <button type="submit" disabled={pending} className="bg-blue-400 p-1 hover:bg-blue-400/75 rounded-lg text-white m-2 w-50">Edit</button>
                    }
                </div>
                <div className="text-center">
                    <Link href="/blog/user" className="bg-red-400 p-1 hover:bg-red-400/75 rounded-lg text-white m-2 w-50 inline-block">Cancel</Link>
                </div>
            </form>
        </div>
    )
}