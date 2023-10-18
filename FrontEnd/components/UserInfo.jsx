"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function UserInfo() {
  const router = useRouter();

  const signOut = () => {
    localStorage.removeItem("token");
    router.push("/"); // ให้กลับไปหน้าหลักหลังจาก sign out
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // ถ้าไม่มี token ให้ redirect ไปหน้า login
      router.push("/PagesApi/Login_User");
    }
  });

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
        <div>
          Email: <span className="font-bold"></span>
        </div>
        <button
          onClick={signOut}
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
