import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.profile["experience"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.profile["experience"]["$post"]>["json"];

export const useAddExperience = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.profile["experience"]["$post"]({ json });

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["experience"], });
            queryClient.invalidateQueries({ queryKey: ["profile"] });

            toast.success("Experience added successfully");
        },
        onError: () => {
            toast.error("Failed to add experience");
        }
    });

    return mutation;
}