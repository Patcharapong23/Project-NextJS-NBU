"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      setError("จำเป็นต้องกรอกข้อมูลทุกช่อง.");
      return;
    }

    // ตรวจสอบว่า email มี @north.ac.th หรือไม่
    if (!email.endsWith("@northbkk.ac.th")) {
      setError("กรุณาใช้อีเมลที่ลงท้ายด้วย @northbkk.ac.th");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/Manage_User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        const data = await res.json();
        setError(data.message || "การลงทะเบียนผู้ใช้ล้มเหลว.");
      }
    } catch (error) {
      console.log("เกิดข้อผิดพลาดระหว่างการลงทะเบียน: ", error);
      setError("ข้อผิดพลาดเซิร์ฟเวอร์ภายใน กรุณาลองใหม่อีกครั้งในภายหลัง.");
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-[#E4965D]">
        <h1 className="text-xl font-bold my-4 text-center">ลงทะเบียน</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="w-[400px] border-gray-200 py-2 px-6 bg-zinc-100/40"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="อีเมล์"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="รหัสผ่าน"
            required
          />
          <button className="bg-[#E4965D] text-white font-bold cursor-pointer px-6 py-2">
            ลงทะเบียน
          </button>

          {error && (
            <div className="bg-[#ff4747] text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
