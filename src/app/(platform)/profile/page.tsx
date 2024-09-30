"use client";

import { useState, useEffect } from "react";
import { useGetProfile } from "@/features/profile/api/use-get-profile";
import { JobSeekerProfile } from "@/features/profile/components/job-seeker-profile";
import { EmployerProfile } from "@/features/profile/components/employer-profile";
import { ProfileDialog } from "@/features/homepage/components/ProfileDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { parseISO } from "date-fns";
import { useQueryState } from "nuqs";

const ProfilePage = () => {
  const { data: profile, isLoading, refetch } = useGetProfile();
  const [showProfileDialog, setShowProfileDialog] = useState(false);

  const [selectedRole, setSelectedRole] = useQueryState("role", {
    defaultValue: null,
    parse: (value) =>
      value === "JOBSEEKER" || value === "EMPLOYER" ? value : null,
    serialize: (value) => value || "",
  });

  useEffect(() => {
    if (profile?.role && !selectedRole) {
      setSelectedRole(profile.role as "JOBSEEKER" | "EMPLOYER");
    }
  }, [profile?.role, selectedRole, setSelectedRole]);

  const handleRoleChange = async (role: "JOBSEEKER" | "EMPLOYER" | null) => {
    if (role) {
      await setSelectedRole(role);
      setShowProfileDialog(false);
      // Assuming you have an API to update the user's role
      // await updateUserRole(role);
      refetch(); // Refetch the profile data after role update
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-10 w-1/3 mb-8" />
        <Skeleton className="h-10 w-full mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-[500px] w-full" />
        </div>
      </div>
    );
  }

  // Modified condition for showing "No Profile" block
  if (!profile && selectedRole === null) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            No Profile Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            It looks like you haven't created a profile yet.
          </p>
          <Button onClick={() => setShowProfileDialog(true)}>
            Create Profile
          </Button>
        </div>
        <ProfileDialog
          isOpen={showProfileDialog}
          onClose={() => setShowProfileDialog(false)}
          onRoleChange={handleRoleChange}
        />
      </div>
    );
  }

  const parsedProfile = {
    ...(profile ?? {}),
    education: profile?.education?.map((edu) => ({
      ...edu,
      createdAt: parseISO(edu.createdAt),
      updatedAt: parseISO(edu.updatedAt),
      startDate: parseISO(edu.startDate),
      endDate: edu.endDate ? parseISO(edu.endDate) : null,
    })),
    experience: profile?.experience?.map((exp) => ({
      ...exp,
      createdAt: parseISO(exp.createdAt),
      updatedAt: parseISO(exp.updatedAt),
      startDate: parseISO(exp.startDate),
      endDate: exp.endDate ? parseISO(exp.endDate) : null,
    })),
  };

  const parsedProfileWithDates = {
    ...parsedProfile,
    createdAt: parsedProfile.createdAt
      ? new Date(parsedProfile.createdAt)
      : null,
    updatedAt: parsedProfile.updatedAt
      ? new Date(parsedProfile.updatedAt)
      : null,
    education: parsedProfile?.education?.map((edu) => ({
      ...edu,
      createdAt: new Date(edu.createdAt),
      updatedAt: new Date(edu.updatedAt),
      startDate: new Date(edu.startDate),
      endDate: edu.endDate ? new Date(edu.endDate) : null,
    })),
    experience: parsedProfile?.experience?.map((exp) => ({
      ...exp,
      createdAt: new Date(exp.createdAt),
      updatedAt: new Date(exp.updatedAt),
      startDate: new Date(exp.startDate),
      endDate: exp.endDate ? new Date(exp.endDate) : null,
    })),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedRole === "JOBSEEKER" ? (
        <JobSeekerProfile profile={parsedProfileWithDates as any} />
      ) : (
        <EmployerProfile />
      )}
    </div>
  );
};

export default ProfilePage;
