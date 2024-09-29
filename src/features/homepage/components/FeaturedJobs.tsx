"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BuildingIcon, MapPinIcon } from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
}

interface FeaturedJobsProps {
  jobs: Job[];
}

export const FeaturedJobs = ({ jobs }: FeaturedJobsProps) => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-muted-foreground">
          Featured Jobs
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
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
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary-foreground dark:text-primary dark:hover:bg-primary-foreground/90"
          >
            <Link href="/jobs">View All Jobs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
