"use client";

import SignUp from "@/components/SignUp";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffffff]">
      <div className="w-full max-w-md">
        <SignUp />
        <p className="mt-4 text-center text-black">
          Already have an account?
          <a href="/login" className="ml-2 text-blue-500 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
