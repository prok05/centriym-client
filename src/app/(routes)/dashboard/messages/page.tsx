import {MessagesPanelStudent} from "@/components/messages/student/MessagesPanelStudent";
import {getSession} from "@/utils/getSession";

export default async function MessagesPage() {
    const user = await getSession()

    return (
        <MessagesPanelStudent />
    );
}