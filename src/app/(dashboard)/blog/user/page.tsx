import { getUserBlogs } from "@/actions/blog";
import Link from "next/link";
import DeleteBlog from "../delete/deleteBlog";

export default async function Blog() {
    const blogs = await getUserBlogs()

    return (
        <div>
            <h1 className="text-center">My Blog</h1>
            <div className="flex justify-end">
                <Link href="/blog/create" className="bg-blue-400 p-2 hover:bg-blue-400/75 rounded-lg text-white m-2 inline-block">Create Blog</Link>
            </div>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id} className="p-5 flex justify-between items-center">
                        <div>
                            <Link href={`/blog/${blog.id}`}>
                                {blog.title}
                            </Link><br />
                            <small className='bg-blue-400 p-1 rounded-lg text-white'>{blog.category}</small>
                        </div>
                        <DeleteBlog id={blog.id} />
                    </li>
                ))}
            </ul>
        </div>
    )
}