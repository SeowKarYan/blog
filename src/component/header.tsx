import { logout } from "@/actions/auth"

export const Header = () => {
    return (
        <div className="bg-indigo-600 flex justify-end h-[7vh] grow-0 shrink-0 basis-auto">
            <button type="button" className="bg-blue-400 p-1 hover:bg-blue-400/75 rounded-lg text-white m-2 w-30" onClick={logout}>Logout</button>
        </div>
    )
}