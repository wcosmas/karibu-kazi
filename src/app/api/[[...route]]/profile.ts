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

            const user = await db.profile.findFirst({
                where: {
                    userId: auth?.userId,
                },
            });

            return c.json({ user });
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
    ;

export default app;