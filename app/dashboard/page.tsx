"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/auth/me", { credentials: "include" })
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(() => router.push("/login"));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl">Dashboard</h1>
            {user ? <p>Welcome, {user.username}!</p> : <p>Loading...</p>}
        </div>
    );
}
