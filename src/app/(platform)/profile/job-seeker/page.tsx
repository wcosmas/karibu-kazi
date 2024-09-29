"use client";

import { parseISO } from "date-fns";

import { useGetJobSeekerProfile } from "@/features/profile/api/use-get-job-seeker-profile";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

import { ProfileOverview } from "@/features/profile/components/ProfileOverview";
import { ExperienceList } from "@/features/profile/components/ExperienceList";
import { EducationList } from "@/features/profile/components/EducationList";
import { SkillsList } from "@/features/profile/components/SkillsList";

export default function ProfilePage() {
  const { data: profile, isLoading } = useGetJobSeekerProfile();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-10 w-1/3 mb-8" /> {/* Title skeleton */}
        <Skeleton className="h-10 w-full mb-8" /> {/* Tabs skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-[500px] w-full" /> {/* Content skeleton */}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            No Profile Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            It looks like you haven't created a profile yet.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Create Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <ProfileOverview
            bio={profile.bio ?? ""}
            resumeUrl={profile.resumeUrl}
            location={profile.location ?? ""}
            websiteUrl={profile.websiteUrl ?? ""}
          />
        </TabsContent>
        <TabsContent value="experience">
          <ExperienceList
            experiences={profile.experience.map((exp) => ({
              ...exp,
              startDate: parseISO(exp.startDate),
              endDate: exp.endDate ? parseISO(exp.endDate) : null,
              createdAt: parseISO(exp.createdAt),
              updatedAt: parseISO(exp.updatedAt),
            }))}
          />
        </TabsContent>
        <TabsContent value="education">
          <EducationList
            educations={profile.education.map((edu) => ({
              ...edu,
              startDate: parseISO(edu.startDate),
              endDate: edu.endDate ? parseISO(edu.endDate) : null,
              createdAt: parseISO(edu.createdAt),
              updatedAt: parseISO(edu.updatedAt),
            }))}
          />
        </TabsContent>
        <TabsContent value="skills">
          <SkillsList skills={profile.skills} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
