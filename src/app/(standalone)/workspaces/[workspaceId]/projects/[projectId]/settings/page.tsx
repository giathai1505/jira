import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { getProjectById } from "@/features/projects/queries";
import EditProjectForm from "@/features/projects/components/edit-project-form";

interface ProjectSettingPageProps {
  params: {
    projectId: string;
  };
}

const ProjectSettingPage = async ({ params }: ProjectSettingPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const project = await getProjectById({
    projectId: params.projectId,
  });

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={project} />
    </div>
  );
};

export default ProjectSettingPage;
