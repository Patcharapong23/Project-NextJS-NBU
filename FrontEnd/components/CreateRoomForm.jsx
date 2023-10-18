"use client";
import { useState } from "react";

export default function CreateRoomForm() {
  const [roomData, setRoomData] = useState({
    floor: "", // Make sure floor is defined here
    roomNumber: "",
    type: "",
    cost: "",
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData({
      ...roomData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/admin-create-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roomData),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        alert("Room created successfully!");
      } else {
        console.log("Error creating room.");
      }
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-[#E4965D]">
        <h1 className="text-xl font-bold my-4 text-center">สร้างห้อง</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="w-[400px] border-gray-200 py-2 px-6 bg-zinc-100/40"
            type="text"
            name="floor"
            value={roomData.floor}
            onChange={handleChange}
            placeholder="ชั้น"
            required
          />
          <input
            className="w-[400px] border-gray-200 py-2 px-6 bg-zinc-100/40"
            type="text"
            name="roomNumber"
            value={roomData.roomNumber}
            onChange={handleChange}
            placeholder="หมายเลขห้อง"
            required
          />
          <input
            className="w-[400px] border-gray-200 py-2 px-6 bg-zinc-100/40"
            type="text"
            name="type"
            value={roomData.type}
            onChange={handleChange}
            placeholder="ประเภทห้อง"
            required
          />
          <input
            className="w-[400px] border-gray-200 py-2 px-6 bg-zinc-100/40"
            type="text"
            name="cost"
            value={roomData.cost}
            onChange={handleChange}
            placeholder="ราคา"
            required
          />
          <input
            className="w-[400px] border-gray-200 py-2 px-6 bg-zinc-100/40"
            type="text"
            name="quantity"
            value={roomData.quantity}
            onChange={handleChange}
            placeholder="จำนวน"
            required
          />

          {/* เพิ่ม Input Fields อื่นๆ ตามที่ต้องการ */}
          <button className="bg-[#E4965D] text-white font-bold cursor-pointer px-6 py-2">
            สร้างห้อง
          </button>
        </form>
      </div>
    </div>
  );
}
