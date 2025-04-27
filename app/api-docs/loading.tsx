import { Skeleton } from "@/components/ui/skeleton"

export default function ApiDocsLoading() {
  return (
    <div className="container py-10">
      <Skeleton className="h-10 w-64 mb-6" />

      <Skeleton className="h-[200px] w-full mb-10" />

      <div className="mb-4">
        <Skeleton className="h-10 w-full mb-4" />
      </div>

      <div className="space-y-6 mb-10">
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>

      <Skeleton className="h-10 w-64 mb-4" />
      <Skeleton className="h-[150px] w-full mb-10" />

      <Skeleton className="h-10 w-64 mb-4" />
      <Skeleton className="h-[100px] w-full" />
    </div>
  )
}
