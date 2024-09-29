"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardOverview } from "@/features/profile/components/DashboardOverview";
import { CompanyProfile } from "@/features/profile/components/CompanyProfile";
import { JobPostings } from "@/features/profile/components/JobPostings";
import { ApplicantsList } from "@/features/profile/components/ApplicantsList";

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
  const totalApplicants = employer.jobs.reduce(
    (sum, job) => sum + job.applicants,
    0
  );

  const handleSaveCompanyProfile = () => {
    // Implement save functionality
    console.log("Saving company profile...");
  };

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
          <DashboardOverview
            jobCount={employer.jobs.length}
            totalApplicants={totalApplicants}
            recentApplicants={employer.recentApplicants}
          />
        </TabsContent>
        <TabsContent value="company-profile">
          <CompanyProfile
            company={employer.company}
            onSave={handleSaveCompanyProfile}
          />
        </TabsContent>
        <TabsContent value="job-postings">
          <JobPostings jobs={employer.jobs} />
        </TabsContent>
        <TabsContent value="applicants">
          <ApplicantsList applicants={employer.recentApplicants} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
