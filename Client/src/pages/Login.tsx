import { useState } from "react";
import { Alert } from "../components/Alert";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill in both fields.");
            return;
        }

        setError("");
        console.log("Logging in with", { email, password });
        // Place your login logic here
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            {/* <Alert /> */}
            <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white border border-[#86efac]">
                <h2 className="text-3xl font-bold mb-6 text-[#14532d] text-center">Login</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-[#14532d] font-medium mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-4 py-2 border border-[#86efac] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#86efac]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-[#14532d] font-medium mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-4 py-2 border border-[#86efac] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#86efac]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button type="submit" className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold py-2 px-4 rounded-xl transition duration-300">
                        Sign In
                    </button>
                </form>

                <p className="text-sm text-center text-[#14532d] mt-6">
                    Don't have an account?{" "}
                    <a href="#" className="underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
