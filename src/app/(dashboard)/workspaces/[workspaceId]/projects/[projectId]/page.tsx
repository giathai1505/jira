import Link from "next/link";
import { redirect } from "next/navigation";
import { PencilIcon } from "lucide-react";

import { getCurrent } from "@/features/auth/queries";
import { getProjectById } from "@/features/projects/queries";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

import { Button } from "@/components/ui/button";
import TaskViewSwitcher from "@/features/tasks/components/task-view-switcher";

interface ProjectDetailProps {
  params: {
    projectId: string;
  };
}

const ProjectDetailPage = async ({ params }: ProjectDetailProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const project = await getProjectById({ projectId: params.projectId });

  if (!project) {
    throw new Error("Project not found");
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={project.name}
            image={project.imageUrl}
            className="size-8"
          />
          <p className="text-lg font-semibold">{project.name}</p>
        </div>
        <div>
          <Button className="" variant="secondary" size="sm" asChild>
            <Link
              href={`/workspaces/${project.workspaceId}/projects/${project.$id}/settings`}
            >
              <PencilIcon className="size-4 mr-2" />
              Edit Project
            </Link>
          </Button>
        </div>
      </div>
      <TaskViewSwitcher hideProjectFilter={true} />
    </div>
  );
};

export default ProjectDetailPage;
