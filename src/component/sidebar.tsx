import Link from "next/link"

export const Sidebar = async () => {

    return (
        <div className="bg-linear-to-b from-blue-400 to-purple-400 min-w-[10vw] grow-0 shrink-0 basis-auto">
            <ul>
                <li className="p-3 hover:text-gray-900/50">
                    <Link href="/blog">
                        Home
                    </Link>
                </li>
                <li className="p-3 hover:text-gray-900/50">
                    <Link href="/blog/user">
                        My Blog
                    </Link>
                </li>
                <li className="p-3 hover:text-gray-900/50">
                    <Link href="/profile">
                        Profile
                    </Link>
                </li>
            </ul>
        </div>
    )
}