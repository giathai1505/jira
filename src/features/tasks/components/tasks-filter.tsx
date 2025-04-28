import { FolderIcon, ListChecksIcon, UserIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useGetWorkMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { TaskStatus, TaskStatusOptions } from "../types";
import { useTaskFilters } from "../hooks/use-task-filter";

interface TaskFilterProps {
  hideProjectFilter?: boolean;
}

const TaskFilter = ({ hideProjectFilter }: TaskFilterProps) => {
  const workspaceId = useWorkspaceId();
  const { data: projects, isLoading: projectLoading } = useGetProjects({
    workspaceId,
  });

  const { data: members, isLoading: membersLoading } = useGetWorkMembers({
    workspaceId,
  });

  const isLoading = projectLoading || membersLoading;

  const projectOptions = projects?.documents.map((project) => ({
    value: project.$id,
    label: project.name,
  }));

  const memberOptions = members?.documents.map((member) => ({
    value: member.$id,
    label: member.name,
  }));

  const [{ assigneeId, projectId, status }, setFilters] = useTaskFilters();

  const handleChangeStatus = (value: string) => {
    setFilters({ status: value === "all" ? null : (value as TaskStatus) });
  };

  const handleAssigneeChange = (value: string) => {
    setFilters({ assigneeId: value === "all" ? null : (value as string) });
  };

  const handleProjectChange = (value: string) => {
    setFilters({ projectId: value === "all" ? null : (value as string) });
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <Select
        defaultValue={status ?? undefined}
        onValueChange={handleChangeStatus}
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <ListChecksIcon className="size-4 mr-2" />
            <SelectValue placeholder="All statuses" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectSeparator />
          {TaskStatusOptions.map((status) => {
            return (
              <SelectItem value={status.key} key={status.key}>
                {status.text}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <Select
        defaultValue={assigneeId ?? undefined}
        onValueChange={handleAssigneeChange}
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <UserIcon className="size-4 mr-2" />
            <SelectValue placeholder="All assignee" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All assignee</SelectItem>
          <SelectSeparator />
          {memberOptions?.map((member) => {
            return (
              <SelectItem value={member.value} key={member.value}>
                {member.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {!hideProjectFilter && (
        <Select
          defaultValue={projectId ?? undefined}
          onValueChange={handleProjectChange}
        >
          <SelectTrigger className="w-full lg:w-auto h-8">
            <div className="flex items-center pr-2">
              <FolderIcon className="size-4 mr-2" />
              <SelectValue placeholder="All projects" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All projects</SelectItem>
            <SelectSeparator />
            {projectOptions?.map((project) => {
              return (
                <SelectItem value={project.value} key={project.value}>
                  {project.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default TaskFilter;
