"use client";
import Image from "next/image";
import "./contract.css";

import React, { useState, useEffect } from "react";
// import jwt from "่jsonwebtoken";
import Link from "next/link";

import { FaHome } from "react-icons/fa";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { MdBedroomParent } from "react-icons/md";
import LogoNBU from "../assets/Northbkk.png";

export default function Navbar() {
  const [menuIcon, setIcon] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  // เพิ่มฟังก์ชัน fetchUserData ที่นี่
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // const decodedToken = jwt.decode(token);
          // const now = Date.now() / 1000;
          // if (decodedToken.exp < now) {
          //   console.error("Token has expired");
          //   return;
          // }
          // ถ้ามี token
          const res = await fetch("http://localhost:4000/fetch_user_data", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json();
            setUserEmail(data.email); // ตั้งค่า email
            setUserData(data); // ตั้งค่าข้อมูลผู้ใช้
          } else {
            console.error("Error fetching user data");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSmallerScreensNavigation = () => {
    setIcon(!menuIcon);
  };
  const handleLogout = () => {
    const confirmLogout = window.confirm("คุณต้องการออกจากระบบหรือไม่?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      setUserEmail(null);
      setUserData(null);
      window.location.href = "/"; // หากต้องการเปลี่ยน URL ให้เหมือนเดิม
    }
  };

  return (
    <header
      className="bg-[#FAFAFA] text-[#0000} w-full ease-in duration-300 fixed top-0 left-0 z-10 border-b-2 border-b-[#000]
        "
    >
      <nav className="max-w-{1366px} mx-auto h-{100px} flex justify-between items-center p-4 ">
        <div>
          <Link href="/" onClick={handleSmallerScreensNavigation}>
            <div className="flex items-center">
              <Image alt="Oogo" src={LogoNBU} sizes="40px" />
              <span className="  min-w-full  font-bold text-3xl md:text-2xl xl:text-2xl ml-2 justify-between font-puppins">
                NBU DMS
              </span>
            </div>
          </Link>
        </div>
        <ul className="hidden md:flex font-sembold text-1xl lg-text-[20px] text-[#707070] items-center font-FCBold text-center">
          <li className="mr-4 lg:mr-8 hover:text-[#E4965D] bg-clip-text border-b-2 border-transparent hover:border-[#E4965D]  ">
            <Link href="/" className="flex items-center gap-2 text-lg">
              <FaHome /> หน้าหลัก
            </Link>
          </li>
          <li className="mr-4 lg:mr-8 hover:text-[#E4965D] bg-clip-text border-b-2 border-transparent hover:border-[#E4965D]">
            <Link
              href="/Page/room_reservation"
              className="flex items-center gap-2 text-lg"
            >
              <MdBedroomParent />
              การเช่าห้อง
            </Link>
          </li>
          {userEmail ? (
            <li className="mr-4 lg:mr-8 hover:text-[#E4965D] seticon text-lg">
              {userEmail ? (
                <div>
                  {userEmail}
                  <button
                    onClick={handleLogout}
                    className="ml-2 text-lg text-red-500 "
                  >
                    ออก
                  </button>
                </div>
              ) : null}
            </li>
          ) : (
            <li className="mr-4 lg:mr-8 hover:text-[#E4965D] seticon">
              <Link href={"/PagesApi/Login_User"}>
                <button className="flex items-center gap-2 text-lg bg-[#E4965D] text-white p-2 rounded-lg shadow-lg">
                  เข้าสู่ระบบ
                </button>
              </Link>
            </li>
          )}
        </ul>

        <div
          onClick={handleSmallerScreensNavigation}
          className="flex md:hidden"
        >
          {menuIcon ? (
            <AiOutlineClose size={25} className="text-{#0000}" />
          ) : (
            <AiOutlineMenu size={25} className="text-{#0000}" />
          )}
        </div>

        <div
          className={
            menuIcon
              ? "md:hidden absolute top-[70px] right-0 bottom-0 left-0 flex justify-center items-center w-full h-screen  bg-[#E4965D] text-black text-center ease-in-out duration-1000"
              : "md:hidden absolute top-[70px] right-0 left-[-100%] flex justify-center items-center w-full h-screen bg-[#E4965D] text-black text-center ease-in-out duration-1000"
          }
        >
          <div className="w-full">
            <ul className=" uppercase font-bold text-2xl">
              <li
                onClick={handleSmallerScreensNavigation}
                className=" py-5 hover:text-[#ffff] cursor-pointer"
              >
                <Link href="/">หน้าหลัก</Link>
              </li>
              <li
                onClick={handleSmallerScreensNavigation}
                className=" py-5 hover:text-[#ffff] cursor-pointer"
              >
                <Link href="/Page/room_reservation">การเช่าห้อง</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
