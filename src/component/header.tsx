import { logout } from "@/actions/auth"

export const Header = () => {
    return (
        <header>
            <div className="bg-indigo-600 flex justify-end h-[7vh]">
                <button type="button" className="bg-blue-400 p-1 hover:bg-blue-400/75 rounded-lg text-white m-2 w-30" onClick={logout}>Logout</button>
            </div>
        </header>
    )
}