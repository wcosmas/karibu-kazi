"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRoleChange: (role: "JOBSEEKER" | "EMPLOYER" | null) => void;
}

export function ProfileDialog({
  isOpen,
  onClose,
  onRoleChange,
}: ProfileDialogProps) {
  const handleRoleSelection = (role: "JOBSEEKER" | "EMPLOYER") => {
    onRoleChange(role);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to Karibu Kazi</DialogTitle>
          <DialogDescription>
            Are you a job seeker or an employer?
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Button onClick={() => handleRoleSelection("JOBSEEKER")}>
            Job Seeker
          </Button>
          <Button
            onClick={() => handleRoleSelection("EMPLOYER")}
            variant="outline"
          >
            Employer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
