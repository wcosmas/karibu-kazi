"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const JobSeekerResources = () => {
  return (
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
                Learn how to create a standout resume that gets you noticed by
                employers.
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
                Ace your next interview with our comprehensive guide to common
                questions and best practices.
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
                Explore strategies for advancing your career and achieving your
                professional goals.
              </p>
              <Button variant="link" asChild>
                <Link href="/resources/career-development">Read More</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
