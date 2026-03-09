import { ReactNode } from "react";

interface StatFeatureGridProps {
  children: ReactNode;
}

export function StatFeatureGrid({ children }: StatFeatureGridProps) {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {children}
        </div>
      </div>
    </section>
  );
}
