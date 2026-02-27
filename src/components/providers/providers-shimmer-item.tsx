import { ProviderCardSkeleton } from "./provider-card-skeleton";

interface ProvidersShimmerItemProps {
  viewMode?: "grid" | "list";
}

/* Show 9 skeleton cards by default */
export function ProvidersShimmerItem({
  viewMode = "grid",
}: ProvidersShimmerItemProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
      {[...Array(9)].map((_, i) => (
        <ProviderCardSkeleton key={i} variant={viewMode} />
      ))}
    </div>
  );
}
