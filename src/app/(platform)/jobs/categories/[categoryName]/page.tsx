import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import {
  SearchIcon,
  MapPinIcon,
  BriefcaseIcon,
  BuildingIcon,
  CurrencyIcon,
} from "lucide-react";

// Mock data for finance jobs
const financeJobs = [
  {
    id: 1,
    title: "Financial Analyst",
    company: "Global Bank Corp",
    location: "New York, NY",
    salary: "$80,000 - $120,000",
    type: "Full-time",
    experience: "3-5 years",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Investment Banking Associate",
    company: "Wall Street Investments",
    location: "Chicago, IL",
    salary: "$100,000 - $150,000",
    type: "Full-time",
    experience: "5-7 years",
    posted: "1 week ago",
  },
  {
    id: 3,
    title: "Risk Management Specialist",
    company: "Secure Financial Services",
    location: "Boston, MA",
    salary: "$90,000 - $130,000",
    type: "Full-time",
    experience: "4-6 years",
    posted: "3 days ago",
  },
  {
    id: 4,
    title: "Corporate Finance Manager",
    company: "Tech Innovators Inc.",
    location: "San Francisco, CA",
    salary: "$120,000 - $180,000",
    type: "Full-time",
    experience: "7-10 years",
    posted: "5 days ago",
  },
  {
    id: 5,
    title: "Quantitative Trader",
    company: "Algo Trading Solutions",
    location: "New York, NY",
    salary: "$150,000 - $250,000",
    type: "Full-time",
    experience: "5-8 years",
    posted: "1 day ago",
  },
];

export default function CategoryPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const jobsPerPage = 5;
  const totalPages = Math.ceil(financeJobs.length / jobsPerPage);

  const paginatedJobs = financeJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Finance Jobs</h1>
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="job-search">Search</Label>
                <div className="relative">
                  <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="job-search"
                    placeholder="Job title or keyword"
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPinIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="City, state, or zip code"
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-type">Job Type</Label>
                <Select>
                  <SelectTrigger id="job-type">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Select>
                  <SelectTrigger id="experience">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                    <SelectItem value="executive">Executive Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Salary Range</Label>
                <Slider
                  defaultValue={[50000, 200000]}
                  min={0}
                  max={300000}
                  step={10000}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>$0</span>
                  <span>$300,000+</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Apply Filters</Button>
            </CardFooter>
          </Card>
        </aside>
        <main>
          <div className="space-y-4">
            {paginatedJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <BuildingIcon className="mr-2 h-4 w-4" />
                      {job.company}
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="mr-2 h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <CurrencyIcon className="mr-2 h-4 w-4" />
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <BriefcaseIcon className="mr-2 h-4 w-4" />
                      {job.type}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      {job.experience} experience
                    </Badge>
                    <Badge variant="outline">Finance</Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Posted {job.posted}
                  </span>
                  <Button asChild>
                    <Link href={`/jobs/${job.id}`}>View Job</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`/jobs/categories/finance?page=${
                    currentPage > 1 ? currentPage - 1 : 1
                  }`}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href={`/jobs/categories/finance?page=${i + 1}`}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href={`/jobs/categories/finance?page=${
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
