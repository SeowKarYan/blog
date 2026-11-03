import { getBlogs } from "@/actions/blog";
import Link from "next/link";

export default async function Blog() {
    const blogs = await getBlogs()

    return (
        <div>
            <h1 className="text-center">Home</h1>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id} className="p-5">
                        <Link href={`/blog/${blog.id}`}>
                            {blog.title}
                        </Link><br />
                        <small className='bg-blue-400 p-1 rounded-lg text-white'>{blog.category}</small>
                    </li>
                ))}
            </ul>
        </div>
    )
}