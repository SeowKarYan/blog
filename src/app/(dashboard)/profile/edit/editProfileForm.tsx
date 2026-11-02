'use client'
import { updateProfile } from "@/actions/user"
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
        <div className="p-5">
            <form action={action} className="text-left">
                <div className="pt-5">
                    <label htmlFor="email">Username</label><br />
                    <input className="border-solid border-2 border-blue-400 rounded-lg w-1/1" id="username" name="username" type="text" placeholder="Username" defaultValue={username} required />
                    {state?.errors?.username && <p className="text-red-500">{state.errors.username}</p>}
                </div>

                <div className="pt-2">
                    <label htmlFor="email">Email</label><br />
                    <input className="border-solid border-2 border-blue-400 rounded-lg w-1/1" id="email" name="email" type="email" placeholder="Email" defaultValue={email} required />
                    {state?.errors?.email && <p className="text-red-500">{state.errors.email}</p>}
                </div>

                <div className="pt-5 text-center">
                    {state?.message && (
                        <p className="text-red-500">{state.message}</p>
                    )}
                    <button type="submit" disabled={pending} className="bg-blue-400 p-1 hover:bg-blue-400/75 rounded-lg text-white m-2 w-50">Submit</button>
                </div>
                <div className="text-center">
                    <Link href="/profile" className="bg-red-400 p-1 hover:bg-red-400/75 rounded-lg text-white m-2 w-50 inline-block">Cancel</Link>
                </div>
            </form>
        </div>
    )
}