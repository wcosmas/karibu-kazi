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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  SearchIcon,
  MapPinIcon,
  BriefcaseIcon,
  BuildingIcon,
} from "lucide-react";

// Mock data for companies
const companies = [
  {
    id: 1,
    name: "Tech Innovators",
    industry: "Technology",
    location: "San Francisco, CA",
    jobCount: 25,
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Global Solutions Inc.",
    industry: "Consulting",
    location: "New York, NY",
    jobCount: 18,
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Creative Designs Co.",
    industry: "Design",
    location: "Los Angeles, CA",
    jobCount: 12,
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Data Insights Ltd.",
    industry: "Data Analytics",
    location: "Chicago, IL",
    jobCount: 15,
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "EcoTech Solutions",
    industry: "Environmental",
    location: "Seattle, WA",
    jobCount: 8,
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "FinServe Group",
    industry: "Finance",
    location: "Boston, MA",
    jobCount: 20,
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 7,
    name: "HealthCare Plus",
    industry: "Healthcare",
    location: "Houston, TX",
    jobCount: 30,
    logo: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 8,
    name: "EdTech Innovations",
    industry: "Education",
    location: "Austin, TX",
    jobCount: 10,
    logo: "/placeholder.svg?height=100&width=100",
  },
];

export default function CompaniesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = 6;
  const totalPages = Math.ceil(companies.length / itemsPerPage);

  const paginatedCompanies = companies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Companies Hiring</h1>
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label
                  htmlFor="company-search"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Search
                </label>
                <div className="relative mt-2">
                  <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="company-search"
                    placeholder="Company name"
                    className="pl-8"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="industry"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Industry
                </label>
                <Select>
                  <SelectTrigger id="industry" className="mt-2">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Location
                </label>
                <div className="relative mt-2">
                  <MapPinIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="City, state, or zip code"
                    className="pl-8"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Apply Filters</Button>
            </CardFooter>
          </Card>
        </aside>
        <main>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedCompanies.map((company) => (
              <Card key={company.id}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <CardTitle>{company.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {company.industry}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <BriefcaseIcon className="h-4 w-4" />
                    <span>{company.jobCount} open positions</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/companies/${company.id}`}>View Company</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`/companies?page=${
                    currentPage > 1 ? currentPage - 1 : 1
                  }`}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href={`/companies?page=${i + 1}`}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href={`/companies?page=${
                    currentPage < totalPages ? currentPage + 1 : totalPages
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </div>
    </div>
  );
}
