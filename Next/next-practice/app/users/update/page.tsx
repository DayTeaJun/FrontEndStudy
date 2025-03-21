"use client";

import { userState } from "@/app/recoil/atoms";
import React from "react";
import { useRecoilState } from "recoil";
import Link from "next/link";

function UserUpdatePage() {
  // useState와 비슷한 구조
  const [user, setUser] = useRecoilState(userState);

  return (
    <div>
      <h1>Update User Page</h1>
      <input
        type="email"
        placeholder="Enter your Email"
        value={user.email}
        onChange={(e) =>
          setUser((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      <input
        type="text"
        placeholder="Enter your Name"
        value={user.name}
        onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
      />

      <Link href="/users/updated-user">Check user</Link>
    </div>
  );
}

export default UserUpdatePage;
