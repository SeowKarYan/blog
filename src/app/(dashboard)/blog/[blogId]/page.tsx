import { getBlog } from '@/actions/blog'
import { notFound } from 'next/navigation'

export default async function Page({ params }: PageProps<'/blog/[blogId]'>) {
  const { blogId } = await params

  const blog = await getBlog(blogId)

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h1><b>{blog.title}</b></h1>
      <small className='bg-blue-400 p-1 rounded-lg text-white'>{blog.category}</small>
      <p className='text-sm pt-2'>Author: {blog.user.username}</p>
      <p className='text-sm'>Written on: {new Date(blog.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
      <p className='pt-2' style={{ whiteSpace: 'pre-line' }}>{blog.content}</p>
    </div>
  )
}