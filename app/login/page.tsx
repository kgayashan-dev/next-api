"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include', // Ensures cookies are sent
        });

        if (res.ok) {
            router.push('/dashboard');
        } else {
            setError("Invalid login credentials");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input className="w-full p-2 mb-4 border rounded" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input className="w-full p-2 mb-4 border rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">Login</button>
            </form>
        </div>
    );
}
