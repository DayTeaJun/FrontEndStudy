"use client";

import { useState } from "react";
import SignUp from "./signup";
import SignIn from "./signin";

// signup, signin 관리하는 진입점 컴포넌트

export default function AuthPage() {
  const [view, setView] = useState("SIGNUP"); // 현재 페이지

  return (
    <main className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-purple-50 to-light-blue-50">
      {view === "SIGNUP" ? (
        <SignUp setView={setView} />
      ) : (
        <SignIn setView={setView} />
      )}
    </main>
  );
}
