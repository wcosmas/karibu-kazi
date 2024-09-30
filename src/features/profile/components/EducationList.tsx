"use client";

import { useState } from "react";
import { Education } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { useAddEducation } from "../api/use-add-education";
import { useEditEducation } from "../api/use-edit-education";
import { useDeleteEducation } from "../api/use-delete-education";
import { useConfirm } from "@/hooks/use-confirm";
import { EducationForm } from "./EducationForm";
import { formatDate } from "@/lib/utils";
import { EducationFormData } from "../types";

interface EducationListProps {
  educations: Education[];
}

export function EducationList({ educations }: EducationListProps) {
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(
    null
  );

  const addEducation = useAddEducation();
  const editEducation = useEditEducation(editingEducation?.id ?? "");
  const deleteEducation = useDeleteEducation();

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Education",
    "Are you sure you want to delete this education entry?"
  );

  const handleAddEducation = (data: EducationFormData) => {
    addEducation.mutate(
      {
        ...data,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate ? data.endDate.toISOString() : undefined,
        description: data.description ?? undefined,
      },
      {
        onSuccess: () => setIsAddingEducation(false),
      }
    );
  };

  const handleEditEducation = (data: EducationFormData) => {
    if (editingEducation) {
      editEducation.mutate(
        {
          ...data,
          startDate: data.startDate.toISOString(),
          endDate: data.endDate ? data.endDate.toISOString() : undefined,
          description: data.description ?? undefined,
        },
        {
          onSuccess: () => setEditingEducation(null),
        }
      );
    }
  };

  const handleDeleteEducation = async (id: string) => {
    const isConfirmed = await confirm();
    if (isConfirmed) {
      deleteEducation.mutate(id);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
        <CardDescription>
          Add or edit your educational background
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {educations.map((edu) => (
          <div key={edu.id} className="border-b pb-4 last:border-b-0">
            {editingEducation?.id === edu.id ? (
              <EducationForm
                initialData={edu}
                onSubmit={handleEditEducation}
                onCancel={() => setEditingEducation(null)}
              />
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{edu.institution}</h3>
                  <p className="text-muted-foreground">
                    {edu.degree} in {edu.fieldOfStudy}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatDate(edu.startDate)} -{" "}
                    {edu.endDate ? formatDate(edu.endDate) : "Present"}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingEducation(edu)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteEducation(edu.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
        {isAddingEducation && (
          <EducationForm
            onSubmit={handleAddEducation}
            onCancel={() => setIsAddingEducation(false)}
          />
        )}
      </CardContent>
      <CardFooter>
        {!isAddingEducation && (
          <Button onClick={() => setIsAddingEducation(true)}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Education
          </Button>
        )}
      </CardFooter>
      <ConfirmDialog />
    </Card>
  );
}
