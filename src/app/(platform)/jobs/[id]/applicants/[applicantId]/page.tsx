import Link from "next/link";
import { notFound } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarIcon,
  BriefcaseIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  GraduationCapIcon,
} from "lucide-react";

// Mock data for a single applicant
const applicant = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  appliedFor: "Senior Software Engineer",
  appliedDate: new Date("2024-03-10"),
  status: "PENDING",
  resumeUrl: "https://example.com/john-doe-resume.pdf",
  coverLetter:
    "Dear Hiring Manager,\n\nI am excited to apply for the Senior Software Engineer position at your company. With over 8 years of experience in full-stack development...",
  experience: [
    {
      title: "Software Engineer",
      company: "Tech Solutions Inc.",
      startDate: new Date("2020-01-01"),
      endDate: null,
      description:
        "Led development of cloud-based applications using React and Node.js.",
    },
    {
      title: "Junior Developer",
      company: "StartUp Co.",
      startDate: new Date("2018-06-01"),
      endDate: new Date("2019-12-31"),
      description:
        "Developed and maintained web applications using JavaScript and PHP.",
    },
  ],
  education: [
    {
      degree: "Master of Science in Computer Science",
      institution: "University of Technology",
      graduationDate: new Date("2018-05-31"),
    },
    {
      degree: "Bachelor of Science in Software Engineering",
      institution: "State University",
      graduationDate: new Date("2016-05-31"),
    },
  ],
  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "GraphQL",
  ],
};

export default function ApplicantReviewPage({
  params,
}: {
  params: { applicantId: string };
}) {
  console.log(params);

  // In a real application, you would fetch the applicant data based on the ID
  // For this example, we'll use the mock data
  if (params.applicantId !== applicant.id) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/applicants"
        className="text-primary hover:underline mb-4 inline-block"
      >
        &larr; Back to Applicants
      </Link>
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <main>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-2">
                    {applicant.name}
                  </CardTitle>
                  <div className="text-lg text-muted-foreground">
                    {applicant.appliedFor}
                  </div>
                </div>
                <Badge
                  variant={
                    applicant.status === "PENDING" ? "default" : "secondary"
                  }
                  className={cn({
                    "text-white": applicant.status === "OFFERED",
                  })}
                >
                  {applicant.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-muted-foreground">
                  <MailIcon className="mr-2 h-4 w-4" />
                  {applicant.email}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <PhoneIcon className="mr-2 h-4 w-4" />
                  {applicant.phone}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  {applicant.location}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Applied on {applicant.appliedDate.toLocaleDateString()}
                </div>
              </div>
              <Separator className="my-6" />
              <Tabs defaultValue="resume" className="w-full">
                <TabsList>
                  <TabsTrigger value="resume">Resume</TabsTrigger>
                  <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
                </TabsList>
                <TabsContent value="resume">
                  <div className="space-y-6">
                    <section>
                      <h3 className="text-lg font-semibold mb-2">Experience</h3>
                      {applicant.experience.map((exp, index) => (
                        <div key={index} className="mb-4">
                          <h4 className="font-medium">{exp.title}</h4>
                          <p className="text-muted-foreground">{exp.company}</p>
                          <p className="text-sm text-muted-foreground">
                            {exp.startDate.toLocaleDateString()} -{" "}
                            {exp.endDate
                              ? exp.endDate.toLocaleDateString()
                              : "Present"}
                          </p>
                          <p className="mt-2">{exp.description}</p>
                        </div>
                      ))}
                    </section>
                    <section>
                      <h3 className="text-lg font-semibold mb-2">Education</h3>
                      {applicant.education.map((edu, index) => (
                        <div key={index} className="mb-4">
                          <h4 className="font-medium">{edu.degree}</h4>
                          <p className="text-muted-foreground">
                            {edu.institution}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Graduated: {edu.graduationDate.toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </section>
                    <section>
                      <h3 className="text-lg font-semibold mb-2">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {applicant.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </section>
                  </div>
                </TabsContent>
                <TabsContent value="cover-letter">
                  <Textarea
                    value={applicant.coverLetter}
                    readOnly
                    className="min-h-[300px] resize-none"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <a
                  href={applicant.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                </a>
              </Button>
              <div className="space-x-2">
                <Button variant="destructive">Reject</Button>
                <Button>Move to Interview</Button>
              </div>
            </CardFooter>
          </Card>
        </main>
        <aside>
          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue={applicant.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="REVIEWED">Reviewed</SelectItem>
                  <SelectItem value="INTERVIEWED">Interviewed</SelectItem>
                  <SelectItem value="OFFERED">Offered</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Update Status</Button>
            </CardFooter>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add notes about the applicant..."
                className="min-h-[150px]"
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Notes</Button>
            </CardFooter>
          </Card>
        </aside>
      </div>
    </div>
  );
}
