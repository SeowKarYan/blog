'use client'
import { updateProfile } from "@/actions/user"
import Input from "@/component/input";
import Loader from "@/component/loader";
import Link from "next/link";
import { useActionState } from 'react'

type Props = {
    username: string | undefined;
    email: string | undefined;
}

export default function EditProfileForm({
    username,
    email,
}: Props) {
    const [state, action, pending] = useActionState(updateProfile, undefined)

    return (
        <div>
            <h1 className="text-center">Edit Profile</h1>
            <form action={action} className="text-left">
                <div className="pt-5">
                    <label htmlFor="email">Username</label><br />
                    <Input id="username" name="username" type="text" placeholder="Username" defaultValue={username} required />
                    {state?.errors?.username && <p className="text-red-500">{state.errors.username}</p>}
                </div>

                <div className="pt-2">
                    <label htmlFor="email">Email</label><br />
                    <Input id="email" name="email" type="email" placeholder="Email" defaultValue={email} required />
                    {state?.errors?.email && <p className="text-red-500">{state.errors.email}</p>}
                </div>

                <div className="pt-5 text-center">
                    {state?.message && (
                        <p className="text-red-500">{state.message}</p>
                    )}
                    {
                        pending
                            ? <Loader />
                            : <button type="submit" disabled={pending} className="bg-blue-400 p-1 hover:bg-blue-400/75 rounded-lg text-white m-2 w-50">Submit</button>
                    }
                </div>
                <div className="text-center">
                    <Link href="/profile" className="bg-red-400 p-1 hover:bg-red-400/75 rounded-lg text-white m-2 w-50 inline-block">Cancel</Link>
                </div>
            </form>
        </div>
    )
}