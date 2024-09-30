import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.profile["education"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.profile["education"]["$post"]>["json"];

export const useAddEducation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.profile["education"]["$post"]({ json });

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["education"], });
            queryClient.invalidateQueries({ queryKey: ["profile"] });

            toast.success("Education added successfully");
        },
        onError: () => {
            toast.error("Failed to add education");
        }
    });

    return mutation;
}