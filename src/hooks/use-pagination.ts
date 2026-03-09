import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function usePagination<T>(items: T[], itemsPerPage: number) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageParam = searchParams.get("page");
  const initialPage = pageParam ? parseInt(pageParam, 10) : 1;

  const [currentPage, setCurrentPage] = useState(initialPage);

  // Sync state if URL changes (e.g. back/forward button)
  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  const handleSetPage = useCallback(
    (page: number) => {
      if (currentPage === page) return;
      setCurrentPage(page);
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router, currentPage],
  );

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  return {
    currentPage,
    setCurrentPage: handleSetPage,
    totalPages,
    paginatedItems,
  };
}
