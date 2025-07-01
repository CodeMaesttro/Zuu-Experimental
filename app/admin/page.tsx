"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle,
  CreditCard,
  FileText,
  Megaphone,
  PieChart,
  Plus,
  Users,
  XCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock data for the dashboard
const pendingApprovals = [
  {
    id: "USR001",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "student",
    class: "JSS 3",
    requestDate: "2025-05-20",
  },
  {
    id: "USR002",
    name: "Mary Johnson",
    email: "mary.johnson@example.com",
    role: "parent",
    childName: "Emma Johnson",
    childClass: "JSS 2",
    requestDate: "2025-05-19",
  },
  {
    id: "USR003",
    name: "David Okonkwo",
    email: "david.okonkwo@example.com",
    role: "student",
    class: "SSS 1",
    requestDate: "2025-05-18",
  },
]

const recentActivities = [
  {
    id: "ACT001",
    action: "User Approved",
    user: "Admin",
    target: "Emmanuel Adeyemi",
    timestamp: "Today, 10:30 AM",
  },
  {
    id: "ACT002",
    action: "Fee Payment",
    user: "Parent",
    target: "₵150,000 for Tuition",
    timestamp: "Today, 09:15 AM",
  },
  {
    id: "ACT003",
    action: "Announcement Posted",
    user: "Admin",
    target: "End of Term Examination",
    timestamp: "Yesterday, 03:45 PM",
  },
  {
    id: "ACT004",
    action: "Attendance Updated",
    user: "Teacher",
    target: "JSS 3A Class",
    timestamp: "Yesterday, 08:30 AM",
  },
  {
    id: "ACT005",
    action: "Result Uploaded",
    user: "Teacher",
    target: "Mathematics - JSS 2B",
    timestamp: "2 days ago, 02:15 PM",
  },
]

export default function AdminDashboard() {
  const [pendingUsers, setPendingUsers] = useState(pendingApprovals)

  const handleApprove = (userId: string) => {
    setPendingUsers(pendingUsers.filter((user) => user.id !== userId))
    // In a real app, you would make an API call to approve the user
  }

  const handleReject = (userId: string) => {
    setPendingUsers(pendingUsers.filter((user) => user.id !== userId))
    // In a real app, you would make an API call to reject the user
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Admin. Here's what's happening at Zuu Experimentals.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" />
            New Announcement
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Fee Collection</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵24.5M</div>
            <p className="text-xs text-muted-foreground">85% of expected</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">+1.8% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingUsers.length}</div>
            <p className="text-xs text-muted-foreground">Requires your attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Content Area - Charts */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
            <CardDescription>School performance metrics for the current term</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              {/* In a real app, you would use a chart library like Chart.js or Recharts */}
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="mx-auto h-16 w-16 text-green-600" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Analytics charts would be displayed here using a chart library
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="rounded-full bg-green-100 p-2">
                    {activity.action.includes("Approved") ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : activity.action.includes("Payment") ? (
                      <CreditCard className="h-4 w-4 text-green-600" />
                    ) : activity.action.includes("Announcement") ? (
                      <Megaphone className="h-4 w-4 text-green-600" />
                    ) : activity.action.includes("Attendance") ? (
                      <FileText className="h-4 w-4 text-green-600" />
                    ) : (
                      <BookOpen className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.user} • {activity.target}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/activity">View All Activity</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* User Approval Section */}
      <Card>
        <CardHeader>
          <CardTitle>Pending User Approvals</CardTitle>
          <CardDescription>Approve or reject new user registrations</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="all">All ({pendingUsers.length})</TabsTrigger>
              <TabsTrigger value="students">
                Students ({pendingUsers.filter((u) => u.role === "student").length})
              </TabsTrigger>
              <TabsTrigger value="parents">
                Parents ({pendingUsers.filter((u) => u.role === "parent").length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              {pendingUsers.length === 0 ? (
                <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                  <div className="text-center">
                    <CheckCircle className="mx-auto h-8 w-8 text-green-600" />
                    <p className="mt-2 text-sm font-medium">No pending approvals</p>
                    <p className="text-xs text-muted-foreground">All user registrations have been processed</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium capitalize text-green-800">
                              {user.role}
                            </span>
                            {user.role === "student" ? (
                              <span className="text-xs text-muted-foreground">Class: {user.class}</span>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                Child: {user.childName} ({user.childClass})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => handleReject(user.id)}
                        >
                          <XCircle className="mr-1 h-4 w-4" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(user.id)}
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="students" className="mt-4">
              {pendingUsers.filter((u) => u.role === "student").length === 0 ? (
                <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                  <div className="text-center">
                    <CheckCircle className="mx-auto h-8 w-8 text-green-600" />
                    <p className="mt-2 text-sm font-medium">No pending student approvals</p>
                    <p className="text-xs text-muted-foreground">All student registrations have been processed</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingUsers
                    .filter((user) => user.role === "student")
                    .map((user) => (
                      <div key={user.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <div className="mt-1 flex items-center gap-2">
                              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium capitalize text-green-800">
                                {user.role}
                              </span>
                              <span className="text-xs text-muted-foreground">Class: {user.class}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleReject(user.id)}
                          >
                            <XCircle className="mr-1 h-4 w-4" />
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApprove(user.id)}
                          >
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="parents" className="mt-4">
              {pendingUsers.filter((u) => u.role === "parent").length === 0 ? (
                <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                  <div className="text-center">
                    <CheckCircle className="mx-auto h-8 w-8 text-green-600" />
                    <p className="mt-2 text-sm font-medium">No pending parent approvals</p>
                    <p className="text-xs text-muted-foreground">All parent registrations have been processed</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingUsers
                    .filter((user) => user.role === "parent")
                    .map((user) => (
                      <div key={user.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <div className="mt-1 flex items-center gap-2">
                              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium capitalize text-green-800">
                                {user.role}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Child: {user.childName} ({user.childClass})
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleReject(user.id)}
                          >
                            <XCircle className="mr-1 h-4 w-4" />
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApprove(user.id)}
                          >
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">End of Term Examination</p>
                <p className="text-xs text-muted-foreground">Starts June 10, 2025</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/calendar">View Calendar</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Fee Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <PieChart className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">85% of fees collected</p>
                <p className="text-xs text-muted-foreground">₵24.5M of ₵28.8M expected</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/fees">Manage Fees</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-auto flex-col py-4" asChild>
                <Link href="/admin/students">
                  <Users className="mb-1 h-5 w-5" />
                  <span className="text-xs">Students</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto flex-col py-4" asChild>
                <Link href="/admin/announcements">
                  <Megaphone className="mb-1 h-5 w-5" />
                  <span className="text-xs">Announcements</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto flex-col py-4" asChild>
                <Link href="/admin/timetable">
                  <Calendar className="mb-1 h-5 w-5" />
                  <span className="text-xs">Timetable</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto flex-col py-4" asChild>
                <Link href="/admin/results">
                  <FileText className="mb-1 h-5 w-5" />
                  <span className="text-xs">Results</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
