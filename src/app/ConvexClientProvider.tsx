"use client";

import { ReactNode, useEffect, useState } from "react";
import { ConvexReactClient } from "convex/react";
import { useAuth } from "@clerk/nextjs";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
    children,
}: {
    children: ReactNode;
}) {
    const { getToken, isLoaded, userId } = useAuth();
    const [ready, setReady] = useState(false);

    // useEffect(() => {
    //     const setupAuth = async () => {
    //         if (!isLoaded) return;

<<<<<<< HEAD
    //         try {
    //             if (userId) {
    //                 const token = await getToken({ template: "convex" });
    //                 convex.setAuth(token || undefined);
    //             } else {
    //                 convex.setAuth(undefined);
    //             }
    //         } catch (error) {
    //             console.error("Auth setup failed", error);
    //             convex.setAuth(undefined);
    //         }
=======
            try {
                if (userId) {
                    const token = await getToken({ template: "convex" });
                    convex.setAuth(token || "");
                } else {
                    convex.setAuth("");
                }
            } catch (error) {
                console.error("Auth setup failed", error);
                convex.setAuth("");
            }
>>>>>>> 4b6b1a0a6586fc76549fc9a61ac73e4399ab2c7e

    //         setReady(true);
    //     };

    //     setupAuth();
    // }, [isLoaded, userId, getToken]);

    if (!ready) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return children;
}