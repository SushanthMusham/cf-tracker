import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [cfHandle, setCfHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
            cfHandle
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setMessage("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <form onSubmit={handleRegister} className="bg-gray-800 p-6 rounded-lg w-96">
        <h1 className="text-xl font-bold mb-4">Create Account</h1>

        <input className="w-full p-2 rounded mb-2 text-black"
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input className="w-full p-2 rounded mb-2 text-black"
          placeholder="Codeforces Handle"
          value={cfHandle}
          onChange={(e)=>setCfHandle(e.target.value)}
        />

        <input className="w-full p-2 rounded mb-2 text-black"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input className="w-full p-2 rounded mb-2 text-black"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="bg-indigo-600 w-full py-2 rounded">
          Register
        </button>

        {message && <p className="mt-3">{message}</p>}
      </form>
    </div>
  );
}
