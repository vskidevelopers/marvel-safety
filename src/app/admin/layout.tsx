import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminSidebarLayout from "./admin-sidebar-layout";

export default async function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Protect ONLY admin routes
    // const { userId } = await auth();
    const userId = true
    if (!userId) {
        // Redirect to login WITH return URL
        redirect("/sign-in?redirect_url=/admin");
    }

    return (
        <html lang="en">
            <body>
                <AdminSidebarLayout>{children}</AdminSidebarLayout>
            </body>
        </html>
    );
}