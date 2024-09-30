import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetProfile = () => {
    const query = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const response = await client.api.profile.$get();

            if (!response.ok) {
                throw new Error("Failed to fetch profile");
            }

            const { profile } = await response.json();

            return profile;
        }
    });

    return query;
}