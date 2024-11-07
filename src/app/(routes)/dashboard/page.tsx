import {DashboardPanel} from "@/components/ui/DashboardPanel";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

const queryClient = new QueryClient()

export default function DashboardPage() {
    return (
        // <QueryClientProvider client={queryClient} >
            <DashboardPanel />
        // </QueryClientProvider>
    );
}