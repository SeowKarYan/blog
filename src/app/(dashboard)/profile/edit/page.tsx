import { getUser } from "@/actions/auth"
import EditProfileForm from "./editProfileForm"

export default async function EditProfile() {
    const user = await getUser()

    return (
        <EditProfileForm 
            username={user?.username}
            email={user?.email}
        />
    )
}