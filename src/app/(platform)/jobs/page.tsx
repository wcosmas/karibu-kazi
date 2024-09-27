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
import {
  SearchIcon,
  MapPinIcon,
  BriefcaseIcon,
  BuildingIcon,
  CurrencyIcon,
} from "lucide-react";

// Mock data for jobs
const jobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Tech Innovators",
    location: "San Francisco, CA",
    salary: "$120,000 - $180,000",
    type: "Full-time",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "Global Solutions Inc.",
    location: "New York, NY",
    salary: "$100,000 - $150,000",
    type: "Full-time",
    posted: "1 week ago",
  },
  {
    id: 3,
    title: "UX Designer",
    company: "Creative Designs Co.",
    location: "Los Angeles, CA",
    salary: "$80,000 - $120,000",
    type: "Full-time",
    posted: "3 days ago",
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "Data Insights Ltd.",
    location: "Chicago, IL",
    salary: "$90,000 - $140,000",
    type: "Full-time",
    posted: "5 days ago",
  },
  {
    id: 5,
    title: "Marketing Specialist",
    company: "Brand Builders",
    location: "Austin, TX",
    salary: "$60,000 - $90,000",
    type: "Full-time",
    posted: "1 day ago",
  },
  // Add more job listings here to demonstrate pagination
  // ...
];

const ITEMS_PER_PAGE = 5;

export default function JobsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);

  const paginatedJobs = jobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Your Next Job</h1>
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
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
              <div>
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
              <div>
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
              <div>
                <Label>Salary Range</Label>
                <Slider
                  defaultValue={[20000, 200000]}
                  min={0}
                  max={300000}
                  step={10000}
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
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
                  href={`/jobs?page=${currentPage > 1 ? currentPage - 1 : 1}`}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href={`/jobs?page=${i + 1}`}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href={`/jobs?page=${
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
