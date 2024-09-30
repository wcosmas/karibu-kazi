import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAddSkill } from "../api/use-add-skill";
import { useDeleteSkill } from "../api/use-delete-skill";
import { X } from "lucide-react";

interface SkillsListProps {
  skills: string[];
}

export function SkillsList({ skills }: SkillsListProps) {
  const [newSkill, setNewSkill] = useState("");
  const addSkillMutation = useAddSkill();
  const deleteSkillMutation = useDeleteSkill();

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addSkillMutation.mutate(
        { skills: [newSkill.trim()] },
        {
          onSuccess: () => setNewSkill(""),
        }
      );
    }
  };

  const handleDeleteSkill = (skill: string) => {
    deleteSkillMutation.mutate({ skill });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>Highlight your professional skills</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {skill}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0"
                onClick={() => handleDeleteSkill(skill)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex space-x-2 w-full">
          <Input
            placeholder="Add a new skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
          />
          <Button
            onClick={handleAddSkill}
            disabled={addSkillMutation.isPending}
          >
            {addSkillMutation.isPending ? "Adding..." : "Add Skill"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
