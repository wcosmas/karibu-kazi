import { createUploadthing, type FileRouter } from "uploadthing/next";
import { currentUser } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";

const f = createUploadthing();

// This function can be used to handle authentication
const handleAuth = async (req: NextRequest) => {
    try {
        const user = await currentUser();
        if (!user) throw new Error("Unauthorized");
        return { userId: user.id };
    } catch (error) {
        console.error("Authentication error:", error);
        // Instead of throwing an error, return null
        return { userId: null };
    }
};

// Reusable middleware function
const middleware = async ({ req }: { req: NextRequest }) => {
    const { userId } = await handleAuth(req);
    return { userId };
};

// Reusable onUploadComplete function
const onUploadComplete = async ({ metadata, file }: { metadata: { userId: string | null }, file: { url: string } }) => {
    console.log("Upload complete for userId:", metadata.userId);
    console.log("file url", file.url);
    // You can add additional logic here to handle unauthenticated uploads if needed
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(middleware)
        .onUploadComplete(onUploadComplete),

    companyLogo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(middleware)
        .onUploadComplete(onUploadComplete),

    resume: f({ pdf: { maxFileSize: "16MB", maxFileCount: 1 } })
        .middleware(middleware)
        .onUploadComplete(onUploadComplete),

    coverLetter: f({ pdf: { maxFileSize: "16MB", maxFileCount: 1 } })
        .middleware(middleware)
        .onUploadComplete(onUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
