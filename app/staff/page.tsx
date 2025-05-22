import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for staff members
const staffMembers = {
  administration: [
    {
      id: "staff001",
      name: "Dr. Samuel Okonkwo",
      position: "Principal",
      image: "/placeholder.svg?height=300&width=300",
      email: "samuel.okonkwo@zuuexperimentals.com",
      phone: "+233 20 123 4567",
      bio: "Dr. Samuel Okonkwo has over 20 years of experience in education administration. He holds a Ph.D. in Educational Leadership from the University of Ghana and has been the principal of Zuu Experimentals for the past 8 years.",
      qualifications: ["Ph.D. Educational Leadership", "M.Ed. Curriculum Development", "B.Sc. Mathematics"],
    },
    {
      id: "staff002",
      name: "Mrs. Abena Mensah",
      position: "Vice Principal (Academics)",
      image: "/placeholder.svg?height=300&width=300",
      email: "abena.mensah@zuuexperimentals.com",
      phone: "+233 20 234 5678",
      bio: "Mrs. Abena Mensah oversees all academic activities at Zuu Experimentals. With 15 years of teaching experience, she ensures that our curriculum meets international standards while addressing the unique needs of our students.",
      qualifications: ["M.Ed. Educational Administration", "B.Ed. English Language"],
    },
    {
      id: "staff003",
      name: "Mr. Kwame Adu",
      position: "Vice Principal (Administration)",
      image: "/placeholder.svg?height=300&width=300",
      email: "kwame.adu@zuuexperimentals.com",
      phone: "+233 20 345 6789",
      bio: "Mr. Kwame Adu manages the administrative functions of the school, including staff management, facilities, and student welfare. His background in business administration brings efficiency to school operations.",
      qualifications: ["MBA Business Administration", "B.Sc. Economics"],
    },
  ],
  teachers: [
    {
      id: "staff004",
      name: "Mrs. Fatima Ibrahim",
      position: "Head of Science Department",
      image: "/placeholder.svg?height=300&width=300",
      email: "fatima.ibrahim@zuuexperimentals.com",
      phone: "+233 20 456 7890",
      bio: "Mrs. Fatima Ibrahim leads our Science Department with passion and innovation. Her teaching methods have consistently produced excellent results in national examinations.",
      qualifications: ["M.Sc. Chemistry", "B.Sc. Chemistry Education", "PGDE"],
      subjects: ["Chemistry", "Integrated Science"],
    },
    {
      id: "staff005",
      name: "Mr. Daniel Johnson",
      position: "Mathematics Teacher",
      image: "/placeholder.svg?height=300&width=300",
      email: "daniel.johnson@zuuexperimentals.com",
      phone: "+233 20 567 8901",
      bio: "Mr. Daniel Johnson makes mathematics accessible and enjoyable for students of all abilities. His innovative teaching approaches have helped many students overcome their fear of mathematics.",
      qualifications: ["B.Sc. Mathematics", "PGDE"],
      subjects: ["Mathematics", "Further Mathematics"],
    },
    {
      id: "staff006",
      name: "Ms. Grace Osei",
      position: "English Language Teacher",
      image: "/placeholder.svg?height=300&width=300",
      email: "grace.osei@zuuexperimentals.com",
      phone: "+233 20 678 9012",
      bio: "Ms. Grace Osei is passionate about literature and language. She inspires students to express themselves clearly and creatively through writing and speech.",
      qualifications: ["M.A. English Literature", "B.A. English"],
      subjects: ["English Language", "Literature in English"],
    },
    {
      id: "staff007",
      name: "Mr. Emmanuel Adeyemi",
      position: "Head of Humanities Department",
      image: "/placeholder.svg?height=300&width=300",
      email: "emmanuel.adeyemi@zuuexperimentals.com",
      phone: "+233 20 789 0123",
      bio: "Mr. Emmanuel Adeyemi brings history and government studies to life through interactive teaching methods and real-world connections.",
      qualifications: ["M.A. History", "B.A. History and International Relations"],
      subjects: ["History", "Government", "Social Studies"],
    },
    {
      id: "staff008",
      name: "Mrs. Amina Nkrumah",
      position: "Biology Teacher",
      image: "/placeholder.svg?height=300&width=300",
      email: "amina.nkrumah@zuuexperimentals.com",
      phone: "+233 20 890 1234",
      bio: "Mrs. Amina Nkrumah's practical approach to biology education helps students understand complex biological concepts through hands-on experiments and field studies.",
      qualifications: ["M.Sc. Biology", "B.Sc. Biological Sciences"],
      subjects: ["Biology", "Agricultural Science"],
    },
    {
      id: "staff009",
      name: "Mr. Joseph Okafor",
      position: "Physics Teacher",
      image: "/placeholder.svg?height=300&width=300",
      email: "joseph.okafor@zuuexperimentals.com",
      phone: "+233 20 901 2345",
      bio: "Mr. Joseph Okafor makes physics principles accessible through practical demonstrations and real-world applications, inspiring many students to pursue careers in engineering and physics.",
      qualifications: ["M.Sc. Physics", "B.Sc. Physics"],
      subjects: ["Physics", "Basic Electronics"],
    },
  ],
  support: [
    {
      id: "staff010",
      name: "Mrs. Esther Annan",
      position: "School Counselor",
      image: "/placeholder.svg?height=300&width=300",
      email: "esther.annan@zuuexperimentals.com",
      phone: "+233 20 012 3456",
      bio: "Mrs. Esther Annan provides guidance and support to students facing academic, social, or personal challenges. Her approachable nature makes her a trusted confidant for many students.",
      qualifications: ["M.Sc. Counseling Psychology", "B.Sc. Psychology"],
    },
    {
      id: "staff011",
      name: "Mr. Benjamin Owusu",
      position: "Librarian",
      image: "/placeholder.svg?height=300&width=300",
      email: "benjamin.owusu@zuuexperimentals.com",
      phone: "+233 20 123 4567",
      bio: "Mr. Benjamin Owusu manages our extensive library resources and helps students develop research skills and a love for reading.",
      qualifications: ["M.A. Library Science", "B.A. Information Management"],
    },
    {
      id: "staff012",
      name: "Dr. Kofi Mensah",
      position: "School Physician",
      image: "/placeholder.svg?height=300&width=300",
      email: "kofi.mensah@zuuexperimentals.com",
      phone: "+233 20 234 5678",
      bio: "Dr. Kofi Mensah oversees the health and wellbeing of our students, providing medical care and health education.",
      qualifications: ["M.D. Medicine", "B.Sc. Human Biology"],
    },
  ],
}

export default function StaffPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Staff</h1>
        <p className="text-xl text-muted-foreground">
          Meet the dedicated professionals who make Zuu Experimentals a center of excellence
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all">All Staff</TabsTrigger>
          <TabsTrigger value="administration">Administration</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="support">Support Staff</TabsTrigger>
        </TabsList>

        {/* All Staff Tab */}
        <TabsContent value="all" className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Administration</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {staffMembers.administration.map((staff) => (
                <StaffCard key={staff.id} staff={staff} />
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Teaching Staff</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {staffMembers.teachers.map((staff) => (
                <StaffCard key={staff.id} staff={staff} />
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Support Staff</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {staffMembers.support.map((staff) => (
                <StaffCard key={staff.id} staff={staff} />
              ))}
            </div>
          </section>
        </TabsContent>

        {/* Administration Tab */}
        <TabsContent value="administration" className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {staffMembers.administration.map((staff) => (
              <StaffCard key={staff.id} staff={staff} />
            ))}
          </div>
        </TabsContent>

        {/* Teachers Tab */}
        <TabsContent value="teachers" className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {staffMembers.teachers.map((staff) => (
              <StaffCard key={staff.id} staff={staff} />
            ))}
          </div>
        </TabsContent>

        {/* Support Staff Tab */}
        <TabsContent value="support" className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {staffMembers.support.map((staff) => (
              <StaffCard key={staff.id} staff={staff} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StaffCard({ staff }: { staff: any }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="aspect-square w-full overflow-hidden">
        <Image
          src={staff.image || "/placeholder.svg"}
          alt={staff.name}
          width={300}
          height={300}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle>{staff.name}</CardTitle>
        <CardDescription>{staff.position}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-green-600" />
          <span className="text-sm text-muted-foreground">{staff.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-green-600" />
          <span className="text-sm text-muted-foreground">{staff.phone}</span>
        </div>
        {staff.subjects && (
          <div className="flex flex-wrap gap-1 pt-2">
            {staff.subjects.map((subject: string) => (
              <span
                key={subject}
                className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
              >
                {subject}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" asChild className="group w-full">
          <Link href={`/staff/${staff.id}`}>
            View Profile
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
