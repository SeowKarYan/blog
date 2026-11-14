'use client'
import { register } from "@/actions/auth";
import { useActionState } from 'react'
import Link from "next/link";
import Loader from "@/component/loader";

export default function Register() {
    const [state, action, pending] = useActionState(register, undefined)
    return (
        <div className="bg-linear-to-b from-blue-500 to-purple-500 h-screen">
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white p-8 text-center">
                    <h1>Register</h1>
                    <form action={action} className="text-left">
                        <div className="pt-5">
                            <label htmlFor="email">Username</label><br />
                            <input className="border-solid border-2 border-blue-400 rounded-lg w-1/1 ps-1" id="username" name="username" type="text" placeholder="Username" required />
                            {state?.errors?.username && <p className="text-red-500">{state.errors.username}</p>}
                        </div>

                        <div className="pt-2">
                            <label htmlFor="email">Email</label><br />
                            <input className="border-solid border-2 border-blue-400 rounded-lg w-1/1 ps-1" id="email" name="email" type="email" placeholder="Email" required />
                            {state?.errors?.email && <p className="text-red-500">{state.errors.email}</p>}
                        </div>

                        <div className="pt-2">
                            <label htmlFor="password">Password</label><br />
                            <input className="border-solid border-2 border-blue-400 rounded-lg w-1/1 ps-1" id="password" name="password" type="password" placeholder="Password" required />
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
                                    : <button type="submit" disabled={pending} className="bg-blue-400 p-1 hover:bg-blue-500/50 rounded-lg text-white w-1/1">Register</button>
                            }
                        </div>
                    </form>
                    <div className="mt-3">
                        <Link href="/">
                            Already have an account? Login now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
