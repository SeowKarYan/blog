import { Header } from "@/component/header";
import { Sidebar } from "@/component/sidebar";

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="flex flex-1">
                <Sidebar />

                <div className="flex-1">{children}</div>
            </div>
        </div>
    );
}
