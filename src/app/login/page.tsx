"use client";

import SignIn from "@/components/SignIn";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffffff]">
      <div className="w-full max-w-md">
        <SignIn />
        <p className="mt-4 text-center text-black ">
            Don&apos;t have an account?
          <a href="/register" className="ml-2 text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
