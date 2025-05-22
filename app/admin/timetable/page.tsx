"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Clock, Download, Edit, Plus, Save, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

// Mock data for timetable
const mockTimetable = [
  {
    id: "TT001",
    class: "JSS 3",
    section: "A",
    day: "Monday",
    periods: [
      { id: "P1", time: "08:00 - 08:45", subject: "Mathematics", teacher: "Mr. Johnson" },
      { id: "P2", time: "08:45 - 09:30", subject: "English", teacher: "Mrs. Adebayo" },
      { id: "P3", time: "09:30 - 10:15", subject: "Physics", teacher: "Mr. Okafor" },
      { id: "P4", time: "10:15 - 11:00", subject: "Chemistry", teacher: "Mrs. Nwosu" },
      { id: "P5", time: "11:00 - 11:45", subject: "Break", teacher: "" },
      { id: "P6", time: "11:45 - 12:30", subject: "Biology", teacher: "Mr. Adeyemi" },
      { id: "P7", time: "12:30 - 13:15", subject: "Geography", teacher: "Mrs. Ibrahim" },
      { id: "P8", time: "13:15 - 14:00", subject: "Computer Science", teacher: "Mr. Okonkwo" },
    ],
  },
  {
    id: "TT002",
    class: "JSS 3",
    section: "A",
    day: "Tuesday",
    periods: [
      { id: "P1", time: "08:00 - 08:45", subject: "English", teacher: "Mrs. Adebayo" },
      { id: "P2", time: "08:45 - 09:30", subject: "Mathematics", teacher: "Mr. Johnson" },
      { id: "P3", time: "09:30 - 10:15", subject: "Chemistry", teacher: "Mrs. Nwosu" },
      { id: "P4", time: "10:15 - 11:00", subject: "Physics", teacher: "Mr. Okafor" },
      { id: "P5", time: "11:00 - 11:45", subject: "Break", teacher: "" },
      { id: "P6", time: "11:45 - 12:30", subject: "Geography", teacher: "Mrs. Ibrahim" },
      { id: "P7", time: "12:30 - 13:15", subject: "Biology", teacher: "Mr. Adeyemi" },
      { id: "P8", time: "13:15 - 14:00", subject: "History", teacher: "Mrs. Eze" },
    ],
  },
]

// Mock data for exams
const mockExams = [
  {
    id: "EX001",
    name: "First Term Examination",
    startDate: "2025-07-15",
    endDate: "2025-07-25",
    classes: ["JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"],
    status: "Upcoming",
  },
  {
    id: "EX002",
    name: "Mid-Term Test",
    startDate: "2025-05-25",
    endDate: "2025-05-27",
    classes: ["JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"],
    status: "Completed",
  },
]

// Mock data for exam timetable
const mockExamTimetable = [
  {
    id: "ET001",
    examId: "EX001",
    class: "JSS 3",
    date: "2025-07-15",
    time: "09:00 - 11:00",
    subject: "Mathematics",
    venue: "Main Hall",
    invigilator: "Mr. Johnson",
  },
  {
    id: "ET002",
    examId: "EX001",
    class: "JSS 3",
    date: "2025-07-16",
    time: "09:00 - 11:00",
    subject: "English",
    venue: "Main Hall",
    invigilator: "Mrs. Adebayo",
  },
  {
    id: "ET003",
    examId: "EX001",
    class: "JSS 3",
    date: "2025-07-17",
    time: "09:00 - 11:00",
    subject: "Physics",
    venue: "Main Hall",
    invigilator: "Mr. Okafor",
  },
]

export default function TimetablePage() {
  const { toast } = useToast()
  const [timetables, setTimetables] = useState(mockTimetable)
  const [exams, setExams] = useState(mockExams)
  const [examTimetables, setExamTimetables] = useState(mockExamTimetable)
  const [selectedClass, setSelectedClass] = useState("JSS 3")
  const [selectedSection, setSelectedSection] = useState("A")
  const [selectedDay, setSelectedDay] = useState("Monday")
  const [selectedExam, setSelectedExam] = useState<(typeof mockExams)[0] | null>(null)

  const [isAddPeriodDialogOpen, setIsAddPeriodDialogOpen] = useState(false)
  const [isAddExamDialogOpen, setIsAddExamDialogOpen] = useState(false)
  const [isAddExamTimetableDialogOpen, setIsAddExamTimetableDialogOpen] = useState(false)

  const [periodFormData, setPeriodFormData] = useState({
    time: "",
    subject: "",
    teacher: "",
  })

  const [examFormData, setExamFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    classes: [] as string[],
  })

  const [examTimetableFormData, setExamTimetableFormData] = useState({
    class: "",
    date: "",
    time: "",
    subject: "",
    venue: "",
    invigilator: "",
  })

  // Get the current timetable based on selected class, section, and day
  const currentTimetable = timetables.find(
    (tt) => tt.class === selectedClass && tt.section === selectedSection && tt.day === selectedDay,
  )

  // Get exam timetable for selected exam
  const currentExamTimetable = selectedExam ? examTimetables.filter((et) => et.examId === selectedExam.id) : []

  const handleAddPeriod = () => {
    if (!currentTimetable) {
      // Create a new timetable if one doesn't exist
      const newTimetable = {
        id: `TT${String(timetables.length + 1).padStart(3, "0")}`,
        class: selectedClass,
        section: selectedSection,
        day: selectedDay,
        periods: [
          {
            id: `P1`,
            time: periodFormData.time,
            subject: periodFormData.subject,
            teacher: periodFormData.teacher,
          },
        ],
      }

      setTimetables([...timetables, newTimetable])
    } else {
      // Add period to existing timetable
      const updatedTimetables = timetables.map((tt) => {
        if (tt.id === currentTimetable.id) {
          return {
            ...tt,
            periods: [
              ...tt.periods,
              {
                id: `P${tt.periods.length + 1}`,
                time: periodFormData.time,
                subject: periodFormData.subject,
                teacher: periodFormData.teacher,
              },
            ],
          }
        }
        return tt
      })

      setTimetables(updatedTimetables)
    }

    setIsAddPeriodDialogOpen(false)
    setPeriodFormData({
      time: "",
      subject: "",
      teacher: "",
    })

    toast({
      title: "Period Added",
      description: `${periodFormData.subject} has been added to the timetable.`,
    })
  }

  const handleAddExam = () => {
    const newExam = {
      id: `EX${String(exams.length + 1).padStart(3, "0")}`,
      name: examFormData.name,
      startDate: examFormData.startDate,
      endDate: examFormData.endDate,
      classes: examFormData.classes,
      status: "Upcoming",
    }

    setExams([...exams, newExam])
    setIsAddExamDialogOpen(false)
    setExamFormData({
      name: "",
      startDate: "",
      endDate: "",
      classes: [],
    })

    toast({
      title: "Exam Added",
      description: `${examFormData.name} has been added successfully.`,
    })
  }

  const handleAddExamTimetable = () => {
    if (selectedExam) {
      const newExamTimetable = {
        id: `ET${String(examTimetables.length + 1).padStart(3, "0")}`,
        examId: selectedExam.id,
        class: examTimetableFormData.class,
        date: examTimetableFormData.date,
        time: examTimetableFormData.time,
        subject: examTimetableFormData.subject,
        venue: examTimetableFormData.venue,
        invigilator: examTimetableFormData.invigilator,
      }

      setExamTimetables([...examTimetables, newExamTimetable])
      setIsAddExamTimetableDialogOpen(false)
      setExamTimetableFormData({
        class: "",
        date: "",
        time: "",
        subject: "",
        venue: "",
        invigilator: "",
      })

      toast({
        title: "Exam Schedule Added",
        description: `${examTimetableFormData.subject} exam has been scheduled.`,
      })
    }
  }

  const handleDeletePeriod = (periodId: string) => {
    if (currentTimetable) {
      const updatedTimetables = timetables.map((tt) => {
        if (tt.id === currentTimetable.id) {
          return {
            ...tt,
            periods: tt.periods.filter((period) => period.id !== periodId),
          }
        }
        return tt
      })

      setTimetables(updatedTimetables)

      toast({
        title: "Period Removed",
        description: "The period has been removed from the timetable.",
      })
    }
  }

  const handleDeleteExamTimetable = (examTimetableId: string) => {
    setExamTimetables(examTimetables.filter((et) => et.id !== examTimetableId))

    toast({
      title: "Exam Schedule Removed",
      description: "The exam schedule has been removed.",
    })
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    formSetter: React.Dispatch<React.SetStateAction<any>>,
  ) => {
    const { name, value } = e.target
    formSetter((prev: any) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string, formSetter: React.Dispatch<React.SetStateAction<any>>) => {
    formSetter((prev: any) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleMultiSelectChange = (
    name: string,
    value: string,
    formSetter: React.Dispatch<React.SetStateAction<any>>,
  ) => {
    formSetter((prev: any) => {
      const currentValues = prev[name] as string[]

      if (currentValues.includes(value)) {
        return {
          ...prev,
          [name]: currentValues.filter((v) => v !== value),
        }
      } else {
        return {
          ...prev,
          [name]: [...currentValues, value],
        }
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Timetable & Exams</h1>
          <p className="text-muted-foreground">Manage class timetables and exam schedules</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <a href="/admin/timetable/download" download>
              <Download className="mr-2 h-4 w-4" />
              Export Timetable
            </a>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="timetable">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="timetable">Class Timetable</TabsTrigger>
          <TabsTrigger value="exams">Exam Schedule</TabsTrigger>
        </TabsList>

        {/* Class Timetable Tab */}
        <TabsContent value="timetable" className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="space-y-1">
              <Label htmlFor="class">Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[150px]">
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
            <div className="space-y-1">
              <Label htmlFor="section">Section</Label>
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="day">Day</Label>
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monday">Monday</SelectItem>
                  <SelectItem value="Tuesday">Tuesday</SelectItem>
                  <SelectItem value="Wednesday">Wednesday</SelectItem>
                  <SelectItem value="Thursday">Thursday</SelectItem>
                  <SelectItem value="Friday">Friday</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={() => setIsAddPeriodDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Period
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {selectedClass} {selectedSection} - {selectedDay} Timetable
              </CardTitle>
              <CardDescription>Manage the class timetable for {selectedDay}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!currentTimetable || currentTimetable.periods.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          No periods added for this day
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentTimetable.periods.map((period, index) => (
                        <TableRow key={period.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{period.time}</TableCell>
                          <TableCell>{period.subject}</TableCell>
                          <TableCell>{period.teacher}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setPeriodFormData({
                                    time: period.time,
                                    subject: period.subject,
                                    teacher: period.teacher,
                                  })
                                  setIsAddPeriodDialogOpen(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeletePeriod(period.id)}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="mr-2">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
              <Button asChild>
                <a href={`/admin/timetable/print/${selectedClass}/${selectedSection}`} target="_blank" rel="noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Print Timetable
                </a>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Exam Schedule Tab */}
        <TabsContent value="exams" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setIsAddExamDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Exam
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Exams</CardTitle>
              <CardDescription>Manage examination schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Classes</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exams.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          No exams scheduled
                        </TableCell>
                      </TableRow>
                    ) : (
                      exams.map((exam) => (
                        <TableRow key={exam.id}>
                          <TableCell>{exam.name}</TableCell>
                          <TableCell>{new Date(exam.startDate).toLocaleDateString()}</TableCell>
                          <TableCell>{new Date(exam.endDate).toLocaleDateString()}</TableCell>
                          <TableCell>{exam.classes.join(", ")}</TableCell>
                          <TableCell>
                            <div
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                exam.status === "Upcoming"
                                  ? "bg-blue-100 text-blue-800"
                                  : exam.status === "Ongoing"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              }`}
                            >
                              {exam.status}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedExam(exam)
                                setIsAddExamTimetableDialogOpen(true)
                              }}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Schedule
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

          {selectedExam && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedExam.name} Schedule</CardTitle>
                <CardDescription>
                  Exam schedule for {selectedExam.name} ({new Date(selectedExam.startDate).toLocaleDateString()} -{" "}
                  {new Date(selectedExam.endDate).toLocaleDateString()})
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Venue</TableHead>
                        <TableHead>Invigilator</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentExamTimetable.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center">
                            No exam schedules added
                          </TableCell>
                        </TableRow>
                      ) : (
                        currentExamTimetable.map((schedule) => (
                          <TableRow key={schedule.id}>
                            <TableCell>{new Date(schedule.date).toLocaleDateString()}</TableCell>
                            <TableCell>{schedule.time}</TableCell>
                            <TableCell>{schedule.class}</TableCell>
                            <TableCell>{schedule.subject}</TableCell>
                            <TableCell>{schedule.venue}</TableCell>
                            <TableCell>{schedule.invigilator}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setExamTimetableFormData({
                                      class: schedule.class,
                                      date: schedule.date,
                                      time: schedule.time,
                                      subject: schedule.subject,
                                      venue: schedule.venue,
                                      invigilator: schedule.invigilator,
                                    })
                                    setIsAddExamTimetableDialogOpen(true)
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteExamTimetable(schedule.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button asChild>
                  <a href={`/admin/exams/print/${selectedExam.id}`} target="_blank" rel="noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Print Exam Schedule
                  </a>
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Period Dialog */}
      <Dialog open={isAddPeriodDialogOpen} onOpenChange={setIsAddPeriodDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Period</DialogTitle>
            <DialogDescription>
              Add a new period to the timetable for {selectedClass} {selectedSection} on {selectedDay}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  name="time"
                  value={periodFormData.time}
                  onChange={(e) => handleInputChange(e, setPeriodFormData)}
                  placeholder="e.g., 08:00 - 08:45"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={periodFormData.subject}
                onChange={(e) => handleInputChange(e, setPeriodFormData)}
                placeholder="Enter subject name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teacher">Teacher</Label>
              <Input
                id="teacher"
                name="teacher"
                value={periodFormData.teacher}
                onChange={(e) => handleInputChange(e, setPeriodFormData)}
                placeholder="Enter teacher name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPeriodDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPeriod} className="bg-green-600 hover:bg-green-700">
              Add Period
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Exam Dialog */}
      <Dialog open={isAddExamDialogOpen} onOpenChange={setIsAddExamDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Exam</DialogTitle>
            <DialogDescription>Schedule a new examination.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Exam Name</Label>
              <Input
                id="name"
                name="name"
                value={examFormData.name}
                onChange={(e) => handleInputChange(e, setExamFormData)}
                placeholder="e.g., First Term Examination"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={examFormData.startDate}
                    onChange={(e) => handleInputChange(e, setExamFormData)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={examFormData.endDate}
                    onChange={(e) => handleInputChange(e, setExamFormData)}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Classes</Label>
              <div className="grid grid-cols-3 gap-2">
                {["JSS 1", "JSS 2", "JSS 3", "SSS 1", "SSS 2", "SSS 3"].map((cls) => (
                  <div key={cls} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`class-${cls}`}
                      checked={examFormData.classes.includes(cls)}
                      onChange={() => handleMultiSelectChange("classes", cls, setExamFormData)}
                      className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                    />
                    <Label htmlFor={`class-${cls}`} className="text-sm">
                      {cls}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddExamDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddExam} className="bg-green-600 hover:bg-green-700">
              Add Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Exam Timetable Dialog */}
      <Dialog open={isAddExamTimetableDialogOpen} onOpenChange={setIsAddExamTimetableDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Exam Schedule</DialogTitle>
            <DialogDescription>Add a new exam schedule for {selectedExam?.name}.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select
                value={examTimetableFormData.class}
                onValueChange={(value) => handleSelectChange("class", value, setExamTimetableFormData)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {selectedExam?.classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={examTimetableFormData.date}
                  onChange={(e) => handleInputChange(e, setExamTimetableFormData)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  name="time"
                  value={examTimetableFormData.time}
                  onChange={(e) => handleInputChange(e, setExamTimetableFormData)}
                  placeholder="e.g., 09:00 - 11:00"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={examTimetableFormData.subject}
                onChange={(e) => handleInputChange(e, setExamTimetableFormData)}
                placeholder="Enter subject name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="venue">Venue</Label>
              <Input
                id="venue"
                name="venue"
                value={examTimetableFormData.venue}
                onChange={(e) => handleInputChange(e, setExamTimetableFormData)}
                placeholder="Enter exam venue"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invigilator">Invigilator</Label>
              <Input
                id="invigilator"
                name="invigilator"
                value={examTimetableFormData.invigilator}
                onChange={(e) => handleInputChange(e, setExamTimetableFormData)}
                placeholder="Enter invigilator name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddExamTimetableDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddExamTimetable} className="bg-green-600 hover:bg-green-700">
              Add Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
