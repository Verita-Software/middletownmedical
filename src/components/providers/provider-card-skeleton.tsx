export function ProviderCardSkeleton({
  variant = "grid",
}: {
  variant?: "grid" | "list" | "compact";
}) {
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm animate-pulse">
        <div className="h-14 w-14 rounded-full bg-slate-200 shrink-0" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-slate-200 rounded w-3/4" />
          <div className="h-3 bg-slate-200 rounded w-1/2" />
          <div className="h-3 bg-slate-200 rounded w-1/4 mt-1" />
        </div>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="flex flex-col sm:flex-row gap-6 rounded-[16px] border border-slate-200/80 bg-white p-6 md:p-7 shadow-sm animate-pulse items-start sm:items-center">
        <div className="flex gap-4 sm:gap-6 flex-1 min-w-0 w-full">
          <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-xl bg-slate-200 shrink-0" />
          <div className="flex flex-col flex-1 space-y-3 py-1">
            <div className="h-6 bg-slate-200 rounded w-3/4 mb-1" />
            <div className="h-4 bg-slate-200 rounded w-5/6" />
            <div className="flex items-center gap-2 mb-2">
              <div className="h-4 bg-slate-200 rounded w-12" />
            </div>
            <div className="h-3 bg-slate-200 rounded w-1/2 mt-1" />
          </div>
        </div>
        <div className="shrink-0 w-full sm:w-auto mt-4 sm:mt-0 pt-5 sm:pt-0 border-t sm:border-0 border-slate-100 pl-0 sm:pl-4 flex justify-end">
          <div className="h-[46px] w-[140px] rounded bg-slate-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm animate-pulse h-full">
      <div className="h-7 bg-slate-200 rounded w-4/5 mb-5" />
      <div className="flex gap-4 sm:gap-6 flex-1 w-full">
        <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-xl bg-slate-200 shrink-0" />
        <div className="flex flex-col flex-1 space-y-3">
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-2/3" />
          <div className="h-4 bg-slate-200 rounded w-1/3 mt-2" />
        </div>
      </div>
      <div className="flex justify-end mt-6 pt-5 border-t border-slate-100">
        <div className="h-[46px] w-[140px] rounded bg-slate-200" />
      </div>
    </div>
  );
}
