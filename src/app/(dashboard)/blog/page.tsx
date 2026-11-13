import { getBlogs } from "@/actions/blog";
import Link from "next/link";

export default async function Blog() {
    const blogs = await getBlogs()

    return (
        <div>
            <h1 className="text-center">Home</h1>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id} className="p-5 bg-gray-200 m-1 rounded-lg">
                        <Link href={`/blog/${blog.id}`} className="hover:text-black/50">
                            {blog.title}
                        </Link><br />
                        {blog.category && (<small className='bg-blue-400 p-1 rounded-lg text-white'>{blog.category}</small>)}
                        <p className='text-xs mt-1'>{new Date(blog.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}