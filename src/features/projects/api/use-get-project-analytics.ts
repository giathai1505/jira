import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { client } from "@/lib/rpc";

interface UserGetProjectAnalyticsProps {
  projectId: string;
}

export type ProjectAnalyticsResponseType = InferResponseType<typeof client.api.projects[":projectId"]["analytics"]["$get"], 200>

export const useGetProjectAnalytics = ({ projectId }: UserGetProjectAnalyticsProps) => {
  const query = useQuery({
    queryKey: ["project-analytics", projectId],
    queryFn: async () => {
      const response = await client.api.projects[":projectId"]["analytics"].$get({
        param: { projectId },
      });

      if (!response.ok) {
        throw new Error("Fail to fetch project analytics");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
