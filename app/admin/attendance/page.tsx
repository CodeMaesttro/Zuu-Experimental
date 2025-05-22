"use client"

import { useState } from "react"
import { Calendar, Check, Download, Filter, Plus, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

// Mock data for students
const mockStudents = [
  {
    id: "STU001",
    name: "John Smith",
    class: "JSS 3",
    section: "A",
  },
  {
    id: "STU002",
    name: "Mary Johnson",
    class: "JSS 2",
    section: "B",
  },
  {
    id: "STU003",
    name: "Emmanuel Okonkwo",
    class: "JSS 1",
    section: "A",
  },
  {
    id: "STU004",
    name: "Amina Ibrahim",
    class: "JSS 3",
    section: "C",
  },
  {
    id: "STU005",
    name: "Daniel Adeyemi",
    class: "JSS 2",
    section: "A",
  },
]

// Mock data for attendance records
const mockAttendanceRecords = [
  {
    id: "ATT001",
    date: "2025-05-20",
    class: "JSS 3",
    section: "A",
    totalStudents: 35,
    present: 32,
    absent: 3,
    recordedBy: "Mrs. Adebayo",
  },
  {
    id: "ATT002",
    date: "2025-05-20",
    class: "JSS 2",
    section: "B",
    totalStudents: 38,
    present: 36,
    absent: 2,
    recordedBy: "Mr. Okafor",
  },
  {
    id: "ATT003",
    date: "2025-05-19",
    class: "JSS 1",
    section: "A",
    totalStudents: 40,
    present: 38,
    absent: 2,
    recordedBy: "Mrs. Adebayo",
  },
  {
    id: "ATT004",
    date: "2025-05-19",
    class: "JSS 3",
    section: "C",
    totalStudents: 36,
    present: 34,
    absent: 2,
    recordedBy: "Mr. Okafor",
  },
  {
    id: "ATT005",
    date: "2025-05-18",
    class: "JSS 2",
    section: "A",
    totalStudents: 37,
    present: 35,
    absent: 2,
    recordedBy: "Mrs. Adebayo",
  },
]

// Mock data for student attendance details
const mockStudentAttendance = [
  {
    id: "STU001",
    name: "John Smith",
    class: "JSS 3",
    section: "A",
    attendance: [
      { date: "2025-05-20", status: "present" },
      { date: "2025-05-19", status: "present" },
      { date: "2025-05-18", status: "present" },
      { date: "2025-05-17", status: "absent" },
      { date: "2025-05-16", status: "present" },
    ],
  },
  {
    id: "STU002",
    name: "Mary Johnson",
    class: "JSS 2",
    section: "B",
    attendance: [
      { date: "2025-05-20", status: "present" },
      { date: "2025-05-19", status: "absent" },
      { date: "2025-05-18", status: "present" },
      { date: "2025-05-17", status: "present" },
      { date: "2025-05-16", status: "present" },
    ],
  },
]

export default function AttendancePage() {
  const { toast } = useToast()
  const [attendanceRecords, setAttendanceRecords] = useState(mockAttendanceRecords)
  const [studentAttendance, setStudentAttendance] = useState(mockStudentAttendance)
  const [isMarkAttendanceDialogOpen, setIsMarkAttendanceDialogOpen] = useState(false)
  const [isViewAttendanceDialogOpen, setIsViewAttendanceDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSection, setSelectedSection] = useState("")
  const [selectedRecord, setSelectedRecord] = useState<(typeof mockAttendanceRecords)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const [classFilter, setClassFilter] = useState("all")

  // Attendance state for marking attendance
  const [attendanceData, setAttendanceData] = useState<
    Array<{
      id: string
      name: string
      status: "present" | "absent"
    }>
  >(
    mockStudents.map((student) => ({
      id: student.id,
      name: student.name,
      status: "present",
    })),
  )

  // Filter attendance records based on search term and filters
  const filteredAttendanceRecords = attendanceRecords.filter((record) => {
    const matchesSearch =
      record.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.section.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDate = !dateFilter || record.date === dateFilter.toISOString().split("T")[0]
    const matchesClass = classFilter === "all" || record.class === classFilter

    return matchesSearch && matchesDate && matchesClass
  })

  const handleMarkAttendance = () => {
    // Count present and absent students
    const present = attendanceData.filter((student) => student.status === "present").length
    const absent = attendanceData.filter((student) => student.status === "absent").length

    // Generate a new attendance record ID
    const newId = `ATT${String(attendanceRecords.length + 1).padStart(3, "0")}`

    const newRecord = {
      id: newId,
      date: selectedDate ? selectedDate.toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      class: selectedClass,
      section: selectedSection,
      totalStudents: attendanceData.length,
      present,
      absent,
      recordedBy: "Current User", // In a real app, this would be the logged-in user
    }

    setAttendanceRecords([newRecord, ...attendanceRecords])
    setIsMarkAttendanceDialogOpen(false)

    toast({
      title: "Attendance Marked",
      description: `Attendance for ${selectedClass} ${selectedSection} has been recorded successfully.`,
    })
  }

  const toggleAttendanceStatus = (studentId: string) => {
    setAttendanceData((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? { ...student, status: student.status === "present" ? "absent" : "present" }
          : student,
      ),
    )
  }

  const handleViewAttendance = (record: (typeof mockAttendanceRecords)[0]) => {
    setSelectedRecord(record)
    setIsViewAttendanceDialogOpen(true)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance Tracking</h1>
          <p className="text-muted-foreground">Mark and manage daily attendance for students</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <a href="/admin/attendance/reports" download>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </a>
          </Button>
          <Button onClick={() => setIsMarkAttendanceDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" />
            Mark Attendance
          </Button>
        </div>
      </div>

      <Tabs defaultValue="records">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="records">Attendance Records</TabsTrigger>
          <TabsTrigger value="students">Student Attendance</TabsTrigger>
        </TabsList>

        {/* Attendance Records Tab */}
        <TabsContent value="records" className="space-y-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search by class or section..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[250px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <Calendar className="mr-2 h-4 w-4" />
                  {dateFilter ? dateFilter.toLocaleDateString() : "Filter by date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent mode="single" selected={dateFilter} onSelect={setDateFilter} initialFocus />
              </PopoverContent>
            </Popover>

            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="JSS 1">JSS 1</SelectItem>
                <SelectItem value="JSS 2">JSS 2</SelectItem>
                <SelectItem value="JSS 3">JSS 3</SelectItem>
                <SelectItem value="SSS 1">SSS 1</SelectItem>
                <SelectItem value="SSS 2">SSS 2</SelectItem>
                <SelectItem value="SSS 3">SSS 3</SelectItem>
              </SelectContent>
            </Select>

            {dateFilter && (
              <Button variant="ghost" size="icon" onClick={() => setDateFilter(undefined)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Clear date filter</span>
              </Button>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Attendance Records</CardTitle>
              <CardDescription>View and manage daily attendance records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Section</TableHead>
                      <TableHead>Total Students</TableHead>
                      <TableHead>Present</TableHead>
                      <TableHead>Absent</TableHead>
                      <TableHead>Recorded By</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAttendanceRecords.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center">
                          No attendance records found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAttendanceRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                          <TableCell>{record.class}</TableCell>
                          <TableCell>{record.section}</TableCell>
                          <TableCell>{record.totalStudents}</TableCell>
                          <TableCell>
                            <span className="text-green-600">{record.present}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-red-600">{record.absent}</span>
                          </TableCell>
                          <TableCell>{record.recordedBy}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleViewAttendance(record)}>
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Student Attendance Tab */}
        <TabsContent value="students" className="space-y-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search by student name or ID..."
              className="w-[250px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Student Attendance</CardTitle>
              <CardDescription>View individual student attendance records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Section</TableHead>
                      <TableHead>Present Days</TableHead>
                      <TableHead>Absent Days</TableHead>
                      <TableHead>Attendance %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentAttendance.map((student) => {
                      const totalDays = student.attendance.length
                      const presentDays = student.attendance.filter((a) => a.status === "present").length
                      const absentDays = totalDays - presentDays
                      const attendancePercentage = (presentDays / totalDays) * 100

                      return (
                        <TableRow key={student.id}>
                          <TableCell>{student.id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.class}</TableCell>
                          <TableCell>{student.section}</TableCell>
                          <TableCell>{presentDays}</TableCell>
                          <TableCell>{absentDays}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-24 rounded-full bg-gray-200">
                                <div
                                  className={`h-full rounded-full ${
                                    attendancePercentage >= 90
                                      ? "bg-green-600"
                                      : attendancePercentage >= 75
                                        ? "bg-yellow-500"
                                        : "bg-red-600"
                                  }`}
                                  style={{ width: `${attendancePercentage}%` }}
                                />
                              </div>
                              <span>{attendancePercentage.toFixed(1)}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Mark Attendance Dialog */}
      <Dialog open={isMarkAttendanceDialogOpen} onOpenChange={setIsMarkAttendanceDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Mark Attendance</DialogTitle>
            <DialogDescription>Record attendance for a class and section.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      {selectedDate ? selectedDate.toLocaleDateString() : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Class
                </label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JSS 1">JSS 1</SelectItem>
                    <SelectItem value="JSS 2">JSS 2</SelectItem>
                    <SelectItem value="JSS 3">JSS 3</SelectItem>
                    <SelectItem value="SSS 1">SSS 1</SelectItem>
                    <SelectItem value="SSS 2">SSS 2</SelectItem>
                    <SelectItem value="SSS 3">SSS 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Section
                </label>
                <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedClass && selectedSection && (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Attendance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceData.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant={student.status === "present" ? "default" : "outline"}
                              size="sm"
                              className={student.status === "present" ? "bg-green-600 hover:bg-green-700" : ""}
                              onClick={() => toggleAttendanceStatus(student.id)}
                            >
                              <Check className="mr-1 h-4 w-4" />
                              Present
                            </Button>
                            <Button
                              variant={student.status === "absent" ? "default" : "outline"}
                              size="sm"
                              className={student.status === "absent" ? "bg-red-600 hover:bg-red-700" : ""}
                              onClick={() => toggleAttendanceStatus(student.id)}
                            >
                              <X className="mr-1 h-4 w-4" />
                              Absent
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMarkAttendanceDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleMarkAttendance}
              className="bg-green-600 hover:bg-green-700"
              disabled={!selectedClass || !selectedSection || !selectedDate}
            >
              Save Attendance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Attendance Details Dialog */}
      <Dialog open={isViewAttendanceDialogOpen} onOpenChange={setIsViewAttendanceDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Attendance Details</DialogTitle>
            <DialogDescription>
              {selectedRecord && (
                <>
                  {formatDate(selectedRecord.date)} - {selectedRecord.class} {selectedRecord.section}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4 grid grid-cols-3 gap-4">
              <div className="rounded-md border p-4 text-center">
                <div className="text-sm font-medium text-muted-foreground">Total Students</div>
                <div className="text-2xl font-bold">{selectedRecord?.totalStudents}</div>
              </div>
              <div className="rounded-md border p-4 text-center">
                <div className="text-sm font-medium text-muted-foreground">Present</div>
                <div className="text-2xl font-bold text-green-600">{selectedRecord?.present}</div>
              </div>
              <div className="rounded-md border p-4 text-center">
                <div className="text-sm font-medium text-muted-foreground">Absent</div>
                <div className="text-2xl font-bold text-red-600">{selectedRecord?.absent}</div>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* In a real app, this would show the actual students for this record */}
                  {mockStudents
                    .filter(
                      (student) =>
                        student.class === selectedRecord?.class && student.section === selectedRecord?.section,
                    )
                    .map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell className="text-right">
                          <div
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              Math.random() > 0.2 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {Math.random() > 0.2 ? "Present" : "Absent"}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <DialogFooter>
            <Button asChild variant="outline">
              <a href={`/admin/attendance/export/${selectedRecord?.id}`} download>
                <Download className="mr-2 h-4 w-4" />
                Export
              </a>
            </Button>
            <Button onClick={() => setIsViewAttendanceDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
