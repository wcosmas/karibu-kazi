import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'


import { db } from "@/lib/db";

const app = new Hono()
    .get(
        "/",
        clerkMiddleware(),
        async (c) => {
            const auth = getAuth(c);

            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const profile = await db.profile.findFirst({
                where: {
                    userId: auth?.userId,
                },
                include: {
                    education: true,
                    experience: true,
                    company: true
                }
            });

            return c.json({ profile });
        })
    .get(
        "/job-seeker",
        clerkMiddleware(),
        async (c) => {
            const auth = getAuth(c);

            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const profile = await db.profile.findFirst({
                where: {
                    userId: auth?.userId,
                },
                include: {
                    education: true,
                    experience: true,
                }
            });

            return c.json({ profile });
        })
    .post(
        "/job-seeker",
        clerkMiddleware(),
        zValidator("json", z.object({
            bio: z.string(),
            location: z.string().optional(),
            websiteUrl: z.string().optional(),
            resumeUrl: z.string().optional(),
        })),
        async (c) => {
            const auth = getAuth(c);

            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const { bio, location, websiteUrl, resumeUrl } = c.req.valid("json");

            const existingProfile = await db.profile.findUnique({
                where: { userId: auth.userId },
            });

            let profile;

            if (existingProfile) {
                profile = await db.profile.update({
                    where: { userId: auth.userId },
                    data: {
                        bio,
                        location,
                        websiteUrl,
                        resumeUrl,
                    },
                });
            } else {
                profile = await db.profile.create({
                    data: {
                        userId: auth.userId,
                        bio,
                        location,
                        websiteUrl,
                        resumeUrl,
                    },
                    include: {
                        education: true,
                        experience: true,
                    }
                });
            }

            return c.json({ profile });
        })
    .post(
        "/experience",
        clerkMiddleware(),
        zValidator("json", z.object({
            position: z.string(),
            company: z.string(),
            location: z.string().optional(),
            description: z.string().optional(),
            startDate: z.string(),
            endDate: z.string().optional(),
        })),
        async (c) => {
            const auth = getAuth(c);

            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const profile = await db.profile.findUnique({
                where: { userId: auth.userId },
            });

            if (!profile) {
                return c.json({ error: "Profile not found" }, 404);
            }

            const { position, company, location, description, startDate, endDate } = c.req.valid("json");

            const experience = await db.experience.create({
                data: {
                    position,
                    company,
                    location,
                    description,
                    startDate,
                    endDate,
                    profileId: profile.id,
                },
            });

            return c.json({ experience });
        }
    )
    .patch(
        "/experience/:id",
        clerkMiddleware(),
        zValidator("json", z.object({
            position: z.string(),
            company: z.string(),
            location: z.string().optional(),
            description: z.string().optional(),
            startDate: z.string(),
            endDate: z.string().optional(),
        })),
        async (c) => {
            const auth = getAuth(c);


            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const { id } = c.req.param();

            const existingExperience = await db.experience.findUnique({
                where: { id },
            });

            if (!existingExperience) {
                return c.json({ error: "Experience not found" }, 404);
            }

            const profile = await db.profile.findUnique({
                where: { userId: auth.userId },
            });

            if (!profile) {
                return c.json({ error: "Profile not found" }, 404);
            }

            if (existingExperience.profileId !== profile.id) {
                return c.json({ error: "Experience does not belong to the profile" }, 403);
            }

            const { position, company, location, description, startDate, endDate } = c.req.valid("json");

            const experience = await db.experience.update({
                where: { id },
                data: {
                    position,
                    company,
                    location,
                    description,
                    startDate,
                    endDate,
                    profileId: profile.id,
                },
            });

            return c.json({ experience });
        }
    )
    .delete(
        "/experience/:id",
        clerkMiddleware(),
        async (c) => {
            const auth = getAuth(c);

            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const { id } = c.req.param();

            const existingExperience = await db.experience.findUnique({
                where: { id },
            });

            if (!existingExperience) {
                return c.json({ error: "Experience not found" }, 404);
            }

            const profile = await db.profile.findUnique({
                where: { userId: auth.userId },
            });

            if (!profile) {
                return c.json({ error: "Profile not found" }, 404);
            }

            if (existingExperience.profileId !== profile.id) {
                return c.json({ error: "Experience does not belong to the profile" }, 403);
            }

            const experience = await db.experience.delete({
                where: { id },
            });

            return c.json({ experience });
        }
    )
    .post(
        "/education",
        clerkMiddleware(),
        zValidator("json", z.object({
            institution: z.string(),
            degree: z.string(),
            fieldOfStudy: z.string(),
            startDate: z.string(),
            endDate: z.string().optional(),
            description: z.string().optional(),
        })),
        async (c) => {
            const auth = getAuth(c);

            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const profile = await db.profile.findUnique({
                where: { userId: auth.userId },
            });

            if (!profile) {
                return c.json({ error: "Profile not found" }, 404);
            }

            const { institution, degree, fieldOfStudy, startDate, endDate, description } = c.req.valid("json");

            const education = await db.education.create({
                data: {
                    institution,
                    degree,
                    fieldOfStudy,
                    startDate: new Date(startDate),
                    endDate: endDate ? new Date(endDate) : null,
                    description,
                    profileId: profile.id,
                },
            });

            return c.json({ education });
        }
    )
    .patch(
        "/education/:id",
        clerkMiddleware(),
        zValidator("json", z.object({
            institution: z.string(),
            degree: z.string(),
            fieldOfStudy: z.string(),
            startDate: z.string(),
            endDate: z.string().optional(),
            description: z.string().optional(),
        })),
        async (c) => {
            const auth = getAuth(c);

            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const { id } = c.req.param();

            const existingEducation = await db.education.findUnique({
                where: { id },
            });

            if (!existingEducation) {
                return c.json({ error: "Education not found" }, 404);
            }

            const profile = await db.profile.findUnique({
                where: { userId: auth.userId },
            });

            if (!profile) {
                return c.json({ error: "Profile not found" }, 404);
            }

            if (existingEducation.profileId !== profile.id) {
                return c.json({ error: "Education does not belong to the profile" }, 403);
            }

            const { institution, degree, fieldOfStudy, startDate, endDate, description } = c.req.valid("json");

            const education = await db.education.update({
                where: { id },
                data: {
                    institution,
                    degree,
                    fieldOfStudy,
                    startDate: new Date(startDate),
                    endDate: endDate ? new Date(endDate) : null,
                    description,
                    profileId: profile.id,
                },
            });

            return c.json({ education });
        }
    )
    .delete(
        "/education/:id",
        clerkMiddleware(),
        async (c) => {
            const auth = getAuth(c);

            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const { id } = c.req.param();

            const existingEducation = await db.education.findUnique({
                where: { id },
            });

            if (!existingEducation) {
                return c.json({ error: "Education not found" }, 404);
            }

            const profile = await db.profile.findUnique({
                where: { userId: auth.userId },
            });

            if (!profile) {
                return c.json({ error: "Profile not found" }, 404);
            }

            if (existingEducation.profileId !== profile.id) {
                return c.json({ error: "Education does not belong to the profile" }, 403);
            }

            const education = await db.education.delete({
                where: { id },
            });

            return c.json({ education });
        }
    )
    .post(
        "/skills",
        clerkMiddleware(),
        zValidator("json", z.object({
            skills: z.array(z.string()),
        })),
        async (c) => {
            const auth = getAuth(c);

            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const { skills } = c.req.valid("json");

            const profile = await db.profile.findUnique({
                where: { userId: auth.userId },
            });

            if (!profile) {
                return c.json({ error: "Profile not found" }, 404);
            }

            // @ts-ignore
            const updatedSkills = [...new Set([...profile.skills, ...skills])];

            const updatedProfile = await db.profile.update({
                where: { id: profile.id },
                data: {
                    skills: updatedSkills,
                },
            });

            return c.json({ updatedProfile });
        }
    )
    .delete(
        "/skills",
        clerkMiddleware(),
        async (c) => {
            const auth = getAuth(c);

            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const { skill } = await c.req.json();

            if (!skill || typeof skill !== 'string') {
                return c.json({ error: "Invalid skill provided" }, 400);
            }

            const profile = await db.profile.findUnique({
                where: { userId: auth.userId },
            });

            if (!profile) {
                return c.json({ error: "Profile not found" }, 404);
            }

            const updatedSkills = profile.skills.filter(s => s !== skill);

            const updatedProfile = await db.profile.update({
                where: { id: profile.id },
                data: {
                    skills: updatedSkills,
                },
            });

            return c.json({ updatedProfile });
        }
    )
    .post(
        "/company",
        clerkMiddleware(),
        zValidator("json", z.object({

        })),
        async (c) => {
            const auth = getAuth(c);

            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }




        }

    )
    ;





export default app;