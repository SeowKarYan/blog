import { getUser } from "@/actions/auth"
import Link from "next/link"

export default async function Profile() {
    const user = await getUser()

    return (
        <div className="p-5">
            <div>
                <p className="font-bold">Username</p>
                <p>{user?.username}</p>
            </div>

            <div className="mt-3">
                <p className="font-bold">Email</p>
                <p>{user?.email}</p>
            </div>

            <div className="text-center">
                <Link href="/profile/edit" className="bg-blue-400 p-1 hover:bg-blue-400/75 rounded-lg text-white m-2 w-50 inline-block">
                    Edit Profile
                </Link>
            </div>

            <div className="text-center">
                <Link href="/profile/password" className="bg-red-400 p-1 hover:bg-red-400/75 rounded-lg text-white m-2 w-50 inline-block">
                    Change Password
                </Link>
            </div>
        </div>
    )
}