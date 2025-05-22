"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Bell,
  Calendar,
  ChevronDown,
  ClipboardList,
  CreditCard,
  FileText,
  Home,
  ImageIcon,
  Info,
  LayoutDashboard,
  LogIn,
  LogOut,
  Mail,
  Megaphone,
  Menu,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface MainSidebarProps {
  children: React.ReactNode
  user?: {
    name: string
    role: "admin" | "student" | "parent" | null
    avatar?: string
  } | null
}

export function MainSidebar({ children, user = null }: MainSidebarProps) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    admin: true,
    portal: true,
  })

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="border-r border-border">
          <SidebarHeader className="flex items-center px-4 py-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/school-logo.png"
                alt="Zuu Experimental College Yendi"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold">Zuu Experimental College</span>
            </Link>
            <SidebarTrigger className="ml-auto md:hidden" />
          </SidebarHeader>

          <SidebarContent>
            {/* Public Navigation */}
            <SidebarGroup>
              <SidebarGroupLabel>Public Pages</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/")}>
                      <Link href="/">
                        <Home className="h-4 w-4" />
                        <span>Homepage</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/about")}>
                      <Link href="/about">
                        <Info className="h-4 w-4" />
                        <span>About Us</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/announcements")}>
                      <Link href="/announcements">
                        <Megaphone className="h-4 w-4" />
                        <span>Announcements</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/staff")}>
                      <Link href="/staff">
                        <Users className="h-4 w-4" />
                        <span>Staff/Teachers</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/gallery")}>
                      <Link href="/gallery">
                        <ImageIcon className="h-4 w-4" />
                        <span>Gallery</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/contact")}>
                      <Link href="/contact">
                        <Mail className="h-4 w-4" />
                        <span>Contact Us</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Student & Parent Portal */}
            {user && (user.role === "student" || user.role === "parent") && (
              <SidebarGroup>
                <Collapsible open={openSections.portal} onOpenChange={() => toggleSection("portal")} className="w-full">
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="flex w-full items-center justify-between">
                      <span>Student & Parent Portal</span>
                      <ChevronDown
                        className={cn("h-4 w-4 transition-transform", openSections.portal ? "rotate-180" : "")}
                      />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive("/portal/dashboard")}>
                            <Link href="/portal/dashboard">
                              <LayoutDashboard className="h-4 w-4" />
                              <span>Dashboard</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive("/portal/attendance")}>
                            <Link href="/portal/attendance">
                              <ClipboardList className="h-4 w-4" />
                              <span>Attendance</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive("/portal/results")}>
                            <Link href="/portal/results">
                              <FileText className="h-4 w-4" />
                              <span>Results</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive("/portal/timetable")}>
                            <Link href="/portal/timetable">
                              <Calendar className="h-4 w-4" />
                              <span>Timetable</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive("/portal/fees")}>
                            <Link href="/portal/fees">
                              <CreditCard className="h-4 w-4" />
                              <span>Fee Payments</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive("/portal/notifications")}>
                            <Link href="/portal/notifications">
                              <Bell className="h-4 w-4" />
                              <span>Notifications</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarGroup>
            )}

            {/* Admin Dashboard */}
            {user && user.role === "admin" && (
              <SidebarGroup>
                <Collapsible open={openSections.admin} onOpenChange={() => toggleSection("admin")} className="w-full">
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="flex w-full items-center justify-between">
                      <span>Admin Dashboard</span>
                      <ChevronDown
                        className={cn("h-4 w-4 transition-transform", openSections.admin ? "rotate-180" : "")}
                      />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive("/admin")}>
                            <Link href="/admin">
                              <LayoutDashboard className="h-4 w-4" />
                              <span>Dashboard</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive("/admin/students")}>
                            <Link href="/admin/students">
                              <Users className="h-4 w-4" />
                              <span>Student Management</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive("/admin/teachers")}>
                            <Link href="/admin/teachers">
                              <Users className="h-4 w-4" />
                              <span>Teacher Management</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive("/admin/attendance")}>
                            <Link href="/admin/attendance">
                              <ClipboardList className="h-4 w-4" />
                              <span>Attendance Tracking</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive("/admin/fees")}>
                            <Link href="/admin/fees">
                              <CreditCard className="h-4 w-4" />
                              <span>Fee Management</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive("/admin/timetable")}>
                            <Link href="/admin/timetable">
                              <Calendar className="h-4 w-4" />
                              <span>Timetable & Exams</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive("/admin/results")}>
                            <Link href="/admin/results">
                              <FileText className="h-4 w-4" />
                              <span>Results & Reports</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive("/admin/notifications")}>
                            <Link href="/admin/notifications">
                              <Bell className="h-4 w-4" />
                              <span>Notifications</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive("/admin/announcements")}>
                            <Link href="/admin/announcements">
                              <Megaphone className="h-4 w-4" />
                              <span>Announcements</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild isActive={isActive("/admin/gallery")}>
                            <Link href="/admin/gallery">
                              <ImageIcon className="h-4 w-4" />
                              <span>Gallery</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarGroup>
            )}
          </SidebarContent>

          <SidebarFooter className="border-t border-border p-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto" asChild>
                  <Link href="/logout">
                    <LogOut className="h-4 w-4" />
                    <span className="sr-only">Logout</span>
                  </Link>
                </Button>
              </div>
            ) : (
              <Button className="w-full" asChild>
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
            )}
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1">
          <header className="flex h-14 items-center border-b border-border px-4 lg:px-6">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <div className="ml-auto flex items-center gap-2"></div>
          </header>
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
