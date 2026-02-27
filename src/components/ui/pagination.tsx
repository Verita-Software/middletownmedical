import * as React from "react";
import { cn } from "@/lib/utils";

export interface PaginationProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "onChange"
> {
  initialPage?: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({
  initialPage = 1,
  totalPages,
  onPageChange,
  className,
  ...props
}: PaginationProps) {
  const [currentPage, setCurrentPage] = React.useState(initialPage);

  React.useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };
  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }
    return pages;
  };

  const pages = getPages();

  if (totalPages <= 1) return null;

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    >
      <ul className="flex flex-row items-center gap-1 sm:gap-2">
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              "flex cursor-pointer h-9 items-center justify-center px-2 sm:px-4 font-semibold text-[15px] transition-colors",
              currentPage === 1
                ? "text-slate-400 cursor-not-allowed"
                : "text-slate-700 hover:text-slate-900",
            )}
            aria-label="Go to previous page"
          >
            Previous
          </button>
        </li>

        {pages.map((page, i) => (
          <li key={i}>
            {page === "..." ? (
              <span className="flex h-9 w-6 sm:w-9 items-center justify-center text-[15px] font-semibold tracking-widest text-slate-700">
                ...
              </span>
            ) : (
              <button
                onClick={() => handlePageChange(page as number)}
                className={cn(
                  "flex cursor-pointer h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-sm text-[15px] font-bold transition-colors",
                  currentPage === page
                    ? "bg-[#b5097b] text-white hover:bg-[#b5097b]/90"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                )}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              "flex cursor-pointer h-9 items-center justify-center px-2 sm:px-4 font-semibold text-[15px] transition-colors",
              currentPage === totalPages
                ? "text-slate-400 cursor-not-allowed"
                : "text-slate-700 hover:text-slate-900",
            )}
            aria-label="Go to next page"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
