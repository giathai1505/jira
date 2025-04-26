import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface UserGetProjectsProps {
  workspaceId: string;
}

export const useGetProjects = ({ workspaceId }: UserGetProjectsProps) => {
  const query = useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: async () => {
      const response = await client.api.projects.$get({
        query: { workspaceId },
      });

      if (!response.ok) {
        throw new Error("Fail to fetch projects");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
