import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, BriefcaseIcon, UsersIcon, PlusIcon } from "lucide-react";

// Mock data for the employer
const employer = {
  company: {
    id: "1",
    name: "Tech Innovators Inc.",
    description:
      "Leading software development company specializing in AI and machine learning solutions.",
    website: "https://techinnovators.com",
    logo: "/placeholder.svg?height=100&width=100",
  },
  jobs: [
    {
      id: "1",
      title: "Senior Software Engineer",
      type: "FULL_TIME",
      experience: "SENIOR",
      location: "San Francisco, CA",
      applicants: 15,
      postedDate: new Date("2024-03-01"),
    },
    {
      id: "2",
      title: "Product Manager",
      type: "FULL_TIME",
      experience: "INTERMEDIATE",
      location: "New York, NY",
      applicants: 8,
      postedDate: new Date("2024-03-05"),
    },
  ],
  recentApplicants: [
    {
      id: "1",
      name: "John Doe",
      jobTitle: "Senior Software Engineer",
      appliedDate: new Date("2024-03-10"),
    },
    {
      id: "2",
      name: "Jane Smith",
      jobTitle: "Product Manager",
      appliedDate: new Date("2024-03-12"),
    },
    {
      id: "3",
      name: "Mike Johnson",
      jobTitle: "Senior Software Engineer",
      appliedDate: new Date("2024-03-15"),
    },
  ],
};

export default function EmployerDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Employer Dashboard</h1>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="company-profile">Company Profile</TabsTrigger>
          <TabsTrigger value="job-postings">Job Postings</TabsTrigger>
          <TabsTrigger value="applicants">Applicants</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Job Postings
                </CardTitle>
                <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{employer.jobs.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Applicants
                </CardTitle>
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {employer.jobs.reduce((sum, job) => sum + job.applicants, 0)}
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Recent Applicants</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employer.recentApplicants.map((applicant) => (
                    <TableRow key={applicant.id}>
                      <TableCell className="font-medium">
                        {applicant.name}
                      </TableCell>
                      <TableCell>{applicant.jobTitle}</TableCell>
                      <TableCell>
                        {applicant.appliedDate.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/applicants/${applicant.id}`}>View</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="company-profile">
          <Card>
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
              <CardDescription>
                Manage your company's information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" defaultValue={employer.company.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-description">Description</Label>
                <Textarea
                  id="company-description"
                  defaultValue={employer.company.description}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-website">Website</Label>
                <Input
                  id="company-website"
                  type="url"
                  defaultValue={employer.company.website}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-logo">Logo</Label>
                <div className="flex items-center space-x-4">
                  <img
                    src={employer.company.logo}
                    alt="Company Logo"
                    className="w-16 h-16 rounded"
                  />
                  <Input id="company-logo" type="file" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="job-postings">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Job Postings</CardTitle>
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" />
                Create New Job
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Applicants</TableHead>
                    <TableHead>Posted Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employer.jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.type}</TableCell>
                      <TableCell>{job.experience}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>{job.applicants}</TableCell>
                      <TableCell>
                        {job.postedDate.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/jobs/${job.id}/edit`}>Edit</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="applicants">
          <Card>
            <CardHeader>
              <CardTitle>All Applicants</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employer.recentApplicants.map((applicant) => (
                    <TableRow key={applicant.id}>
                      <TableCell className="font-medium">
                        {applicant.name}
                      </TableCell>
                      <TableCell>{applicant.jobTitle}</TableCell>
                      <TableCell>
                        {applicant.appliedDate.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge>New</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/applicants/${applicant.id}`}>
                            Review
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
