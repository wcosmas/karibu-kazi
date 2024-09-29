"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useGetProfile } from "@/features/profile/api/use-get-profile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { HeroSection } from "@/features/homepage/components/HeroSection";
import { FeaturedJobs } from "@/features/homepage/components/FeaturedJobs";
import { JobCategories } from "@/features/homepage/components/JobCategories";
import { TopCompanies } from "@/features/homepage/components/TopCompanies";
import { CallToAction } from "@/features/homepage/components/CallToAction";
import { JobSeekerResources } from "@/features/homepage/components/JobSeekerResources";
import { ProfileDialog } from "@/features/homepage/components/ProfileDialog";

import { featuredJobs, topCompanies } from "@/features/homepage/data";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <ProfileDialog />
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
