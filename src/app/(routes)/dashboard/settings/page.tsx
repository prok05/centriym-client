import {getSession} from "@/utils/getSession";

export default async function SettingsPage() {
    const user = await getSession()

    if (user?.user.role === "student") {
        return <h1>Настройки ученика</h1>
    }

    if (user?.user.role === "teacher") {
        return <h1>Настройки преподавателя</h1>
    }

    return (
        <h1>Настройки</h1>
    );
}