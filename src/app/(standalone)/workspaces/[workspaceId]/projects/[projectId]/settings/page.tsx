import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";

import ProjectSettingClientPage from "./client";



const ProjectSettingPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <ProjectSettingClientPage/>
  );
};

export default ProjectSettingPage;
