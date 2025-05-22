"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent, role: string) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Get form data
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // In a real application, you would make an API call to authenticate
    // For demo purposes, we'll simulate authentication
    setTimeout(() => {
      setIsLoading(false)

      // Simple validation for demo
      if (role === "admin" && email === "admin@school.com" && password === "Admin123") {
        // Redirect admin to admin dashboard
        router.push("/admin")
      } else if (role === "student" && email.includes("student")) {
        // Check if student is approved (in a real app, this would be from the API)
        const isApproved = true // Simulate approval status
        if (isApproved) {
          router.push("/portal/dashboard")
        } else {
          setError("Your account is pending approval by an administrator.")
        }
      } else if (role === "parent" && email.includes("parent")) {
        // Check if parent is approved (in a real app, this would be from the API)
        const isApproved = true // Simulate approval status
        if (isApproved) {
          router.push("/portal/dashboard")
        } else {
          setError("Your account is pending approval by an administrator.")
        }
      } else {
        setError("Invalid email or password. Please try again.")
      }
    }, 1500)
  }

  return (
    <div className="container flex h-[calc(100vh-8rem)] items-center justify-center">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center">
            <Image
              src="/images/school-logo.png"
              alt="Zuu Experimental College Yendi"
              width={80}
              height={80}
              className="h-20 w-auto"
            />
          </div>
          <CardTitle className="text-2xl">Login to Zuu Experimental College</CardTitle>
          <CardDescription>Access your student, parent, or admin account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="parent">Parent</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <form onSubmit={(e) => handleSubmit(e, "student")} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email</Label>
                  <Input id="student-email" name="email" type="email" placeholder="student@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-password">Password</Label>
                  <Input
                    id="student-password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                {error && <div className="text-sm text-red-600">{error}</div>}
                <div className="text-sm text-amber-600">
                  <p>Note: Student accounts require admin approval before first login.</p>
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Don't have an account? </span>
                  <Link href="/register/student" className="text-green-600 hover:underline">
                    Register as Student
                  </Link>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="parent">
              <form onSubmit={(e) => handleSubmit(e, "parent")} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="parent-email">Email</Label>
                  <Input id="parent-email" name="email" type="email" placeholder="parent@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent-password">Password</Label>
                  <Input
                    id="parent-password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                {error && <div className="text-sm text-red-600">{error}</div>}
                <div className="text-sm text-amber-600">
                  <p>Note: Parent accounts require admin approval before first login.</p>
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Don't have an account? </span>
                  <Link href="/register/parent" className="text-green-600 hover:underline">
                    Register as Parent
                  </Link>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="admin">
              <form onSubmit={(e) => handleSubmit(e, "admin")} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input id="admin-email" name="email" type="email" placeholder="admin@school.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input
                    id="admin-password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                {error && <div className="text-sm text-red-600">{error}</div>}
                <div className="text-sm text-muted-foreground"></div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm text-muted-foreground">
            <Link href="/forgot-password" className="underline underline-offset-4 hover:text-primary">
              Forgot your password?
            </Link>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Need help?{" "}
            <Link href="/contact" className="underline underline-offset-4 hover:text-primary">
              Contact support
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
