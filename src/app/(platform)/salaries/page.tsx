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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchIcon, MapPinIcon, BriefcaseIcon } from "lucide-react";

// Mock data for salaries
const salaries = [
  {
    id: 1,
    role: "Software Engineer",
    company: "Tech Innovators",
    location: "San Francisco, CA",
    salary: "$120,000 - $180,000",
  },
  {
    id: 2,
    role: "Product Manager",
    company: "Global Solutions Inc.",
    location: "New York, NY",
    salary: "$100,000 - $150,000",
  },
  {
    id: 3,
    role: "UX Designer",
    company: "Creative Designs Co.",
    location: "Los Angeles, CA",
    salary: "$80,000 - $120,000",
  },
  {
    id: 4,
    role: "Data Scientist",
    company: "Data Insights Ltd.",
    location: "Seattle, WA",
    salary: "$110,000 - $170,000",
  },
  {
    id: 5,
    role: "Marketing Manager",
    company: "Brand Builders",
    location: "Chicago, IL",
    salary: "$90,000 - $130,000",
  },
  {
    id: 6,
    role: "Sales Representative",
    company: "SalesPro Inc.",
    location: "Austin, TX",
    salary: "$60,000 - $100,000",
  },
  {
    id: 7,
    role: "HR Specialist",
    company: "PeopleFirst Corp.",
    location: "Denver, CO",
    salary: "$70,000 - $110,000",
  },
  {
    id: 8,
    role: "Financial Analyst",
    company: "MoneyWise Solutions",
    location: "Boston, MA",
    salary: "$80,000 - $120,000",
  },
];

export default function SalariesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Salary Explorer</h1>
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="role-search">Job Role</Label>
                <div className="relative mt-2">
                  <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="role-search"
                    placeholder="e.g. Software Engineer"
                    className="pl-8"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative mt-2">
                  <MapPinIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="City, state, or zip code"
                    className="pl-8"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="experience">Experience Level</Label>
                <Select>
                  <SelectTrigger id="experience" className="mt-2">
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
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select>
                  <SelectTrigger id="industry" className="mt-2">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          <Button className="w-full">Apply Filters</Button>
        </aside>
        <main>
          <Card>
            <CardHeader>
              <CardTitle>Salary Comparisons</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Salary Range</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salaries.map((salary) => (
                    <TableRow key={salary.id}>
                      <TableCell className="font-medium">
                        {salary.role}
                      </TableCell>
                      <TableCell>{salary.company}</TableCell>
                      <TableCell>{salary.location}</TableCell>
                      <TableCell>{salary.salary}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
