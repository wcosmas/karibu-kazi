import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, PlusIcon } from "lucide-react";

// Mock data for the profile
const profile = {
  id: "1",
  role: "JOBSEEKER",
  bio: "Passionate software engineer with 5 years of experience in full-stack development.",
  resumeUrl: "https://example.com/resume.pdf",
  skills: ["JavaScript", "React", "Node.js", "Python", "SQL"],
  experience: [
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "Tech Innovators Inc.",
      startDate: new Date("2020-01-01"),
      endDate: null,
      description: "Leading development of cloud-based solutions.",
    },
    {
      id: "2",
      title: "Software Engineer",
      company: "StartUp Co.",
      startDate: new Date("2018-03-01"),
      endDate: new Date("2019-12-31"),
      description: "Developed and maintained web applications.",
    },
  ],
  education: [
    {
      id: "1",
      institution: "University of Technology",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: new Date("2014-09-01"),
      endDate: new Date("2018-05-31"),
    },
  ],
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Profile Overview</CardTitle>
              <CardDescription>
                Manage your personal information and resume
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" defaultValue={profile.bio} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resume">Resume</Label>
                <div className="flex items-center space-x-2">
                  <Input id="resume" type="file" className="w-full" />
                  {profile.resumeUrl && (
                    <Button variant="outline" asChild>
                      <a
                        href={profile.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Current
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="experience">
          <Card>
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>Add or edit your work history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.experience.map((exp) => (
                <div key={exp.id} className="border-b pb-4 last:border-b-0">
                  <h3 className="text-lg font-semibold">{exp.title}</h3>
                  <p className="text-muted-foreground">{exp.company}</p>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {exp.startDate.toLocaleDateString()} -{" "}
                    {exp.endDate ? exp.endDate.toLocaleDateString() : "Present"}
                  </div>
                  <p className="mt-2">{exp.description}</p>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Experience
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>
                Add or edit your educational background
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.education.map((edu) => (
                <div key={edu.id} className="border-b pb-4 last:border-b-0">
                  <h3 className="text-lg font-semibold">{edu.institution}</h3>
                  <p className="text-muted-foreground">
                    {edu.degree} in {edu.fieldOfStudy}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {edu.startDate.toLocaleDateString()} -{" "}
                    {edu.endDate ? edu.endDate.toLocaleDateString() : "Present"}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Education
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>
                Highlight your professional skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex space-x-2 w-full">
                <Input placeholder="Add a new skill" />
                <Button>Add Skill</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
