import { auth } from "@clerk/nextjs/server";
import { useRouter } from "next/navigation";
import AdminSidebarLayout from "./admin-sidebar-layout";
import { useAuth } from "@/context/auth-context";

export default async function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

      const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading || !isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
  }



    return (
        <html lang="en">
            <body>
                <AdminSidebarLayout>{children}</AdminSidebarLayout>
            </body>
        </html>
    );
}