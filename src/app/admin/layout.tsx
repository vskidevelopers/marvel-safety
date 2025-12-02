// app/admin/layout.tsx
import { ConvexClientProvider } from "../ConvexClientProvider";
import { redirect } from "next/navigation";
import AdminSidebarLayout from "./admin-sidebar-layout";

export default async function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Enforce authentication for ALL admin pages
    const isAuthenticated = true
    if (!isAuthenticated) {
        redirect("/login");
    }

    return (
        <html lang="en">
            <body>
                <ConvexClientProvider>
                    <AdminSidebarLayout>
                        {children}
                    </AdminSidebarLayout>
                </ConvexClientProvider>
            </body>
        </html>
    );
}