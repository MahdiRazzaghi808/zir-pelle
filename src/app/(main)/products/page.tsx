"use client";
import { PaginationTable } from "@/components/atoms/pagenation-table";
import React, { useState } from "react";

function Page() {
  const [page, setPage] = useState(1);

  return (
    <div>
      <PaginationTable
        page={page}
        pageSize={75}
        totalCount={40}
        onPageChange={(pageNumber) => setPage(pageNumber)}
      />
    </div>
  );
}

export default Page;
