import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.profile["experience"][":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.profile["experience"][":id"]["$patch"]>["json"];

export const useEditExperience = (id: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.profile["experience"][":id"]["$patch"]({
                param: { id },
                json: {
                    ...json,
                    startDate: json.startDate,
                    endDate: json.endDate ?? undefined,
                },
            });
            return response.json();
        },
        onSuccess: () => {
            toast.success("Experience updated");
            queryClient.invalidateQueries({ queryKey: ["experience", { id }] });
            queryClient.invalidateQueries({ queryKey: ["experiences"] });
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: () => {
            toast.error("Failed to edit experience");
        }
    });

    return mutation;
}