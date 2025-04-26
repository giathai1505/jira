import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useConfirm } from "@/hooks/use-confirm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteTask } from "../api/use-delete-task";
import { useRouter } from "next/navigation";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";

interface TaskActionProps {
  id: string;
  projectId: string;
  children: React.ReactNode;
}

export const TaskActions = ({ children, id, projectId }: TaskActionProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [ConfirmDeleteTaskModal, confirm] = useConfirm(
    "Delete task",
    "This action cannot be undone",
    "destructive"
  );

  const { mutate, isPending } = useDeleteTask();

  const handleDeleteTask = async () => {
    const ok = await confirm();
    if (!ok) return;

    mutate({ param: { taskId: id } });
  };

  const { open } = useEditTaskModal();

  const handleOpenTask = () => {
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };

  const handleOpenProject = () => {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
  };

  return (
    <div className="flex justify-end">
      <ConfirmDeleteTaskModal />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={handleOpenTask}
            className="font-medium p-[10px]"
          >
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            Task Detail
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleOpenProject}
            className="font-medium p-[10px]"
          >
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            Open Project
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => open(id)}
            className="font-medium p-[10px]"
          >
            <PencilIcon className="size-4 mr-2 stroke-2" />
            Edit Detail
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleDeleteTask}
            disabled={isPending}
            className="text-amber-700 focus:text-amber-700 font-medium p-[10px]"
          >
            <TrashIcon className="size-4 mr-2 stroke-2" />
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
