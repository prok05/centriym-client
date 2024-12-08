import {MessagesPanelStudent} from "@/components/messages/MessagesPanelStudent";
import {getSession} from "@/utils/getSession";
import {MessagesPanelTeacher} from "@/components/messages/teacher/MessagesPanelTeacher";
import MessagesPanelSupervisor from "@/components/messages/supervisor/MessagesPanelSupervisor";

export default async function MessagesPage() {
    const user = await getSession()

    if (user?.user.role === "teacher") {
        return <MessagesPanelTeacher user={user}/>
    } else if (user?.user.role === "student") {
        return <MessagesPanelStudent user={user}/>
    } else if (user?.user.role === "supervisor") {
        return <MessagesPanelSupervisor />
    }
}