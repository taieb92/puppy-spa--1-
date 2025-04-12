import { Loader2 } from "lucide-react"

export const LoadingSpinner = ({ className = "" }: { className?: string }) => (
  <Loader2 className={`h-4 w-4 animate-spin ${className}`} />
)

export const LoadingOverlay = ({ message = "Loading..." }: { message?: string }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4">
      <LoadingSpinner className="h-8 w-8" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  </div>
)

export const SkeletonPuppyCard = () => (
  <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-6 w-32 bg-muted animate-pulse rounded" />
        <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-24 bg-muted animate-pulse rounded" />
        <div className="h-4 w-32 bg-muted animate-pulse rounded" />
      </div>
    </div>
  </div>
)

export const SkeletonPuppyList = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <SkeletonPuppyCard key={i} />
    ))}
  </div>
) 