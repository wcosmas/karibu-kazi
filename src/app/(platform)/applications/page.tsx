import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";

// Mock data for applications
const applications = [
  {
    id: 1,
    jobTitle: "Senior Software Engineer",
    company: "Tech Innovators",
    appliedDate: "2024-03-15",
    status: "Under Review",
  },
  {
    id: 2,
    jobTitle: "Product Manager",
    company: "Global Solutions Inc.",
    appliedDate: "2024-03-10",
    status: "Interviewed",
  },
  {
    id: 3,
    jobTitle: "UX Designer",
    company: "Creative Designs Co.",
    appliedDate: "2024-03-05",
    status: "Rejected",
  },
  {
    id: 4,
    jobTitle: "Data Scientist",
    company: "Data Insights Ltd.",
    appliedDate: "2024-03-01",
    status: "Offered",
  },
  {
    id: 5,
    jobTitle: "Marketing Specialist",
    company: "Brand Builders",
    appliedDate: "2024-02-25",
    status: "Applied",
  },
];

export default function ApplicationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Applications</h1>
        <Button asChild>
          <Link href="/jobs">Find More Jobs</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Application Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Applications</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="interviewed">Interviewed</SelectItem>
                <SelectItem value="offered">Offered</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">
                    {application.jobTitle}
                  </TableCell>
                  <TableCell>{application.company}</TableCell>
                  <TableCell>{application.appliedDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        application.status === "Offered"
                          ? "success"
                          : application.status === "Rejected"
                          ? "destructive"
                          : "default"
                      }
                      className={cn({
                        "text-white": application.status === "Offered",
                      })}
                    >
                      {application.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/applications/${application.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Previous</Button>
          <Button variant="outline">Next</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
