import {LessonsPanel} from "@/components/ui/LessonsPanel";
import {getSession} from "@/utils/getSession";

export default async function LessonsPage() {
    const user = await getSession()

    return (
        <LessonsPanel user={user}/>
    );
}