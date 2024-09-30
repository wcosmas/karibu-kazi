import { toast } from "sonner";
import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.profile["experience"][":id"]["$delete"]>;

export const useDeleteExperience = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, string>({
        mutationFn: async (id: string) => {
            const response = await client.api.profile["experience"][":id"].$delete({
                param: { id },
            });
            return response.json();
        },
        onSuccess: (_, id) => {
            toast.success("Experience deleted");
            queryClient.invalidateQueries({ queryKey: ["experience", { id }] });
            queryClient.invalidateQueries({ queryKey: ["experiences"] });
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: () => {
            toast.error("Failed to delete experience");
        }
    });

    return mutation;
}