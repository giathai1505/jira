import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface UserGetProjectProps {
  projectId: string;
}

export const useGetProject = ({ projectId }: UserGetProjectProps) => {
  const query = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const response = await client.api.projects[":projectId"].$get({
        param: { projectId },
      });

      if (!response.ok) {
        throw new Error("Fail to fetch project");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
