"use client"

import EditProjectForm from "@/features/projects/components/edit-project-form";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { useGetProject } from "@/features/projects/api/use-get-project";

import { PageLoader } from "@/components/page-loader";
import { PageError } from "@/components/page-error";

const ProjectSettingClientPage = () => {
  const projectId = useProjectId()
  const {data: project, isLoading} = useGetProject({projectId})

  if(isLoading) {
    return <PageLoader/>
  }

  if(!project) {
    return <PageError message="Project not found"/>
  }

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={project} />
    </div>
  );
};

export default ProjectSettingClientPage;
