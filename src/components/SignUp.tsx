import { useState } from "react"
import { signIn } from "next-auth/react"
import { GOOGLE_ICON_URL } from './constants';

export default function SignUp() {
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fullname, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        console.log("User created successfully");
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false
        });

        if (result?.error) {
          setError(result.error);
        } else if (result?.ok) {
          console.log("Signed in successfully");
          window.location.href = "/";
        } else {
          setError("An unexpected error occurred during sign in");
        }
      } else {
        setError(data.message || "Failed to create account");
      }
    } catch (error) {
      setError("An unexpected error occurred");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#ffffff95] text-black border p-6 rounded-lg">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="fullname" className="block mb-2">Full Name:</label>
        <input
          type="text"
          id="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 bg-[#222] rounded"
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign Up</button>
      <div className="mt-4 text-center">
        <span>or</span>
      </div>
      <button
        onClick={() => signIn("google")}
        className="w-full bg-white text-black p-2 rounded mt-4 flex items-center justify-center border"
      >
        <img src={GOOGLE_ICON_URL} alt="Google" className="w-6 h-6 mr-2" />
        Sign up with Google
      </button>
    </form>
  )
}
