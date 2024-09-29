"use client";

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

export function ProfileDialog() {
  const { data: profile, isLoading } = useGetProfile();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  console.log({ profile });

  useEffect(() => {
    if (!profile) {
      setIsDialogOpen(true);
    }
  }, [profile]);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to Karibu Kazi</DialogTitle>
          <DialogDescription>
            Are you a job seeker or an employer?
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Button asChild>
            <Link href="/profile/job-seeker">Job Seeker</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/profile/employer">Employer</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
