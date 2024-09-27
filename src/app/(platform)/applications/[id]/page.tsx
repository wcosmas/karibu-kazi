import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, MapPinIcon, BriefcaseIcon } from "lucide-react";

// Mock data for a single application
const application = {
  id: 4,
  jobTitle: "Data Scientist",
  company: "Data Insights Ltd.",
  location: "Seattle, WA",
  appliedDate: "2024-03-01",
  status: "Offered",
  jobType: "Full-time",
  salary: "$110,000 - $170,000",
  description:
    "We are seeking a talented Data Scientist to join our innovative team. The ideal candidate will have a strong background in statistical analysis, machine learning, and data visualization.",
  responsibilities: [
    "Develop and implement machine learning models",
    "Analyze large datasets to extract insights",
    "Create data visualizations to communicate findings",
    "Collaborate with cross-functional teams to solve complex problems",
  ],
  requirements: [
    "Master's or PhD in Computer Science, Statistics, or related field",
    "3+ years of experience in data science or machine learning",
    "Proficiency in Python, R, and SQL",
    "Experience with big data technologies (e.g., Hadoop, Spark)",
    "Strong communication and presentation skills",
  ],
  applicationTimeline: [
    { date: "2024-03-01", event: "Application Submitted" },
    { date: "2024-03-05", event: "Application Reviewed" },
    { date: "2024-03-10", event: "Phone Interview" },
    { date: "2024-03-15", event: "Technical Interview" },
    { date: "2024-03-20", event: "On-site Interview" },
    { date: "2024-03-25", event: "Job Offer Received" },
  ],
};

export default function ApplicationDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  // In a real application, you would fetch the application data based on the ID
  // For this example, we'll use the mock data
  if (Number(params.id) !== application.id) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/applications"
        className="text-primary hover:underline mb-4 inline-block"
      >
        &larr; Back to Applications
      </Link>
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <main>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-2">
                    {application.jobTitle}
                  </CardTitle>
                  <div className="text-lg text-muted-foreground">
                    {application.company}
                  </div>
                </div>
                <Badge
                  variant={
                    application.status === "Offered"
                      ? "success"
                      : application.status === "Rejected"
                      ? "destructive"
                      : "default"
                  }
                  className={cn({
                    "text-white": application.status === "Offered",
                  })}
                >
                  {application.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-muted-foreground">
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  {application.location}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <BriefcaseIcon className="mr-2 h-4 w-4" />
                  {application.jobType}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Applied on {application.appliedDate}
                </div>
              </div>
              <Separator className="my-6" />
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-2">
                    Job Description
                  </h2>
                  <p className="text-muted-foreground">
                    {application.description}
                  </p>
                </section>
                <section>
                  <h2 className="text-xl font-semibold mb-2">
                    Responsibilities
                  </h2>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {application.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h2 className="text-xl font-semibold mb-2">Requirements</h2>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {application.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Withdraw Application</Button>
            </CardFooter>
          </Card>
        </main>
        <aside>
          <Card>
            <CardHeader>
              <CardTitle>Application Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="relative border-l border-muted-foreground/20">
                {application.applicationTimeline.map((event, index) => (
                  <li key={index} className="mb-10 ml-4">
                    <div className="absolute w-3 h-3 bg-primary rounded-full mt-1.5 -left-1.5 border border-background"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-muted-foreground">
                      {event.date}
                    </time>
                    <h3 className="text-lg font-semibold">{event.event}</h3>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
