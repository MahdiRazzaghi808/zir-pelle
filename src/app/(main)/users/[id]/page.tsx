import React from "react";

export const revalidate = 10;
export const dynamicParams = true;

export async function generateStaticParams() {
  return [{ id: "1" }];
}




async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await fetch(`http://localhost:3001/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());



  return <div>
   
    {data.username}</div>;
}

export default page;
