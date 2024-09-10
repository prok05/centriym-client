import {MainLogo} from "@/components/ui/MainLogo";

export default function AuthLayout({
                                            children, // will be a page or nested layout
                                        }: {
    children: React.ReactNode
}) {
    return (
        <section className="flex-col items-center justify-center">
            <MainLogo />
            {children}
        </section>
    )
}