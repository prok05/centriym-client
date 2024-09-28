import {NavigationPanel} from "@/components/ui/NavigationPanel";
import {ProfilePanel} from "@/components/ui/ProfilePanel";

export default function DashboardLayout({
    children, // will be a page or nested layout
        }: {
    children: React.ReactNode
}) {
    return (
        <section className="flex h-screen">
            <NavigationPanel />
            <div className="w-2/3 bg-gray-100 p-10 overflow-hidden">
                    {children}
            </div>
            <ProfilePanel />

        </section>
    )
}