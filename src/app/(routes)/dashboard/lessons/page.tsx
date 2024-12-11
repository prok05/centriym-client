import {LessonsPanel} from "@/components/ui/LessonsPanel";
import {getSession} from "@/utils/getSession";
import {MessagesPanelTeacher} from "@/components/messages/teacher/MessagesPanelTeacher";
import {MessagesPanelStudent} from "@/components/messages/MessagesPanelStudent";
import MessagesPanelSupervisor from "@/components/messages/supervisor/MessagesPanelSupervisor";

export default async function LessonsPage() {
    const user = await getSession()

    if (user?.user.role === "teacher" || user?.user.role === "student") {
        return <LessonsPanel user={user}/>
    } else  {
        return null
    }
}