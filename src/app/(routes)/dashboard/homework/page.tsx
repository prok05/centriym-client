import HomeworkPanelStudent from "@/components/homework/HomeworkPanelStudent";
import {getSession} from "@/utils/getSession";
import HomeworkPanelTeacher from "@/components/homework/HomeworkPanelTeacher";


export default async function HomeworkPage() {
    const user = await getSession()

    if (user?.user.role === "teacher") {
        return <HomeworkPanelTeacher />
    } else if (user?.user.role === "student") {
        return <HomeworkPanelStudent />
    }
}