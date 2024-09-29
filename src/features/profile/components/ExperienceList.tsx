"use client";

import { useState } from "react";

import { Experience } from "@prisma/client";
import { ExperienceSchema } from "../types";
import { useAddExperience } from "../api/use-add-experience";

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
import { ExperienceModal } from "./ExperienceModal";

interface ExperienceListProps {
  experiences: Experience[];
}

export function ExperienceList({ experiences }: ExperienceListProps) {
  const mutation = useAddExperience();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddExperience = (newExperience: ExperienceSchema) => {
    mutation.mutate(
      {
        position: newExperience.position,
        company: newExperience.company,
        startDate: newExperience.startDate.toISOString(),
        endDate: newExperience.endDate?.toISOString(),
        description: newExperience.description,
      },
      {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
        <CardDescription>Add or edit your work history</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="border-b pb-4 last:border-b-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{exp.position}</h3>
                <p className="text-muted-foreground">{exp.company}</p>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {exp.startDate.toLocaleDateString()} -{" "}
                  {exp.endDate ? exp.endDate.toLocaleDateString() : "Present"}
                </div>
                <p className="mt-2">{exp.description}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => {}}>
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => {}}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </CardFooter>
      <ExperienceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddExperience}
        isLoading={false}
      />
    </Card>
  );
}
