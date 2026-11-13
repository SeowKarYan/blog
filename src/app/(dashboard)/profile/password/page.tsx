'use client'

import { changePassword } from "@/actions/user"
import Loader from "@/component/loader"
import Link from "next/link"
import { useActionState } from "react"

export default function ChangePassword() {
    const [state, action, pending] = useActionState(changePassword, undefined)

    return (
        <div>
            <h1 className="text-center">Change Password</h1>
            <form action={action} className="text-left">
                <div className="pt-5">
                    <label htmlFor="password">Password</label><br />
                    <input className="border-solid border-2 border-blue-400 rounded-lg w-1/1" id="password" name="password" type="password" placeholder="Password" required />
                    {state?.errors?.password && (
                        <div className="text-red-500">
                            <p>Password must:</p>
                            <ul>
                                {state.errors.password.map((error) => (
                                    <li key={error}>- {error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="pt-5 text-center">
                    {state?.message && (
                        <p className="text-red-500">{state.message}</p>
                    )}
                    {
                        pending
                            ? <Loader />
                            : <button type="submit" disabled={pending} className="bg-blue-400 p-1 hover:bg-blue-400/75 rounded-lg text-white m-2 w-50">Change Password</button>
                    }
                </div>
                <div className="text-center">
                    <Link href="/profile" className="bg-red-400 p-1 hover:bg-red-400/75 rounded-lg text-white m-2 w-50 inline-block">Cancel</Link>
                </div>
            </form>
        </div>
    )
}