import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.profile["education"][":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.profile["education"][":id"]["$patch"]>["json"];

export const useEditEducation = (id: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.profile["education"][":id"]["$patch"]({
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
            toast.success("Education updated");
            queryClient.invalidateQueries({ queryKey: ["education", { id }] });
            queryClient.invalidateQueries({ queryKey: ["educations"] });
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: () => {
            toast.error("Failed to edit education");
        }
    });

    return mutation;
}