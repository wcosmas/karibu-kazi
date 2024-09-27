import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SearchIcon,
  BookOpenIcon,
  Settings,
  GraduationCapIcon,
} from "lucide-react";

// Mock data for resources
const articles = [
  {
    id: 1,
    title: "10 Tips for a Successful Job Interview",
    category: "Career Advice",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "How to Write a Standout Resume",
    category: "Job Search",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Navigating Career Changes in 2024",
    category: "Career Development",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Mastering Soft Skills in the Workplace",
    category: "Professional Development",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "The Art of Salary Negotiation",
    category: "Career Advice",
    readTime: "6 min read",
  },
];

const tools = [
  {
    id: 1,
    title: "Resume Builder",
    description: "Create a professional resume in minutes",
    link: "/tools/resume-builder",
  },
  {
    id: 2,
    title: "Salary Calculator",
    description: "Compare salaries across industries and locations",
    link: "/tools/salary-calculator",
  },
  {
    id: 3,
    title: "Interview Simulator",
    description: "Practice common interview questions",
    link: "/tools/interview-simulator",
  },
  {
    id: 4,
    title: "Skills Assessment",
    description: "Evaluate your professional skills",
    link: "/tools/skills-assessment",
  },
];

const courses = [
  {
    id: 1,
    title: "Effective Communication in the Workplace",
    duration: "4 weeks",
    level: "Beginner",
  },
  {
    id: 2,
    title: "Leadership Skills for Managers",
    duration: "6 weeks",
    level: "Intermediate",
  },
  {
    id: 3,
    title: "Data Analysis Fundamentals",
    duration: "8 weeks",
    level: "Beginner",
  },
  {
    id: 4,
    title: "Advanced Project Management",
    duration: "10 weeks",
    level: "Advanced",
  },
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Career Resources</h1>
      <div className="mb-8">
        <div className="relative">
          <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search resources..." className="pl-8" />
        </div>
      </div>
      <Tabs defaultValue="articles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>
        <TabsContent value="articles">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Card key={article.id}>
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {article.category}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {article.readTime}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href={`/resources/articles/${article.id}`}>
                      Read Article
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="tools">
          <div className="grid gap-4 md:grid-cols-2">
            {tools.map((tool) => (
              <Card key={tool.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    {tool.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href={tool.link}>Use Tool</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="courses">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCapIcon className="mr-2 h-4 w-4" />
                    {course.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Duration: {course.duration}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Level: {course.level}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href={`/resources/courses/${course.id}`}>
                      View Course
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
