'use client'

import { changePassword } from "@/actions/user"
import { useActionState } from "react"

export default function ChangePassword() {
    const [state, action, pending] = useActionState(changePassword, undefined)

    return (
        <div className="p-5">
            <form action={action} className="text-left">

            </form>
        </div>
    )
}