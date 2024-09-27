import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, SearchIcon } from "lucide-react";

import { ApplicationStatus } from "@prisma/client";

// Mock data for applicants
const applicants = [
  {
    id: "1",
    name: "John Doe",
    jobTitle: "Senior Software Engineer",
    appliedDate: new Date("2024-03-10"),
    status: "PENDING",
  },
  {
    id: "2",
    name: "Jane Smith",
    jobTitle: "Product Manager",
    appliedDate: new Date("2024-03-12"),
    status: "REVIEWED",
  },
  {
    id: "3",
    name: "Mike Johnson",
    jobTitle: "UX Designer",
    appliedDate: new Date("2024-03-15"),
    status: "INTERVIEWED",
  },
  {
    id: "4",
    name: "Emily Brown",
    jobTitle: "Data Scientist",
    appliedDate: new Date("2024-03-18"),
    status: "OFFERED",
  },
  {
    id: "5",
    name: "Chris Lee",
    jobTitle: "Marketing Specialist",
    appliedDate: new Date("2024-03-20"),
    status: "REJECTED",
  },
];

const statusColors = {
  PENDING: "default",
  REVIEWED: "secondary",
  INTERVIEWED: "primary",
  OFFERED: "success",
  REJECTED: "destructive",
};

export default function ApplicantsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Applicants</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Applicants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between mb-4 space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 flex space-x-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search applicants" className="pl-8" />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="interviewed">Interviewed</SelectItem>
                  <SelectItem value="offered">Offered</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Export to CSV</Button>
          </div>
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
              {applicants.map((applicant) => (
                <TableRow key={applicant.id}>
                  <TableCell className="font-medium">
                    {applicant.name}
                  </TableCell>
                  <TableCell>{applicant.jobTitle}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      {applicant.appliedDate.toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      // @ts-ignore
                      variant={statusColors[applicant.status]}
                      className={cn({
                        "text-white": applicant.status === "OFFERED",
                      })}
                    >
                      {applicant.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/applicants/${applicant.id}`}>Review</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
