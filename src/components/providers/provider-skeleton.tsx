import { Skeleton } from "@/components/ui/skeleton";

export function ProviderSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-6 p-6 border rounded-2xl bg-white shadow-sm">
      <div className="shrink-0 mx-auto sm:mx-0">
        <Skeleton className="w-32 h-32 sm:w-40 sm:h-40 rounded-full" />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
            <div className="space-y-3">
              <Skeleton className="h-8 w-64" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-32 rounded-full" />
              </div>
            </div>
            <Skeleton className="h-6 w-40 rounded-full" />
          </div>
          <div className="mt-8 space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="mt-6 flex gap-3 pt-4 border-t">
          <Skeleton className="h-10 w-40 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}
