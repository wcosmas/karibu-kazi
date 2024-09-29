"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { BriefcaseIcon } from "lucide-react";

const categories = [
  "Technology",
  "Healthcare",
  "Education",
  "Finance",
  "Marketing",
  "Design",
  "Sales",
  "Customer Service",
];

export const JobCategories = () => {
  return (
    <section className="bg-muted py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-muted-foreground">
          Popular Job Categories
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Card
              key={category}
              className="bg-card hover:bg-accent transition-colors"
            >
              <CardContent className="flex items-center p-4">
                <BriefcaseIcon className="h-6 w-6 mr-4 text-primary" />
                <Link
                  href={`/jobs/categories/${category.toLowerCase()}`}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                >
                  {category}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
