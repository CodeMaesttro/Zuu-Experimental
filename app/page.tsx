"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Bell, BookOpen, Calendar, CreditCard, FileText, Users } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [typedText, setTypedText] = useState("")
  const fullText = "Discipline Is The Solution"
  const typingSpeed = 50

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isLoading) return

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  const floatingElements = [
    { icon: "📚", delay: 0, duration: 8 },
    { icon: "🎓", delay: 2, duration: 10 },
    { icon: "✏️", delay: 4, duration: 7 },
    { icon: "🔍", delay: 1, duration: 9 },
    { icon: "📝", delay: 3, duration: 6 },
  ]

  return (
    <div className="relative space-y-16 overflow-hidden">
      {/* Floating background elements */}
      {floatingElements.map((element, index) => (
        <div
          key={index}
          className="pointer-events-none absolute text-4xl opacity-10"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${element.duration}s ease-in-out ${element.delay}s infinite alternate`,
          }}
        >
          {element.icon}
        </div>
      ))}

      {/* Hero Section */}
      <section className="relative space-y-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 text-center"
        >
          <div className="flex justify-center mb-4">
            <Image
              src="/images/school-logo.png"
              alt="Zuu Experimental College Yendi"
              width={120}
              height={120}
              className="h-28 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Welcome to <span className="text-green-600">Zuu Experimental College</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            {typedText}
            <span className="ml-1 inline-block h-5 w-0.5 animate-blink bg-green-600"></span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <Link href="/login" className="group">
              Login to Portal
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mx-auto mt-8 max-w-md"
        >
          <div className="school-animation-container">
            <lottie-player
              src="https://assets5.lottiefiles.com/packages/lf20_qp1q7mct.json"
              background="transparent"
              speed="1"
              style={{ width: "100%", height: "300px" }}
              loop
              autoplay
            ></lottie-player>
          </div>
        </motion.div>
      </section>

      {/* Announcements Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold tracking-tight">Latest Announcements</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="h-full transition-shadow duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle>End of Term Examinations</CardTitle>
                <CardDescription>Posted on May 15, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  End of term examinations will begin on June 10th, 2025. All students are required to clear any
                  outstanding fees before the examinations.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" asChild className="group">
                  <Link href="/announcements/end-of-term-exams">
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="h-full transition-shadow duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle>School Sports Day</CardTitle>
                <CardDescription>Posted on May 10, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  The annual school sports day will be held on May 25th, 2025. All parents are invited to attend and
                  cheer for their children.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" asChild className="group">
                  <Link href="/announcements/sports-day">
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
        <div className="flex justify-end">
          <Button variant="outline" asChild className="group">
            <Link href="/announcements">
              View all announcements
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold tracking-tight">Portal Features</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <FileText className="h-5 w-5 text-green-600" />,
              title: "Academic Results",
              description: "Access and view academic results for all terms and sessions.",
            },
            {
              icon: <Calendar className="h-5 w-5 text-green-600" />,
              title: "Class Timetable",
              description: "View your class schedule and upcoming school events.",
            },
            {
              icon: <CreditCard className="h-5 w-5 text-green-600" />,
              title: "Fee Payments",
              description: "Pay tuition and feeding fees online and view payment history.",
            },
            {
              icon: <BookOpen className="h-5 w-5 text-green-600" />,
              title: "Attendance",
              description: "Track student attendance and view attendance reports.",
            },
            {
              icon: <Bell className="h-5 w-5 text-green-600" />,
              title: "Notifications",
              description: "Receive important alerts and updates from the school.",
            },
            {
              icon: <Users className="h-5 w-5 text-green-600" />,
              title: "Staff Directory",
              description: "Access contact information for all teachers and staff members.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full transition-all duration-300 hover:border-green-300 hover:shadow-md">
                <CardHeader className="flex flex-row items-center gap-2">
                  <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 400 }}>
                    {feature.icon}
                  </motion.div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="rounded-lg bg-green-50 p-8 text-center dark:bg-green-950/30"
      >
        <h2 className="mb-4 text-2xl font-bold">Ready to get started?</h2>
        <p className="mb-6 text-muted-foreground">
          Join Zuu Experimentals today and experience our comprehensive school management system.
        </p>
        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
          <Link href="/login" className="group">
            Login to Portal
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </motion.section>
    </div>
  )
}
