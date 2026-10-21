import Link from "next/link";

export default async function Blog() {
    const posts = [
        { id: 1, post: "post1" },
        { id: 2, post: "post2" },
        { id: 3, post: "post3" }
    ]

    return (
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <Link href={`/blog/${post.id}`}>
                        post: {post.post}
                    </Link>
                </li>
            ))}
        </ul>
    )
}