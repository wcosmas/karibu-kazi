import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.profile["skills"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.profile["skills"]["$post"]>["json"];

export const useAddSkill = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.profile["skills"]["$post"]({ json });

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["skills"], });
            queryClient.invalidateQueries({ queryKey: ["profile"] });

            toast.success("Skill added successfully");
        },
        onError: () => {
            toast.error("Failed to add skill");
        }
    });

    return mutation;
}