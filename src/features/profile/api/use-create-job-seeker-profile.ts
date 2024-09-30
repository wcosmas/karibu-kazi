import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.profile["job-seeker"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.profile["job-seeker"]["$post"]>["json"];

export const useCreateJobSeekerProfile = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.profile["job-seeker"].$post({ json });

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["job-seeker-profile"] });
            toast.success("Job seeker profile updated successfully");
        },
        onError: () => {
            toast.error("Failed to update job seeker profile");
        }
    });

    return mutation;
}