"use client";

import Link from "next/link";
import { format } from "date-fns";

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
import { Badge } from "@/components/ui/badge";

interface Applicant {
  id: string;
  name: string;
  jobTitle: string;
  appliedDate: Date;
}

interface ApplicantsListProps {
  applicants: Applicant[];
}

export function ApplicantsList({ applicants }: ApplicantsListProps) {
  return (
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
            {applicants.map((applicant) => (
              <TableRow key={applicant.id}>
                <TableCell className="font-medium">{applicant.name}</TableCell>
                <TableCell>{applicant.jobTitle}</TableCell>
                <TableCell>
                  {format(applicant.appliedDate, "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  <Badge>New</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={`/jobs/${applicant.id}/applicants/${applicant.id}`}
                    >
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
  );
}
