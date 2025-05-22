import type React from "react"
import { Inter } from "next/font/google"

import "@/app/globals.css"
import { MainSidebar } from "@/components/sidebar/main-sidebar"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Zuu Experimental College Yendi - School Management System",
  description: "A comprehensive school management system with student, parent and admin portals",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // In a real application, you would fetch the user from a session
  // This is just for demonstration purposes
  const user = null // Example: { name: "John Doe", role: "admin", avatar: "/avatar.png" }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <MainSidebar user={user}>{children}</MainSidebar>
        </ThemeProvider>
      </body>
    </html>
  )
}
