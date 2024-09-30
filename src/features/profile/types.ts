import { z } from "zod";

import { Experience, Education, Prisma } from "@prisma/client"


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


export const ExperienceSchema = z.object({
    position: z.string().min(1, "Position is required"),
    company: z.string().min(1, "Company is required"),
    location: z.string().nullable(),
    startDate: z.date({
        required_error: "Start date is required.",
    }),
    endDate: z.date().nullable(),
    description: z.string().min(1, "Description is required"),
});

export type ExperienceSchema = z.infer<typeof ExperienceSchema>;

export type EducationFormData = Omit<
    Education,
    "id" | "createdAt" | "updatedAt" | "profileId"
>;

export type ProfileWithExperienceAndEducation = Prisma.ProfileGetPayload<{
    include: {
        education: true,
        experience: true,
        company: true,
    };
}>;

