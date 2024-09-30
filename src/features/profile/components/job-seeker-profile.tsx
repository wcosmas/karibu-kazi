"use client";

import { parseISO } from "date-fns";

import { ProfileWithExperienceAndEducation } from "@/features/profile/types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ProfileOverview } from "@/features/profile/components/ProfileOverview";
import { ExperienceList } from "@/features/profile/components/ExperienceList";
import { EducationList } from "@/features/profile/components/EducationList";
import { SkillsList } from "@/features/profile/components/SkillsList";

interface JobSeekerProfileProps {
  profile: ProfileWithExperienceAndEducation;
}

export const JobSeekerProfile = ({ profile }: JobSeekerProfileProps) => {
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
          <ExperienceList experiences={profile.experience ?? []} />
        </TabsContent>
        <TabsContent value="education">
          <EducationList educations={profile.education ?? []} />
        </TabsContent>
        <TabsContent value="skills">
          <SkillsList skills={profile.skills ?? []} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
