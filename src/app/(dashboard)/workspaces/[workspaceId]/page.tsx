import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";

import { WorkspaceAnalyticsClient } from "./client";

const WorkspaceIdPage = async () => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return <WorkspaceAnalyticsClient/>
};

export default WorkspaceIdPage;
