"use client";

import { useRouter } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const WorkspaceSwitcher = () => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { data: workspaces } = useGetWorkspaces();
  const { open } = useCreateWorkspaceModal();

  const onChangeWorkspace = (id: string) => {
    router.push(`/workspaces/${id}`);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>
      <Select onValueChange={onChangeWorkspace} value={workspaceId}>
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
          <SelectValue placeholder="No workspace selected"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          {workspaces?.documents.map((w) => {
            return (
              <SelectItem key={w.$id} value={w.$id}>
                <div className="flex justify-start items-center gap-3 font-medium">
                  <WorkspaceAvatar name={w.name} image={w.imageUrl} />
                  <span className="truncate">{w.name}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default WorkspaceSwitcher;
