import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.profile["experience"][":id"]["$delete"]>;


export const useDeleteExperience = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async (json) => {
            const response = await client.api.profile["experience"][":id"].$delete({
                param: { id: id! },
            });
            return response.json();
        },
        onSuccess: () => {
            toast.success("Experience deleted");
            queryClient.invalidateQueries({ queryKey: ["experience", { id: id! }], });
            queryClient.invalidateQueries({ queryKey: ["experiences"], });
            queryClient.invalidateQueries({ queryKey: ["job-seeker-profile"], });
        },
        onError: () => {
            toast.error("Failed to delete experience");
        }
    });

    return mutation;
}