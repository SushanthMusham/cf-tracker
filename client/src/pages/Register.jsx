// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [cfHandle, setCfHandle] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_API_URL}/auth/register`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             name,
//             email,
//             password,
//             cfHandle
//           }),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message);

//       setMessage("Account created! Redirecting to login...");
//       setTimeout(() => navigate("/login"), 1500);

//     } catch (err) {
//       setMessage(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
//       <form onSubmit={handleRegister} className="bg-gray-800 p-6 rounded-lg w-96">
//         <h1 className="text-xl font-bold mb-4">Create Account</h1>

//         <input className="w-full p-2 rounded mb-2 text-black"
//           placeholder="Name"
//           value={name}
//           onChange={(e)=>setName(e.target.value)}
//         />

//         <input className="w-full p-2 rounded mb-2 text-black"
//           placeholder="Codeforces Handle"
//           value={cfHandle}
//           onChange={(e)=>setCfHandle(e.target.value)}
//         />

//         <input className="w-full p-2 rounded mb-2 text-black"
//           placeholder="Email"
//           value={email}
//           onChange={(e)=>setEmail(e.target.value)}
//         />

//         <input className="w-full p-2 rounded mb-2 text-black"
//           placeholder="Password"
//           type="password"
//           value={password}
//           onChange={(e)=>setPassword(e.target.value)}
//         />

//         <button className="bg-indigo-600 w-full py-2 rounded">
//           Register
//         </button>

//         {message && <p className="mt-3">{message}</p>}
//       </form>
//     </div>
//   );
// }



import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Optional: Import icons if you use lucide-react or similar
// import { Sun, Moon } from "lucide-react"; 

export default function Register() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true); // Toggle State

  const [name, setName] = useState("");
  const [cfHandle, setCfHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, cfHandle }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.message);
    }
  };

  // Dynamic Classes
  const themeContainer = darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900";
  const themeCard = darkMode ? "bg-gray-800" : "bg-white shadow-xl";
  const themeInput = darkMode 
    ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600" 
    : "bg-gray-50 text-black placeholder-gray-500 border-gray-300";

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center transition-colors duration-300 ${themeContainer}`}>
      
      {/* Toggle Button */}
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="mb-4 p-2 rounded-full border border-gray-500 hover:bg-gray-700 hover:text-white transition"
      >
        {darkMode ? "☀️ Switch to Light" : "🌙 Switch to Dark"}
      </button>

      <form onSubmit={handleRegister} className={`p-8 rounded-lg w-96 border ${themeCard} border-transparent`}>
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>

        <div className="space-y-4">
          <input 
            className={`w-full p-2.5 rounded border focus:ring-2 focus:ring-indigo-500 outline-none ${themeInput}`}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input 
            className={`w-full p-2.5 rounded border focus:ring-2 focus:ring-indigo-500 outline-none ${themeInput}`}
            placeholder="Codeforces Handle"
            value={cfHandle}
            onChange={(e) => setCfHandle(e.target.value)}
          />

          <input 
            className={`w-full p-2.5 rounded border focus:ring-2 focus:ring-indigo-500 outline-none ${themeInput}`}
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input 
            className={`w-full p-2.5 rounded border focus:ring-2 focus:ring-indigo-500 outline-none ${themeInput}`}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2.5 rounded font-semibold transition shadow-lg">
            Register
          </button>
        </div>

        {message && (
          <p className={`mt-4 text-center text-sm ${message.includes("Error") ? "text-red-400" : "text-green-400"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}