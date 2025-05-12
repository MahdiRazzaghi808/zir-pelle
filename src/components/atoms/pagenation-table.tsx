"use client";

import { type ReactNode } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationButton,
  PaginationNext,
  PaginationPrevious,
} from "@/components/atoms/pagination";
import { cn } from "@/utils/cn";

export interface PaginationTableProps {
  totalCount: number;
  pageSize?: number;
  page: number;
  onPageChange: (pageNumber: number) => void;
  className?: string;
}

export function PaginationTable({
  page = 1,
  pageSize = 10,
  totalCount,
  onPageChange,
  className,
}: PaginationTableProps) {
  const totalPageCount = Math.ceil(totalCount / pageSize);
  const maxVisiblePages = 5;
  const halfVisible = Math.floor(maxVisiblePages / 2);

  const renderPageNumbers = () => {
    const items: ReactNode[] = [];

    // If total pages less than or equal to max, render all
    if (totalPageCount <= maxVisiblePages) {
      for (let i = 1; i <= totalPageCount; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationButton
              onClick={() => onPageChange(i)}
              isActive={page === i}
            >
              {i}
            </PaginationButton>
          </PaginationItem>
        );
      }
      return items;
    }

    // Always show first page
    items.push(
      <PaginationItem key={1}>
        <PaginationButton onClick={() => onPageChange(1)} isActive={page === 1}>
          1
        </PaginationButton>
      </PaginationItem>
    );

    // Determine start and end page numbers for window
    let start: number;
    let end: number;

    if (page <= halfVisible) {
      start = 2;
      end = maxVisiblePages - 1; // show pages 2 to 4 on initial
    } else if (page > totalPageCount - halfVisible) {
      start = totalPageCount - (maxVisiblePages - 2);
      end = totalPageCount - 1;
    } else {
      start = page - (halfVisible - 1);
      end = page + (halfVisible - 1);
    }

    // Leading ellipsis
    if (start > 2) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Middle page numbers
    for (let i = start; i <= end; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationButton
            onClick={() => onPageChange(i)}
            isActive={page === i}
          >
            {i}
          </PaginationButton>
        </PaginationItem>
      );
    }

    // Trailing ellipsis
    if (end < totalPageCount - 1) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Last page
    items.push(
      <PaginationItem key={totalPageCount}>
        <PaginationButton
          onClick={() => onPageChange(totalPageCount)}
          isActive={page === totalPageCount}
        >
          {totalPageCount}
        </PaginationButton>
      </PaginationItem>
    );

    return items;
  };

  return (
    <div
      className={cn(
        "flex w-full max-w-[320px] md:max-w-[450px] px-4 py-1 flex-col items-center justify-center gap-3 md:flex-row border rounded-4xl mx-auto",
        className
      )}
    >
      <Pagination>
        <PaginationContent className="max-sm:gap-0">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(page - 1, 1))}
              aria-disabled={page === 1}
              tabIndex={page === 1 ? -1 : undefined}
              className={
                page === 1 ? "pointer-events-none opacity-50" : undefined
              }
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(Math.min(page + 1, totalPageCount))}
              aria-disabled={page === totalPageCount}
              tabIndex={page === totalPageCount ? -1 : undefined}
              className={
                page === totalPageCount
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
