"use client";

import { useGetProfile } from "@/features/profile/api/use-get-profile";
import { useGetJobSeekerProfile } from "@/features/profile/api/use-get-job-seeker-profile";

import { ProfileDialog } from "@/features/homepage/components/ProfileDialog";
import { Skeleton } from "@/components/ui/skeleton";

const ProfilePage = () => {
  const { data: profile, isLoading } = useGetProfile();

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
    <div>
      <ProfileDialog />
    </div>
  );
};

export default ProfilePage;
