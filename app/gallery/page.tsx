"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for gallery images
const galleryImages = {
  events: [
    {
      id: "img001",
      title: "Annual Sports Day 2024",
      description: "Students participating in various sports activities during our annual sports day.",
      date: "March 15, 2024",
      image: "/placeholder.svg?height=600&width=800",
      category: "Sports",
    },
    {
      id: "img002",
      title: "Science Fair Exhibition",
      description: "Students showcasing their innovative science projects at the annual science fair.",
      date: "February 20, 2024",
      image: "/placeholder.svg?height=600&width=800",
      category: "Academic",
    },
    {
      id: "img003",
      title: "Cultural Day Celebration",
      description: "Students and staff celebrating cultural diversity through traditional attire and performances.",
      date: "January 25, 2024",
      image: "/placeholder.svg?height=600&width=800",
      category: "Cultural",
    },
    {
      id: "img004",
      title: "Graduation Ceremony 2023",
      description: "Celebrating the achievements of our graduating class of 2023.",
      date: "December 10, 2023",
      image: "/placeholder.svg?height=600&width=800",
      category: "Ceremony",
    },
    {
      id: "img005",
      title: "Inter-School Debate Competition",
      description: "Our debate team winning the regional inter-school debate competition.",
      date: "November 5, 2023",
      image: "/placeholder.svg?height=600&width=800",
      category: "Academic",
    },
    {
      id: "img006",
      title: "School Excursion to National Museum",
      description: "Students on an educational trip to the National Museum.",
      date: "October 15, 2023",
      image: "/placeholder.svg?height=600&width=800",
      category: "Excursion",
    },
  ],
  facilities: [
    {
      id: "img007",
      title: "Modern Science Laboratory",
      description: "Our well-equipped science laboratory for practical experiments and research.",
      image: "/placeholder.svg?height=600&width=800",
      category: "Facilities",
    },
    {
      id: "img008",
      title: "School Library",
      description: "Our extensive library with a wide collection of books, journals, and digital resources.",
      image: "/placeholder.svg?height=600&width=800",
      category: "Facilities",
    },
    {
      id: "img009",
      title: "Computer Laboratory",
      description: "State-of-the-art computer laboratory with high-speed internet access.",
      image: "/placeholder.svg?height=600&width=800",
      category: "Facilities",
    },
    {
      id: "img010",
      title: "Sports Complex",
      description: "Our multi-purpose sports complex for various indoor and outdoor sports activities.",
      image: "/placeholder.svg?height=600&width=800",
      category: "Facilities",
    },
    {
      id: "img011",
      title: "School Auditorium",
      description: "Modern auditorium for assemblies, performances, and special events.",
      image: "/placeholder.svg?height=600&width=800",
      category: "Facilities",
    },
    {
      id: "img012",
      title: "School Cafeteria",
      description: "Spacious cafeteria serving nutritious meals for students and staff.",
      image: "/placeholder.svg?height=600&width=800",
      category: "Facilities",
    },
  ],
  classrooms: [
    {
      id: "img013",
      title: "Modern Classroom",
      description: "Well-ventilated and spacious classrooms equipped with modern teaching aids.",
      image: "/placeholder.svg?height=600&width=800",
      category: "Classrooms",
    },
    {
      id: "img014",
      title: "Art Studio",
      description: "Creative space for students to explore their artistic talents.",
      image: "/placeholder.svg?height=600&width=800",
      category: "Classrooms",
    },
    {
      id: "img015",
      title: "Music Room",
      description: "Dedicated space for music lessons and practice with various instruments.",
      image: "/placeholder.svg?height=600&width=800",
      category: "Classrooms",
    },
    {
      id: "img016",
      title: "Home Economics Laboratory",
      description: "Fully equipped laboratory for practical home economics lessons.",
      image: "/placeholder.svg?height=600&width=800",
      category: "Classrooms",
    },
  ],
}

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [currentCategory, setCurrentCategory] = useState<keyof typeof galleryImages>("events")

  const openLightbox = (image: any) => {
    setSelectedImage(image)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  const navigateImage = (direction: "next" | "prev") => {
    const images = galleryImages[currentCategory]
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id)

    if (direction === "next") {
      const nextIndex = (currentIndex + 1) % images.length
      setSelectedImage(images[nextIndex])
    } else {
      const prevIndex = (currentIndex - 1 + images.length) % images.length
      setSelectedImage(images[prevIndex])
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage) {
      if (e.key === "ArrowRight") {
        navigateImage("next")
      } else if (e.key === "ArrowLeft") {
        navigateImage("prev")
      } else if (e.key === "Escape") {
        closeLightbox()
      }
    }
  }

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">School Gallery</h1>
        <p className="text-xl text-muted-foreground">
          Explore our school facilities, events, and activities through images
        </p>
      </div>

      <Tabs defaultValue="events" className="w-full" onValueChange={(value) => setCurrentCategory(value as any)}>
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="events">Events & Activities</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="classrooms">Classrooms</TabsTrigger>
        </TabsList>

        {/* Events & Activities Tab */}
        <TabsContent value="events" className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.events.map((image) => (
              <GalleryCard key={image.id} image={image} onClick={() => openLightbox(image)} />
            ))}
          </div>
        </TabsContent>

        {/* Facilities Tab */}
        <TabsContent value="facilities" className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.facilities.map((image) => (
              <GalleryCard key={image.id} image={image} onClick={() => openLightbox(image)} />
            ))}
          </div>
        </TabsContent>

        {/* Classrooms Tab */}
        <TabsContent value="classrooms" className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.classrooms.map((image) => (
              <GalleryCard key={image.id} image={image} onClick={() => openLightbox(image)} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-white hover:bg-white/20"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={() => navigateImage("prev")}
          >
            <ChevronLeft className="h-8 w-8" />
            <span className="sr-only">Previous</span>
          </Button>

          <div className="max-h-[80vh] max-w-[90vw]">
            <Image
              src={selectedImage.image || "/placeholder.svg"}
              alt={selectedImage.title}
              width={800}
              height={600}
              className="max-h-[70vh] rounded-lg object-contain"
            />
            <div className="mt-4 rounded-lg bg-white/10 p-4 text-white backdrop-blur-sm">
              <h3 className="text-xl font-bold">{selectedImage.title}</h3>
              <p className="mt-1 text-sm text-white/80">{selectedImage.description}</p>
              {selectedImage.date && <p className="mt-2 text-xs text-white/60">Date: {selectedImage.date}</p>}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={() => navigateImage("next")}
          >
            <ChevronRight className="h-8 w-8" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      )}
    </div>
  )
}

function GalleryCard({ image, onClick }: { image: any; onClick: () => void }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md" onClick={onClick}>
      <div className="relative aspect-video w-full cursor-pointer overflow-hidden">
        <Image
          src={image.image || "/placeholder.svg"}
          alt={image.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        {image.category && (
          <span className="absolute right-2 top-2 rounded-full bg-black/50 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {image.category}
          </span>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold">{image.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{image.description}</p>
        {image.date && <p className="mt-2 text-xs text-muted-foreground">Date: {image.date}</p>}
      </CardContent>
    </Card>
  )
}
