import {DashboardPanel} from "@/components/ui/DashboardPanel";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

const queryClient = new QueryClient()

export default function DashboardPage() {
    return (

            <DashboardPanel />
    );
}