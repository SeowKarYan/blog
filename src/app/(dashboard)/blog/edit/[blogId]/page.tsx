import { getBlog } from "@/actions/blog"
import { notFound } from "next/navigation"
import EditBlogForm from "./editBlogForm"

export default async function EditBlog({ params }: PageProps<'/blog/edit/[blogId]'>) {

    const { blogId } = await params

    const blog = await getBlog(blogId)

    if (!blog) {
        notFound()
    }

    return (
        <EditBlogForm
            blogId={blog.id}
            title={blog.title}
            content={blog.content ?? ''}
            category={blog.category ?? ''}
        />
    )
}