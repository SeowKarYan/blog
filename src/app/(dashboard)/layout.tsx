import { Header } from "@/component/header";
import { Sidebar } from "@/component/sidebar";

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <div className="min-h-screen">
            <Header />

            <div className="flex">
                <Sidebar />

                <main>{children}</main>
            </div>
        </div>
    );
}
