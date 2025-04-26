import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface UserGetTaskProps {
  taskId: string;
}

export const useGetTask = ({ taskId }: UserGetTaskProps) => {
  const query = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const response = await client.api.tasks[":taskId"].$get({
        param: { taskId },
      });

      if (!response.ok) {
        throw new Error("Fail to fetch task");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
