import { BookOpen, GraduationCap, Heart, Target } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About Our School</h1>
          <p className="text-xl text-muted-foreground">Providing quality education since 1995</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="mb-4 text-muted-foreground">
              Our school was founded with a vision to provide quality education that nurtures the intellectual,
              physical, and emotional growth of our students. We believe in creating a learning environment that
              encourages curiosity, creativity, and critical thinking.
            </p>
            <p className="text-muted-foreground">
              With a team of dedicated teachers and state-of-the-art facilities, we strive to provide our students with
              the best possible education that prepares them for the challenges of the future.
            </p>
          </div>
          <div className="rounded-lg bg-muted p-6">
            <h3 className="mb-4 text-lg font-medium">Quick Facts</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-green-600" />
                <span>Over 1,000 students</span>
              </li>
              <li className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                <span>10+ qualified teaching staff</span>
              </li>
              <li className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                <span>Consistently high academic performance</span>
              </li>
              <li className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-green-600" />
                <span>Strong focus on character development</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Our Vision & Mission</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
              <CardDescription>What we aspire to achieve</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                To be a leading educational institution that nurtures future leaders who are intellectually curious,
                morally upright, and socially responsible.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
              <CardDescription>How we work towards our vision</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                To provide a holistic education that develops the intellectual, physical, emotional, and social
                capabilities of our students, preparing them to be responsible global citizens.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Core Values</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Excellence</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We strive for excellence in all our endeavors, encouraging our students to reach their full potential.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Integrity</CardTitle>
            </CardHeader>
            <CardContent>
              <p>We uphold the highest standards of honesty, ethics, and transparency in all our actions.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Respect</CardTitle>
            </CardHeader>
            <CardContent>
              <p>We foster a culture of respect for diversity, individuality, and the dignity of all people.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>We embrace innovation and creativity in our teaching methods and learning environment.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
