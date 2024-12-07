import {getSession} from "@/utils/getSession";
import StatisticsSupervisorPanel from "@/components/statistics/supervisor/StatisticsSupervisorPanel";

export default async function StatisticPage() {
    const user = await getSession()

    if (user?.user.role === "supervisor") {
        return <StatisticsSupervisorPanel />
    } else {
        return <h1>Ничего не найдено :(</h1>
    }
}