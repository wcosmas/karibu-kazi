import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  MapPinIcon,
  CurrencyIcon,
  ClockIcon,
  CalendarIcon,
} from "lucide-react";

// Mock data for a single job
const job = {
  id: 1,
  title: "Senior Software Engineer",
  company: "Tech Innovators",
  location: "San Francisco, CA",
  salary: "$120,000 - $180,000",
  type: "Full-time",
  posted: "2 days ago",
  description:
    "We are seeking a talented Senior Software Engineer to join our innovative team. The ideal candidate will have a strong background in full-stack development, with expertise in modern web technologies and cloud platforms.",
  responsibilities: [
    "Design and implement scalable, high-performance software solutions",
    "Collaborate with cross-functional teams to define and develop new features",
    "Mentor junior developers and provide technical leadership",
    "Participate in code reviews and ensure code quality",
    "Troubleshoot, debug, and optimize application performance",
  ],
  requirements: [
    "Bachelor's degree in Computer Science or related field",
    "5+ years of experience in software development",
    "Strong proficiency in JavaScript, TypeScript, and React",
    "Experience with Node.js and Express.js",
    "Familiarity with cloud platforms (AWS, Azure, or GCP)",
    "Excellent problem-solving and communication skills",
  ],
  benefits: [
    "Competitive salary and equity package",
    "Health, dental, and vision insurance",
    "401(k) plan with company match",
    "Flexible work hours and remote work options",
    "Professional development budget",
    "Regular team building events and activities",
  ],
};

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the job data based on the ID
  // For this example, we'll use the mock data
  if (Number(params.id) !== job.id) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/jobs"
        className="text-primary hover:underline mb-4 inline-block"
      >
        &larr; Back to Jobs
      </Link>
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold mb-2">
                {job.title}
              </CardTitle>
              <div className="text-xl text-muted-foreground">{job.company}</div>
            </div>
            <Button size="lg">Apply Now</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <Badge variant="secondary" className="flex items-center">
              <MapPinIcon className="mr-1 h-4 w-4" />
              {job.location}
            </Badge>
            <Badge variant="secondary" className="flex items-center">
              <CurrencyIcon className="mr-1 h-4 w-4" />
              {job.salary}
            </Badge>
            <Badge variant="secondary" className="flex items-center">
              <ClockIcon className="mr-1 h-4 w-4" />
              {job.type}
            </Badge>
            <Badge variant="secondary" className="flex items-center">
              <CalendarIcon className="mr-1 h-4 w-4" />
              Posted {job.posted}
            </Badge>
          </div>
          <Separator className="my-6" />
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
              <p className="text-muted-foreground">{job.description}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-4">Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {job.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {job.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {job.benefits.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </CardContent>
        <CardFooter>
          <Button size="lg" className="w-full">
            Apply Now
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>About {job.company}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Tech Innovators is a leading software company specializing in
            cutting-edge solutions for enterprise clients. With a focus on
            innovation and quality, we strive to create products that make a
            difference in the world of technology.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild>
            <Link
              href={`/companies/${job.company
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              View Company Profile
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
