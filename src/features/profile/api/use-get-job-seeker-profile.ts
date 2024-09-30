import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetJobSeekerProfile = () => {
    const query = useQuery({
        queryKey: ["job-seeker-profile"],
        queryFn: async () => {
            const response = await client.api.profile["job-seeker"].$get();

            if (!response.ok) {
                throw new Error("Failed to fetch profile");
            }

            const { profile } = await response.json();

            return profile;
        }
    });

    return query;
}