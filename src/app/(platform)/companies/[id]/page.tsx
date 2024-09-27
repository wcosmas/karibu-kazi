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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPinIcon,
  GlobeIcon,
  UsersIcon,
  BriefcaseIcon,
  BuildingIcon,
} from "lucide-react";

// Mock data for a single company
const company = {
  id: 1,
  name: "Tech Innovators",
  logo: "/placeholder.svg?height=100&width=100",
  industry: "Technology",
  location: "San Francisco, CA",
  founded: 2010,
  employees: "1,000-5,000",
  website: "https://techinnovators.com",
  description:
    "Tech Innovators is a leading software company specializing in cutting-edge solutions for enterprise clients. With a focus on artificial intelligence and machine learning, we strive to create products that make a difference in the world of technology.",
  openPositions: [
    {
      id: 1,
      title: "Senior Software Engineer",
      department: "Engineering",
      type: "Full-time",
      location: "San Francisco, CA",
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      type: "Full-time",
      location: "New York, NY",
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      type: "Full-time",
      location: "Los Angeles, CA",
    },
    {
      id: 4,
      title: "Data Scientist",
      department: "Data",
      type: "Full-time",
      location: "Seattle, WA",
    },
    {
      id: 5,
      title: "Marketing Specialist",
      department: "Marketing",
      type: "Full-time",
      location: "Chicago, IL",
    },
  ],
  benefits: [
    "Competitive salary and equity package",
    "Health, dental, and vision insurance",
    "401(k) plan with company match",
    "Flexible work hours and remote work options",
    "Professional development budget",
    "Regular team building events and activities",
  ],
  culture:
    "At Tech Innovators, we foster a culture of innovation, collaboration, and continuous learning. We believe in empowering our employees to take ownership of their work and make a real impact on the products we build and the clients we serve.",
};

export default function CompanyPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the company data based on the ID
  // For this example, we'll use the mock data
  if (Number(params.id) !== company.id) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/companies"
        className="text-primary hover:underline mb-4 inline-block"
      >
        &larr; Back to Companies
      </Link>
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <main>
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <CardTitle className="text-2xl">{company.name}</CardTitle>
                  <p className="text-muted-foreground">{company.industry}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-4">
                <Badge variant="secondary" className="flex items-center">
                  <MapPinIcon className="mr-1 h-3 w-3" />
                  {company.location}
                </Badge>
                <Badge variant="secondary" className="flex items-center">
                  <UsersIcon className="mr-1 h-3 w-3" />
                  {company.employees} employees
                </Badge>
                <Badge variant="secondary" className="flex items-center">
                  <GlobeIcon className="mr-1 h-3 w-3" />
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Website
                  </a>
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                {company.description}
              </p>
              <Tabs defaultValue="openings" className="w-full">
                <TabsList>
                  <TabsTrigger value="openings">Open Positions</TabsTrigger>
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                  <TabsTrigger value="culture">Culture</TabsTrigger>
                </TabsList>
                <TabsContent value="openings">
                  <ul className="space-y-2">
                    {company.openPositions.map((position) => (
                      <li
                        key={position.id}
                        className="flex justify-between items-center border-b py-2"
                      >
                        <div>
                          <h3 className="font-semibold">{position.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {position.department} · {position.type}
                          </p>
                        </div>
                        <Button asChild size="sm">
                          <Link href={`/jobs/${position.id}`}>View Job</Link>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="benefits">
                  <ul className="list-disc pl-5 space-y-2">
                    {company.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="culture">
                  <p>{company.culture}</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
        <aside>
          <Card>
            <CardHeader>
              <CardTitle>Company Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <BuildingIcon className="h-4 w-4 text-muted-foreground" />
                <span>Founded in {company.founded}</span>
              </div>
              <div className="flex items-center space-x-2">
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
                <span>{company.employees} employees</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                <span>{company.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                <span>{company.openPositions.length} open positions</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website
                </a>
              </Button>
            </CardFooter>
          </Card>
        </aside>
      </div>
    </div>
  );
}
