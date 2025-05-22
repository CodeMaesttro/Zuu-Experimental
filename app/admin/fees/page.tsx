"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Check, CreditCard, Download, Filter, Plus, Search } from "lucide-react"

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

// Mock data for fee records
const mockFeeRecords = [
  {
    id: "INV001",
    studentId: "STU001",
    studentName: "John Smith",
    class: "JSS 3",
    feeType: "Tuition",
    amount: 150000,
    dueDate: "2025-05-30",
    status: "Paid",
    paymentDate: "2025-05-15",
    paymentMethod: "Bank Transfer",
    transactionId: "TRX123456",
  },
  {
    id: "INV002",
    studentId: "STU002",
    studentName: "Mary Johnson",
    class: "JSS 2",
    feeType: "Tuition",
    amount: 145000,
    dueDate: "2025-05-30",
    status: "Unpaid",
    paymentDate: "",
    paymentMethod: "",
    transactionId: "",
  },
  {
    id: "INV003",
    studentId: "STU003",
    studentName: "Emmanuel Okonkwo",
    class: "JSS 1",
    feeType: "Tuition",
    amount: 140000,
    dueDate: "2025-05-30",
    status: "Partial",
    paymentDate: "2025-05-10",
    paymentMethod: "Bank Transfer",
    transactionId: "TRX789012",
  },
  {
    id: "INV004",
    studentId: "STU001",
    studentName: "John Smith",
    class: "JSS 3",
    feeType: "Feeding",
    amount: 75000,
    dueDate: "2025-05-30",
    status: "Paid",
    paymentDate: "2025-05-15",
    paymentMethod: "Bank Transfer",
    transactionId: "TRX345678",
  },
  {
    id: "INV005",
    studentId: "STU002",
    studentName: "Mary Johnson",
    class: "JSS 2",
    feeType: "Feeding",
    amount: 75000,
    dueDate: "2025-05-30",
    status: "Unpaid",
    paymentDate: "",
    paymentMethod: "",
    transactionId: "",
  },
]

// Mock data for fee structure
const mockFeeStructure = [
  {
    id: "FEE001",
    class: "JSS 1",
    feeType: "Tuition",
    amount: 140000,
    term: "First Term",
    academicYear: "2025/2026",
  },
  {
    id: "FEE002",
    class: "JSS 2",
    feeType: "Tuition",
    amount: 145000,
    term: "First Term",
    academicYear: "2025/2026",
  },
  {
    id: "FEE003",
    class: "JSS 3",
    feeType: "Tuition",
    amount: 150000,
    term: "First Term",
    academicYear: "2025/2026",
  },
  {
    id: "FEE004",
    class: "SSS 1",
    feeType: "Tuition",
    amount: 160000,
    term: "First Term",
    academicYear: "2025/2026",
  },
  {
    id: "FEE005",
    class: "SSS 2",
    feeType: "Tuition",
    amount: 165000,
    term: "First Term",
    academicYear: "2025/2026",
  },
  {
    id: "FEE006",
    class: "SSS 3",
    feeType: "Tuition",
    amount: 170000,
    term: "First Term",
    academicYear: "2025/2026",
  },
  {
    id: "FEE007",
    class: "All",
    feeType: "Feeding",
    amount: 75000,
    term: "First Term",
    academicYear: "2025/2026",
  },
]

export default function FeesPage() {
  const { toast } = useToast()
  const [feeRecords, setFeeRecords] = useState(mockFeeRecords)
  const [feeStructure, setFeeStructure] = useState(mockFeeStructure)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [feeTypeFilter, setFeeTypeFilter] = useState("all")
  const [isAddFeeDialogOpen, setIsAddFeeDialogOpen] = useState(false)
  const [isAddStructureDialogOpen, setIsAddStructureDialogOpen] = useState(false)
  const [isRecordPaymentDialogOpen, setIsRecordPaymentDialogOpen] = useState(false)
  const [selectedFee, setSelectedFee] = useState<(typeof mockFeeRecords)[0] | null>(null)

  const [feeFormData, setFeeFormData] = useState({
    studentId: "",
    studentName: "",
    class: "",
    feeType: "",
    amount: "",
    dueDate: "",
  })

  const [structureFormData, setStructureFormData] = useState({
    class: "",
    feeType: "",
    amount: "",
    term: "",
    academicYear: "",
  })

  const [paymentFormData, setPaymentFormData] = useState({
    amount: "",
    paymentDate: "",
    paymentMethod: "",
    transactionId: "",
  })

  // Filter fee records based on search term and filters
  const filteredFeeRecords = feeRecords.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || record.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesFeeType = feeTypeFilter === "all" || record.feeType.toLowerCase() === feeTypeFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesFeeType
  })

  const handleAddFee = () => {
    // Generate a new invoice ID
    const newId = `INV${String(feeRecords.length + 1).padStart(3, "0")}`

    const newFee = {
      id: newId,
      studentId: feeFormData.studentId,
      studentName: feeFormData.studentName,
      class: feeFormData.class,
      feeType: feeFormData.feeType,
      amount: Number.parseFloat(feeFormData.amount),
      dueDate: feeFormData.dueDate,
      status: "Unpaid",
      paymentDate: "",
      paymentMethod: "",
      transactionId: "",
    }

    setFeeRecords([...feeRecords, newFee])
    setIsAddFeeDialogOpen(false)
    setFeeFormData({
      studentId: "",
      studentName: "",
      class: "",
      feeType: "",
      amount: "",
      dueDate: "",
    })

    toast({
      title: "Fee Added",
      description: `Fee invoice ${newId} has been created for ${feeFormData.studentName}.`,
    })
  }

  const handleAddStructure = () => {
    // Generate a new fee structure ID
    const newId = `FEE${String(feeStructure.length + 1).padStart(3, "0")}`

    const newStructure = {
      id: newId,
      class: structureFormData.class,
      feeType: structureFormData.feeType,
      amount: Number.parseFloat(structureFormData.amount),
      term: structureFormData.term,
      academicYear: structureFormData.academicYear,
    }

    setFeeStructure([...feeStructure, newStructure])
    setIsAddStructureDialogOpen(false)
    setStructureFormData({
      class: "",
      feeType: "",
      amount: "",
      term: "",
      academicYear: "",
    })

    toast({
      title: "Fee Structure Added",
      description: `New fee structure for ${structureFormData.class} ${structureFormData.feeType} has been added.`,
    })
  }

  const handleRecordPayment = () => {
    if (selectedFee) {
      const updatedFeeRecords = feeRecords.map((record) => {
        if (record.id === selectedFee.id) {
          const paidAmount = Number.parseFloat(paymentFormData.amount)
          const status = paidAmount >= record.amount ? "Paid" : "Partial"

          return {
            ...record,
            status,
            paymentDate: paymentFormData.paymentDate,
            paymentMethod: paymentFormData.paymentMethod,
            transactionId: paymentFormData.transactionId,
          }
        }
        return record
      })

      setFeeRecords(updatedFeeRecords)
      setIsRecordPaymentDialogOpen(false)
      setSelectedFee(null)

      toast({
        title: "Payment Recorded",
        description: `Payment for invoice ${selectedFee.id} has been recorded successfully.`,
      })
    }
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fee Management</h1>
          <p className="text-muted-foreground">Manage fee structures, invoices, and payments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/fees/reports">
              <Download className="mr-2 h-4 w-4" />
              Reports
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="invoices">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="invoices">Fee Invoices</TabsTrigger>
          <TabsTrigger value="structure">Fee Structure</TabsTrigger>
        </TabsList>

        {/* Fee Invoices Tab */}
        <TabsContent value="invoices" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID, or invoice..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[250px]"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                </SelectContent>
              </Select>
              <Select value={feeTypeFilter} onValueChange={setFeeTypeFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by fee type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="tuition">Tuition</SelectItem>
                  <SelectItem value="feeding">Feeding</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setIsAddFeeDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Fee Invoices</CardTitle>
              <CardDescription>Manage student fee invoices and payment status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Fee Type</TableHead>
                      <TableHead>Amount (₦)</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFeeRecords.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center">
                          No fee records found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredFeeRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{record.id}</TableCell>
                          <TableCell>
                            <div className="font-medium">{record.studentName}</div>
                            <div className="text-sm text-muted-foreground">{record.studentId}</div>
                          </TableCell>
                          <TableCell>{record.class}</TableCell>
                          <TableCell>{record.feeType}</TableCell>
                          <TableCell>{record.amount.toLocaleString()}</TableCell>
                          <TableCell>{new Date(record.dueDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                record.status === "Paid"
                                  ? "bg-green-100 text-green-800"
                                  : record.status === "Partial"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {record.status}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedFee(record)
                                setPaymentFormData({
                                  amount: record.amount.toString(),
                                  paymentDate: new Date().toISOString().split("T")[0],
                                  paymentMethod: "",
                                  transactionId: "",
                                })
                                setIsRecordPaymentDialogOpen(true)
                              }}
                              disabled={record.status === "Paid"}
                            >
                              <CreditCard className="mr-2 h-4 w-4" />
                              Record Payment
                            </Button>
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
                Showing {filteredFeeRecords.length} of {feeRecords.length} invoices
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Paid</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Partial</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Unpaid</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Fee Structure Tab */}
        <TabsContent value="structure" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setIsAddStructureDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Fee Structure
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Fee Structure</CardTitle>
              <CardDescription>Manage fee structures for different classes and fee types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Fee Type</TableHead>
                      <TableHead>Amount (₦)</TableHead>
                      <TableHead>Term</TableHead>
                      <TableHead>Academic Year</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feeStructure.map((fee) => (
                      <TableRow key={fee.id}>
                        <TableCell>{fee.id}</TableCell>
                        <TableCell>{fee.class}</TableCell>
                        <TableCell>{fee.feeType}</TableCell>
                        <TableCell>{fee.amount.toLocaleString()}</TableCell>
                        <TableCell>{fee.term}</TableCell>
                        <TableCell>{fee.academicYear}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Invoice Dialog */}
      <Dialog open={isAddFeeDialogOpen} onOpenChange={setIsAddFeeDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create Fee Invoice</DialogTitle>
            <DialogDescription>Create a new fee invoice for a student.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  name="studentId"
                  value={feeFormData.studentId}
                  onChange={(e) => handleInputChange(e, setFeeFormData)}
                  placeholder="Enter student ID"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentName">Student Name</Label>
                <Input
                  id="studentName"
                  name="studentName"
                  value={feeFormData.studentName}
                  onChange={(e) => handleInputChange(e, setFeeFormData)}
                  placeholder="Enter student name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select
                  value={feeFormData.class}
                  onValueChange={(value) => handleSelectChange("class", value, setFeeFormData)}
                >
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
                <Label htmlFor="feeType">Fee Type</Label>
                <Select
                  value={feeFormData.feeType}
                  onValueChange={(value) => handleSelectChange("feeType", value, setFeeFormData)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fee type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tuition">Tuition</SelectItem>
                    <SelectItem value="Feeding">Feeding</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₦)</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={feeFormData.amount}
                  onChange={(e) => handleInputChange(e, setFeeFormData)}
                  placeholder="Enter amount"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={feeFormData.dueDate}
                  onChange={(e) => handleInputChange(e, setFeeFormData)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddFeeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddFee} className="bg-green-600 hover:bg-green-700">
              Create Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Fee Structure Dialog */}
      <Dialog open={isAddStructureDialogOpen} onOpenChange={setIsAddStructureDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Fee Structure</DialogTitle>
            <DialogDescription>Add a new fee structure for a class and fee type.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select
                value={structureFormData.class}
                onValueChange={(value) => handleSelectChange("class", value, setStructureFormData)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Classes</SelectItem>
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
              <Label htmlFor="feeType">Fee Type</Label>
              <Select
                value={structureFormData.feeType}
                onValueChange={(value) => handleSelectChange("feeType", value, setStructureFormData)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select fee type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tuition">Tuition</SelectItem>
                  <SelectItem value="Feeding">Feeding</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₦)</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={structureFormData.amount}
                onChange={(e) => handleInputChange(e, setStructureFormData)}
                placeholder="Enter amount"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="term">Term</Label>
              <Select
                value={structureFormData.term}
                onValueChange={(value) => handleSelectChange("term", value, setStructureFormData)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="First Term">First Term</SelectItem>
                  <SelectItem value="Second Term">Second Term</SelectItem>
                  <SelectItem value="Third Term">Third Term</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="academicYear">Academic Year</Label>
              <Select
                value={structureFormData.academicYear}
                onValueChange={(value) => handleSelectChange("academicYear", value, setStructureFormData)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select academic year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024/2025">2024/2025</SelectItem>
                  <SelectItem value="2025/2026">2025/2026</SelectItem>
                  <SelectItem value="2026/2027">2026/2027</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddStructureDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddStructure} className="bg-green-600 hover:bg-green-700">
              Add Fee Structure
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Record Payment Dialog */}
      <Dialog open={isRecordPaymentDialogOpen} onOpenChange={setIsRecordPaymentDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
            <DialogDescription>
              Record a payment for invoice {selectedFee?.id} for {selectedFee?.studentName}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₦)</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={paymentFormData.amount}
                onChange={(e) => handleInputChange(e, setPaymentFormData)}
                placeholder="Enter payment amount"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentDate">Payment Date</Label>
              <Input
                id="paymentDate"
                name="paymentDate"
                type="date"
                value={paymentFormData.paymentDate}
                onChange={(e) => handleInputChange(e, setPaymentFormData)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select
                value={paymentFormData.paymentMethod}
                onValueChange={(value) => handleSelectChange("paymentMethod", value, setPaymentFormData)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Online Payment">Online Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="transactionId">Transaction ID</Label>
              <Input
                id="transactionId"
                name="transactionId"
                value={paymentFormData.transactionId}
                onChange={(e) => handleInputChange(e, setPaymentFormData)}
                placeholder="Enter transaction ID"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRecordPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRecordPayment} className="bg-green-600 hover:bg-green-700">
              <Check className="mr-2 h-4 w-4" />
              Record Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
