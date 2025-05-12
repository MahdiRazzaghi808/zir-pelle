"use client";
import { usePostRegister } from "@/api/services/core/auth/register/post/use-post-register";
import React from "react";

function page() {
  const mutation = usePostRegister({
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("test");
          
          mutation.mutate({
            username: userName,
            password: password,
            role: role,
          });
        }}
        className="flex flex-col gap-4 max-w-2xl mx-auto mt-12 "
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-red-600 w-fit p-4 rounded-2xl mx-auto">
          Register
        </button>
      </form>
    </div>
  );
}

export default page;
