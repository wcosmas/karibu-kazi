"use client";

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

interface EducationListProps {
  educations: Education[];
}

export function EducationList({ educations }: EducationListProps) {
  const handleAddEducation = () => {};

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
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{edu.institution}</h3>
                <p className="text-muted-foreground">
                  {edu.degree} in {edu.fieldOfStudy}
                </p>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {edu.startDate.toLocaleDateString()} -{" "}
                  {edu.endDate ? edu.endDate.toLocaleDateString() : "Present"}
                </div>
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
        <Button onClick={handleAddEducation}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </CardFooter>
    </Card>
  );
}
