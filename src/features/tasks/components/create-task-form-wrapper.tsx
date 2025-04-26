import { Loader } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import CreateTaskForm from "./create-task-form";
import { useGetWorkMembers } from "@/features/members/api/use-get-members";

interface CreateTaskFormWrapperProps {
  onCancel?: () => void;
}

const CreateTaskFormWrapper = ({ onCancel }: CreateTaskFormWrapperProps) => {
  const workspaceId = useWorkspaceId();
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

  const isLoading = isLoadingProject || isLoadingMember;

  if (isLoading) {
    return (
      <Card className="w-full border-none shadow-none h-[714px]">
        <CardContent className="flex">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <CreateTaskForm
        onCancel={onCancel}
        memberOptions={memberOptions ?? []}
        projectOptions={projectOptions ?? []}
      />
    </div>
  );
};

export default CreateTaskFormWrapper;
