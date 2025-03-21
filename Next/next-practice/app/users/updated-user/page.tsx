"use client";

import { userState } from "@/app/recoil/atoms";
import { useRecoilValue } from "recoil";

export default function UserUpdatePage() {
  const user = useRecoilValue(userState);

  return (
    <div>
      <h1>Update User Page</h1>

      <div> updated user name : {user.name}</div>
      <div> updated user email : {user.email}</div>
    </div>
  );
}
