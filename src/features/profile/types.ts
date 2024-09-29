import { z } from "zod";

import { Experience, Education } from "@prisma/client"


export interface Profile {
    id: string;
    location?: string;
    websiteUrl?: string;
    role: string;
    bio: string;
    resumeUrl: string | null;
    skills: string[];
    experience: Experience[];
    education: Education[];
}

export const JobSeekerProfileSchema = z.object({
    bio: z.string(),
    location: z.string().optional(),
    websiteUrl: z.string().optional(),
    resumeUrl: z.string().optional(),
});


export type ExperienceSchema = Omit<Experience, "id" | "createdAt" | "updatedAt" | "profileId"> & {
    position: string;
    company: string;
    startDate: Date;
    endDate: Date | null;
    description: string;
};

