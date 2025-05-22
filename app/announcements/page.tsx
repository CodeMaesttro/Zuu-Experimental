import Link from "next/link"
import { ArrowRight, Calendar, Clock, FileText, Megaphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Mock data for announcements
const announcements = [
  {
    id: "ann001",
    title: "End of Term Examinations",
    date: "May 15, 2025",
    category: "Academic",
    excerpt:
      "End of term examinations will begin on June 10th, 2025. All students are required to clear any outstanding fees before the examinations.",
    content:
      "Dear Parents and Students,\n\nThis is to inform you that the End of Term Examinations for the 2024/2025 academic session will commence on Monday, June 10th, 2025, and end on Friday, June 21st, 2025.\n\nAll students are required to clear any outstanding fees before the examinations. Students with outstanding fees will not be allowed to sit for the examinations.\n\nThe examination timetable will be published on the school portal by May 25th, 2025. Please ensure that your child/ward prepares adequately for the examinations.\n\nThank you for your continued support.",
  },
  {
    id: "ann002",
    title: "School Sports Day",
    date: "May 10, 2025",
    category: "Events",
    excerpt:
      "The annual school sports day will be held on May 25th, 2025. All parents are invited to attend and cheer for their children.",
    content:
      "Dear Parents and Students,\n\nWe are pleased to announce that our Annual Sports Day will be held on Saturday, May 25th, 2025, at the school sports complex from 9:00 AM to 4:00 PM.\n\nThe event will feature various track and field events, team sports, and fun activities for students of all ages. Parents are cordially invited to attend and cheer for their children.\n\nStudents are required to wear their house colors for the event. Refreshments will be provided for all participants.\n\nWe look forward to your presence and support on this day of fun and sportsmanship.",
  },
  {
    id: "ann003",
    title: "Parent-Teacher Conference",
    date: "May 5, 2025",
    category: "Meetings",
    excerpt:
      "The second term Parent-Teacher Conference is scheduled for June 5th, 2025. Parents are encouraged to attend to discuss their child's progress.",
    content:
      "Dear Parents,\n\nThe second term Parent-Teacher Conference for the 2024/2025 academic session is scheduled for Thursday, June 5th, 2025, from 9:00 AM to 3:00 PM.\n\nThis conference provides an opportunity for parents to meet with teachers to discuss their child's academic progress, behavior, and any concerns they may have.\n\nTo ensure a smooth process, we have scheduled specific time slots for each class. Please check the schedule below and endeavor to be present during your allocated time:\n\n- JSS 1: 9:00 AM - 10:30 AM\n- JSS 2: 10:30 AM - 12:00 PM\n- JSS 3: 12:00 PM - 1:30 PM\n- SSS 1-3: 1:30 PM - 3:00 PM\n\nWe look forward to your presence and cooperation.",
  },
  {
    id: "ann004",
    title: "New School Uniform Policy",
    date: "April 28, 2025",
    category: "Administrative",
    excerpt:
      "Starting from the next academic session, there will be changes to the school uniform policy. Details are provided in this announcement.",
    content:
      "Dear Parents and Students,\n\nThis is to inform you that starting from the 2025/2026 academic session, there will be changes to the school uniform policy.\n\nThe new uniform will include:\n\n1. Boys:\n   - White shirt with school logo\n   - Green trousers\n   - Green and white striped tie\n   - Black shoes\n\n2. Girls:\n   - White blouse with school logo\n   - Green pinafore/skirt\n   - Green and white striped tie\n   - Black shoes\n\nThe new uniforms will be available for purchase from the school store from July 1st, 2025. All students are required to have the new uniform by the beginning of the new academic session in September 2025.\n\nThank you for your cooperation.",
  },
  {
    id: "ann005",
    title: "School Feeding Program Update",
    date: "April 20, 2025",
    category: "Administrative",
    excerpt:
      "We are pleased to announce improvements to our school feeding program. The new menu will be implemented starting May 1st, 2025.",
    content:
      "Dear Parents and Students,\n\nWe are pleased to announce improvements to our school feeding program. After careful consideration and feedback from parents and students, we have revised our menu to provide more nutritious and balanced meals for our students.\n\nThe new menu will be implemented starting May 1st, 2025. Some of the changes include:\n\n1. More variety in the daily menu\n2. Inclusion of more fruits and vegetables\n3. Reduction in processed foods\n4. Accommodation for students with special dietary requirements\n\nThe cost of the feeding program remains unchanged. The detailed menu for each week will be published on the school portal and notice boards.\n\nWe believe these changes will contribute positively to the health and well-being of our students.\n\nThank you for your continued support.",
  },
]

export default function AnnouncementsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">School Announcements</h1>
        <p className="text-xl text-muted-foreground">
          Stay updated with the latest news and events at Zuu Experimentals
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Featured Announcement */}
        <Card className="md:col-span-2">
          <CardHeader className="bg-green-50 dark:bg-green-950/30">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Megaphone className="h-4 w-4 text-green-600" />
              <span>Featured Announcement</span>
              <span className="ml-auto flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {announcements[0].date}
              </span>
            </div>
            <CardTitle className="text-2xl">{announcements[0].title}</CardTitle>
            <CardDescription>
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                {announcements[0].category}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">{announcements[0].excerpt}</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="group">
              <Link href={`/announcements/${announcements[0].id}`}>
                Read more
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Other Announcements */}
        {announcements.slice(1).map((announcement) => (
          <Card key={announcement.id} className="transition-shadow duration-300 hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{announcement.date}</span>
                <span className="ml-auto inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                  {announcement.category}
                </span>
              </div>
              <CardTitle>{announcement.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-sm text-muted-foreground">{announcement.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" asChild className="group">
                <Link href={`/announcements/${announcement.id}`}>
                  Read more
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Archives</h2>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {["January 2025", "February 2025", "March 2025", "April 2025", "May 2025"].map((month) => (
            <Button key={month} variant="outline" className="justify-start" asChild>
              <Link href={`/announcements/archive/${month.toLowerCase().replace(" ", "-")}`}>
                <FileText className="mr-2 h-4 w-4" />
                {month}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
