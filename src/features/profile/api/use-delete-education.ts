import { toast } from "sonner";
import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.profile["education"][":id"]["$delete"]>;

export const useDeleteEducation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, string>({
        mutationFn: async (id: string) => {
            const response = await client.api.profile["education"][":id"].$delete({
                param: { id },
            });
            return response.json();
        },
        onSuccess: (_, id) => {
            toast.success("Education deleted");
            queryClient.invalidateQueries({ queryKey: ["education", { id }] });
            queryClient.invalidateQueries({ queryKey: ["educations"] });
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: () => {
            toast.error("Failed to delete education");
        }
    });

    return mutation;
}