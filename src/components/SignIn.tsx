import { signIn } from "next-auth/react"
import { useState } from "react"
import { GOOGLE_ICON_URL } from './constants';

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: '/'
      });
      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        console.log("Signed in successfully");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#ffffff95] text-black p-6 rounded-lg border">
      <h2 className="text-2xl mb-4">Sign In</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 bg-[#ffedc2] rounded"
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
          className="w-full p-2 bg-[#ffedc2] rounded"
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign In</button>
      <div className="mt-4 text-center">
        <span>or</span>
      </div>
      <button
        onClick={() => signIn("google")}
        className="w-full bg-white text-black p-2 rounded mt-4 flex items-center justify-center border"
      >
        <img src={GOOGLE_ICON_URL} alt="Google" className="w-6 h-6 mr-2" />
        Sign in with Google
      </button>
    </form>
  )
}
