import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

import { TaskStatus } from "../types";

interface UserGetTasksProps {
  workspaceId: string;
  projectId?: string | null;
  status?: TaskStatus;
  assigneeId?: string | null;
  dueDate?: string | null;
  search?: string | null;
}

export const useGetTasks = ({
  workspaceId,
  assigneeId,
  dueDate,
  projectId,
  status,
  search,
}: UserGetTasksProps) => {
  const query = useQuery({
    queryKey: [
      "tasks",
      workspaceId,
      projectId,
      status,
      search,
      assigneeId,
      dueDate,
    ],
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query: {
          workspaceId,
          projectId: projectId ?? undefined,
          status: status ?? undefined,
          assigneeId: assigneeId ?? undefined,
          search: search ?? undefined,
          dueDate: dueDate ?? undefined,
        },
      });

      if (!response.ok) {
        throw new Error("Fail to fetch tasks");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
