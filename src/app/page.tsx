import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  SearchIcon,
  BriefcaseIcon,
  BuildingIcon,
  MapPinIcon,
} from "lucide-react";

const featuredJobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Tech Innovators",
    location: "San Francisco, CA",
    salary: "$120,000 - $180,000",
  },
  {
    id: 2,
    title: "Marketing Manager",
    company: "Brand Builders",
    location: "New York, NY",
    salary: "$80,000 - $120,000",
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "Data Insights Co.",
    location: "Seattle, WA",
    salary: "$100,000 - $150,000",
  },
];

const topCompanies = [
  {
    id: 1,
    name: "Tech Innovators",
    logo: "/placeholder.svg?height=64&width=64",
    jobCount: 25,
  },
  {
    id: 2,
    name: "Brand Builders",
    logo: "/placeholder.svg?height=64&width=64",
    jobCount: 18,
  },
  {
    id: 3,
    name: "Data Insights Co.",
    logo: "/placeholder.svg?height=64&width=64",
    jobCount: 12,
  },
  {
    id: 4,
    name: "Global Solutions",
    logo: "/placeholder.svg?height=64&width=64",
    jobCount: 30,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl text-center mb-8">
              Discover opportunities that match your skills and aspirations
            </p>
            <form className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
              <Input
                type="text"
                placeholder="Job title, keywords, or company"
                className="flex-grow bg-background text-foreground placeholder:text-muted-foreground"
              />
              <Input
                type="text"
                placeholder="City, state, or zip code"
                className="flex-grow bg-background text-foreground placeholder:text-muted-foreground"
              />
              <Button type="submit" size="lg" className="w-full md:w-auto">
                <SearchIcon className="mr-2 h-4 w-4" /> Search Jobs
              </Button>
            </form>
          </div>
        </section>

        {/* Featured Jobs Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-muted-foreground">
              Featured Jobs
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredJobs.map((job) => (
                <Card key={job.id} className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{job.salary}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <BuildingIcon className="mr-2 h-4 w-4" />
                        {job.company}
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="mr-2 h-4 w-4" />
                        {job.location}
                      </div>
                    </div>
                    <Button className="mt-4" variant="outline" asChild>
                      <Link href={`/jobs/${job.id}`}>View Job</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild>
                <Link href="/jobs">View All Jobs</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Job Categories Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-muted-foreground">
              Popular Job Categories
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                "Technology",
                "Healthcare",
                "Education",
                "Finance",
                "Marketing",
                "Design",
                "Sales",
                "Customer Service",
              ].map((category) => (
                <Card
                  key={category}
                  className="bg-card hover:bg-accent transition-colors"
                >
                  <CardContent className="flex items-center p-4">
                    <BriefcaseIcon className="h-6 w-6 mr-4 text-primary" />
                    <Link
                      href={`/jobs/categories/${category.toLowerCase()}`}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {category}
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Top Companies Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-muted-foreground">
              Top Companies Hiring
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {topCompanies.map((company) => (
                <Card key={company.id} className="bg-card text-card-foreground">
                  <CardContent className="flex flex-col items-center p-6">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-16 h-16 mb-4 rounded-full bg-muted"
                    />
                    <h3 className="text-lg font-semibold mb-2">
                      {company.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {company.jobCount} open positions
                    </p>
                    <Button variant="outline" className="mt-4" asChild>
                      <Link href={`/companies/${company.id}`}>View Jobs</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Take the Next Step in Your Career?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of job seekers who have found their dream jobs
              through our platform.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/jobs">Find Jobs</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <Link href="/signup">Create Account</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Job Seeker Resources Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-muted-foreground">
              Job Seeker Resources
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle>Resume Writing Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Learn how to create a standout resume that gets you noticed
                    by employers.
                  </p>
                  <Button variant="link" asChild>
                    <Link href="/resources/resume-tips">Read More</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle>Interview Preparation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Ace your next interview with our comprehensive guide to
                    common questions and best practices.
                  </p>
                  <Button variant="link" asChild>
                    <Link href="/resources/interview-prep">Read More</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle>Career Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Explore strategies for advancing your career and achieving
                    your professional goals.
                  </p>
                  <Button variant="link" asChild>
                    <Link href="/resources/career-development">Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
