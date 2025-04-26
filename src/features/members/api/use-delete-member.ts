import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<
  (typeof client.api.members)[":memberId"]["$delete"],
  201
>;
type RequestType = InferRequestType<
  (typeof client.api.members)[":memberId"]["$delete"]
>;

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.members[":memberId"]["$delete"]({
        param,
      });

      if (!response.ok) {
        throw new Error("Fail to delete member");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Member deleted!");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: () => {
      toast.error("Fail to delete a member!");
    },
  });
  return mutation;
};
