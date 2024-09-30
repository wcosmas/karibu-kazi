import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.profile["skills"]["$delete"]>;
type RequestType = InferRequestType<typeof client.api.profile["skills"]["$delete"]>;

export const useDeleteSkill = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.profile["skills"]["$delete"]({ json });

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skills"], });
            queryClient.invalidateQueries({ queryKey: ["job-seeker-profile"] });

            toast.success("Skill deleted successfully");
        },
        onError: () => {
            toast.error("Failed to delete skill");
        }
    });

    return mutation;
}