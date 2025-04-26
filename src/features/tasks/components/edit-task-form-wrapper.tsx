import { Loader } from "lucide-react";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetWorkMembers } from "@/features/members/api/use-get-members";

import { Card, CardContent } from "@/components/ui/card";

import { useGetTask } from "../api/use-get-task";
import EditTaskForm from "./edit-task-form";

interface EditTaskFormWrapperProps {
  onCancel?: () => void;
  id: string;
}

const EditTaskFormWrapper = ({ onCancel, id }: EditTaskFormWrapperProps) => {
  const workspaceId = useWorkspaceId();
  const { data: task, isLoading: isLoadingTask } = useGetTask({ taskId: id });
  const { data: projects, isLoading: isLoadingProject } = useGetProjects({
    workspaceId,
  });

  const { data: members, isLoading: isLoadingMember } = useGetWorkMembers({
    workspaceId,
  });

  const projectOptions = projects?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl,
  }));

  const memberOptions = members?.documents.map((member) => ({
    id: member.$id,
    name: member.name,
  }));

  const isLoading = isLoadingProject || isLoadingMember || isLoadingTask;

  if (isLoading) {
    return (
      <Card className="w-full border-none shadow-none h-[714px]">
        <CardContent className="flex">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!task) {
    return null;
  }

  return (
    <div>
      <EditTaskForm
        onCancel={onCancel}
        memberOptions={memberOptions ?? []}
        projectOptions={projectOptions ?? []}
        initialValues={task}
      />
    </div>
  );
};

export default EditTaskFormWrapper;
