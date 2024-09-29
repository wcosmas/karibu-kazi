"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Company {
  id: number;
  name: string;
  logo: string;
  jobCount: number;
}

interface TopCompaniesProps {
  companies: Company[];
}

export const TopCompanies = ({ companies }: TopCompaniesProps) => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-muted-foreground">
          Top Companies Hiring
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {companies.map((company) => (
            <Card key={company.id} className="bg-card text-card-foreground">
              <CardContent className="flex flex-col items-center p-6">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-16 h-16 mb-4 rounded-full bg-muted"
                />
                <h3 className="text-lg font-semibold mb-2">{company.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {company.jobCount} open positions
                </p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href={`/companies/${company.id}`}>View Jobs</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
