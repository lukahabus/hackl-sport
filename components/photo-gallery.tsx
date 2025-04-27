"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react"
import Link from "next/link"

interface Photo {
  id: string
  url: string
  alt: string
  thumbnail?: string
}

interface PhotoGalleryProps {
  photos: Photo[]
  title?: string
  linkUrl?: string
  linkText?: string
}

export function PhotoGallery({
  photos,
  title,
  linkUrl = "/galerija",
  linkText = "Prikaži sve fotografije",
}: PhotoGalleryProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loadingImage, setLoadingImage] = useState<Record<string, boolean>>({})

  const handlePrevious = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrevious()
    } else if (e.key === "ArrowRight") {
      handleNext()
    } else if (e.key === "Escape") {
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="space-y-4">
      {title && <h3 className="text-xl font-medium">{title}</h3>}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {photos.map((photo, index) => (
          <Dialog
            key={photo.id}
            open={isDialogOpen && currentPhotoIndex === index}
            onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (open) setCurrentPhotoIndex(index)
            }}
          >
            <DialogTrigger asChild>
              <div
                className="aspect-square relative overflow-hidden rounded-md cursor-pointer hover:opacity-90 transition-opacity bg-muted"
                onClick={() => {
                  setCurrentPhotoIndex(index)
                  setIsDialogOpen(true)
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {loadingImage[photo.id] && <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />}
                </div>
                <Image
                  src={photo.thumbnail || photo.url}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-opacity duration-300"
                  onLoadStart={() => setLoadingImage((prev) => ({ ...prev, [photo.id]: true }))}
                  onLoad={() => setLoadingImage((prev) => ({ ...prev, [photo.id]: false }))}
                  onError={() => setLoadingImage((prev) => ({ ...prev, [photo.id]: false }))}
                  priority={index < 4} // Prioritize loading the first 4 images
                />
              </div>
            </DialogTrigger>
            <DialogContent
              className="max-w-4xl p-0 bg-transparent border-none"
              onKeyDown={handleKeyDown}
              onInteractOutside={() => setIsDialogOpen(false)}
            >
              <div className="relative flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70 z-10"
                  onClick={() => setIsDialogOpen(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Zatvori</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 bg-black/50 text-white hover:bg-black/70 z-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePrevious()
                  }}
                >
                  <ChevronLeft className="h-6 w-6" />
                  <span className="sr-only">Prethodna slika</span>
                </Button>
                <div className="relative h-[80vh] w-full max-w-4xl">
                  {loadingImage[photos[currentPhotoIndex].id] && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="h-10 w-10 animate-spin text-white" />
                    </div>
                  )}
                  <Image
                    src={photos[currentPhotoIndex].url || "/placeholder.svg"}
                    alt={photos[currentPhotoIndex].alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    onLoadStart={() => setLoadingImage((prev) => ({ ...prev, [photos[currentPhotoIndex].id]: true }))}
                    onLoad={() => setLoadingImage((prev) => ({ ...prev, [photos[currentPhotoIndex].id]: false }))}
                    onError={() => setLoadingImage((prev) => ({ ...prev, [photos[currentPhotoIndex].id]: false }))}
                    priority
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 bg-black/50 text-white hover:bg-black/70 z-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNext()
                  }}
                >
                  <ChevronRight className="h-6 w-6" />
                  <span className="sr-only">Sljedeća slika</span>
                </Button>
                <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black/50 py-1">
                  {currentPhotoIndex + 1} / {photos.length}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {linkUrl && (
        <Button variant="outline" className="w-full" asChild>
          <Link href={linkUrl}>{linkText}</Link>
        </Button>
      )}
    </div>
  )
}
