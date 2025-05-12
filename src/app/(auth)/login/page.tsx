"use client";
import { usePostLogin } from "@/api/services/core/auth/login/post/use-post-login";
import React from "react";

function page() {
  const mutation = usePostLogin({
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");


  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("test");
          
          mutation.mutate({
            email: userName,
            password: password,
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
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 w-fit p-4 rounded-2xl mx-auto">
    login
        </button>
      </form>
    </div>
  );
}

export default page;
