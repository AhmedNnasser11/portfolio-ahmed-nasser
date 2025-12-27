import { Container } from "@/components/layout/layout-primitives";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container className="max-w-6xl py-24 md:py-32 relative">
      {/* Back Link Skeleton */}
      <Skeleton className="h-6 w-32 mb-12" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 lg:gap-24">
        <article className="min-w-0">
          <header className="mb-12">
            {/* Meta Info Skeleton */}
            <div className="flex items-center gap-3 mb-6">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Title Skeleton */}
            <div className="space-y-4 mb-8">
              <Skeleton className="h-10 md:h-12 w-3/4" />
              <Skeleton className="h-10 md:h-12 w-1/2" />
            </div>

            {/* Tags Skeleton */}
            <div className="flex gap-2 mb-8">
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-6 w-14 rounded-md" />
            </div>

            {/* Author Skeleton */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-5 w-32" />
            </div>
          </header>

          {/* Content Skeleton */}
          <div className="space-y-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <div className="py-8">
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-full" />
          </div>
        </article>

        {/* Sidebar Skeleton */}
        <aside className="hidden lg:block h-full">
          <div className="sticky top-32 space-y-12">
            <div className="space-y-4">
              <Skeleton className="h-4 w-12 mb-4" />
              <div className="flex flex-col gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
