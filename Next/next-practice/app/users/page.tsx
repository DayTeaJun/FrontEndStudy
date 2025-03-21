"use client";
import React, { useEffect, useState } from "react";
import { SearchUsers } from "../actions/user-actions";

function UsersPage() {
  const [users, setUsers] = useState([]);

  //   fetch(), rest api 호출 방법
  //   useEffect(() => {
  //     fetch(`api/users?name=${"Alice"}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setUsers(data.users);
  //       });
  //   }, []);

  // 별도 api 구현없이 함수 임포트
  useEffect(() => {
    SearchUsers("Alice").then((data) => setUsers(data));
  }, []);

  return (
    <main>
      <h1 className="text-black text-[24px]">users</h1>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </main>
  );
}

export default UsersPage;
