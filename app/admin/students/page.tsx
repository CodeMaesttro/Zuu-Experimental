"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Download, Edit, Plus, Search, Trash2 } from "lucide-react"

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
import { useToast } from "@/hooks/use-toast"

// Mock data for students
const mockStudents = [
  {
    id: "STU001",
    name: "John Smith",
    class: "JSS 3",
    section: "A",
    gender: "Male",
    parentName: "Robert Smith",
    contactNumber: "+234 801 234 5678",
    email: "john.smith@example.com",
    address: "123 Main St, Lagos",
    dateOfBirth: "2010-05-15",
    admissionDate: "2022-09-01",
  },
  {
    id: "STU002",
    name: "Mary Johnson",
    class: "JSS 2",
    section: "B",
    gender: "Female",
    parentName: "David Johnson",
    contactNumber: "+234 802 345 6789",
    email: "mary.johnson@example.com",
    address: "456 Oak St, Lagos",
    dateOfBirth: "2011-08-22",
    admissionDate: "2022-09-01",
  },
  {
    id: "STU003",
    name: "Emmanuel Okonkwo",
    class: "JSS 1",
    section: "A",
    gender: "Male",
    parentName: "Chidi Okonkwo",
    contactNumber: "+234 803 456 7890",
    email: "emmanuel.okonkwo@example.com",
    address: "789 Elm St, Lagos",
    dateOfBirth: "2012-03-10",
    admissionDate: "2023-09-01",
  },
  {
    id: "STU004",
    name: "Amina Ibrahim",
    class: "JSS 3",
    section: "C",
    gender: "Female",
    parentName: "Fatima Ibrahim",
    contactNumber: "+234 804 567 8901",
    email: "amina.ibrahim@example.com",
    address: "101 Pine St, Lagos",
    dateOfBirth: "2010-11-05",
    admissionDate: "2022-09-01",
  },
  {
    id: "STU005",
    name: "Daniel Adeyemi",
    class: "JSS 2",
    section: "A",
    gender: "Male",
    parentName: "Oluwaseun Adeyemi",
    contactNumber: "+234 805 678 9012",
    email: "daniel.adeyemi@example.com",
    address: "202 Cedar St, Lagos",
    dateOfBirth: "2011-07-18",
    admissionDate: "2022-09-01",
  },
]

export default function StudentsPage() {
  const { toast } = useToast()
  const [students, setStudents] = useState(mockStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<(typeof mockStudents)[0] | null>(null)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    class: "",
    section: "",
    gender: "",
    parentName: "",
    contactNumber: "",
    email: "",
    address: "",
    dateOfBirth: "",
    admissionDate: "",
  })

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.section.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddStudent = () => {
    // Generate a new student ID
    const newId = `STU${String(students.length + 1).padStart(3, "0")}`

    const newStudent = {
      ...formData,
      id: newId,
    }

    setStudents([...students, newStudent])
    setIsAddDialogOpen(false)
    setFormData({
      id: "",
      name: "",
      class: "",
      section: "",
      gender: "",
      parentName: "",
      contactNumber: "",
      email: "",
      address: "",
      dateOfBirth: "",
      admissionDate: "",
    })

    toast({
      title: "Student Added",
      description: `${newStudent.name} has been added successfully.`,
    })
  }

  const handleEditStudent = (student: (typeof mockStudents)[0]) => {
    setSelectedStudent(student)
    setFormData(student)
    setIsAddDialogOpen(true)
  }

  const handleUpdateStudent = () => {
    const updatedStudents = students.map((student) => (student.id === formData.id ? formData : student))

    setStudents(updatedStudents)
    setIsAddDialogOpen(false)
    setSelectedStudent(null)

    toast({
      title: "Student Updated",
      description: `${formData.name}'s information has been updated.`,
    })
  }

  const handleDeleteConfirm = () => {
    if (selectedStudent) {
      const updatedStudents = students.filter((student) => student.id !== selectedStudent.id)

      setStudents(updatedStudents)
      setIsDeleteDialogOpen(false)

      toast({
        title: "Student Deleted",
        description: `${selectedStudent.name} has been removed from the system.`,
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Management</h1>
          <p className="text-muted-foreground">Add, edit, and manage student information</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/students/import">
              <Download className="mr-2 h-4 w-4" />
              Import
            </Link>
          </Button>
          <Button
            onClick={() => {
              setSelectedStudent(null)
              setFormData({
                id: "",
                name: "",
                class: "",
                section: "",
                gender: "",
                parentName: "",
                contactNumber: "",
                email: "",
                address: "",
                dateOfBirth: "",
                admissionDate: "",
              })
              setIsAddDialogOpen(true)
            }}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Students</CardTitle>
          <CardDescription>Manage all students enrolled in Zuu Experimentals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, ID, class, or section..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Parent Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No students found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.section}</TableCell>
                      <TableCell>{student.parentName}</TableCell>
                      <TableCell>{student.contactNumber}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditStudent(student)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedStudent(student)
                              setIsDeleteDialogOpen(true)
                            }}
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
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredStudents.length} of {students.length} students
          </div>
        </CardFooter>
      </Card>

      {/* Add/Edit Student Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedStudent ? "Edit Student" : "Add New Student"}</DialogTitle>
            <DialogDescription>
              {selectedStudent ? "Update student information in the system." : "Add a new student to the system."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter student's full name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select value={formData.class} onValueChange={(value) => handleSelectChange("class", value)}>
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
                  <Label htmlFor="section">Section</Label>
                  <Select value={formData.section} onValueChange={(value) => handleSelectChange("section", value)}>
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="parentName">Parent/Guardian Name</Label>
                <Input
                  id="parentName"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  placeholder="Enter parent's full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Enter contact number"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Home Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter home address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admissionDate">Admission Date</Label>
              <Input
                id="admissionDate"
                name="admissionDate"
                type="date"
                value={formData.admissionDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={selectedStudent ? handleUpdateStudent : handleAddStudent}
              className="bg-green-600 hover:bg-green-700"
            >
              {selectedStudent ? "Update Student" : "Add Student"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedStudent?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
