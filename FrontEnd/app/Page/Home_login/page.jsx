"use client";
// ทำการ import ส่วนที่จำเป็น
import React, { useState, useEffect } from "react";
export default function HomeLogin() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authorization token missing");
          return;
        }

        const res = await fetch("http://localhost:4000/fetch_user_data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-auto md:flex-row justify-center items-center h-full gap-6 sm:gap-6 p-10 mt-24 ">
      {userData && <div>Hello! {userData.email}</div>}
    </div>
  );
}
