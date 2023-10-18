import { useEffect, useState } from "react";

const UserProfilePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // ดึงข้อมูลผู้ใช้ที่จะแสดง
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:4000/fetch_user_data", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUserData(data);
      } else {
        console.error("Error fetching user data:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      {userData && <div>Email: {userData.email}</div>}
    </div>
  );
};

export default UserProfilePage;
