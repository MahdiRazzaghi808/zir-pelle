"use client";

import React, { useEffect } from "react";

function page() {
  useEffect(() => {
    console.log("useEffect");
  }, []);

  return <div className="">page</div>;
}

export default page;
