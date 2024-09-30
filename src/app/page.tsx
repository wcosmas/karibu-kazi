"use client";

import { HeroSection } from "@/features/homepage/components/HeroSection";
import { FeaturedJobs } from "@/features/homepage/components/FeaturedJobs";
import { JobCategories } from "@/features/homepage/components/JobCategories";
import { TopCompanies } from "@/features/homepage/components/TopCompanies";
import { CallToAction } from "@/features/homepage/components/CallToAction";
import { JobSeekerResources } from "@/features/homepage/components/JobSeekerResources";

import { featuredJobs, topCompanies } from "@/features/homepage/data";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <HeroSection />
        <FeaturedJobs jobs={featuredJobs} />
        <JobCategories />
        <TopCompanies companies={topCompanies} />
        <CallToAction />
        <JobSeekerResources />
      </main>
    </div>
  );
}
