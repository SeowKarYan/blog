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
                    <li key={blog.id} className="p-5 flex justify-between items-center bg-gray-200 m-1 rounded-lg">
                        <div>
                            <p>{blog.title}</p>
                            {blog.category && (<small className='bg-blue-400 p-1 rounded-lg text-white'>{blog.category}</small>)}
                        </div>
                        <div className="flex gap-2">
                            <div>
                                <Link href={`/blog/${blog.id}`} className="bg-blue-400 p-1 hover:bg-blue-400/75 rounded-lg text-white m-2 inline-block w-1/1 text-center">View</Link>
                            </div>
                            <div>
                                <Link href={`/blog/edit/${blog.id}`} className="bg-blue-400 p-1 hover:bg-blue-400/75 rounded-lg text-white m-2 inline-block w-1/1 text-center">Edit</Link>
                            </div>
                            <DeleteBlog id={blog.id} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}