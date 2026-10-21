import Link from "next/link"

export const Sidebar = async () => {

    return (
        <aside>
            <div className="bg-blue-300 min-w-[10vw] min-h-[93vh]">
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
        </aside>
    )
}