"use client";

import { useGetWorkspaceAnalytics } from "@/features/workspaces/api/use-get-workspace-analytics";
import { useGetWorkMembers } from "@/features/members/api/use-get-members";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { Task } from "@/features/tasks/types";

import { useModal } from "@/hooks/use-modal";

import { PageLoader } from "@/components/page-loader";
import { PageError } from "@/components/page-error";
import { ProjectAnalytics } from "@/components/analytics";
import { Button } from "@/components/ui/button";
import { CalendarIcon, PlusIcon, SettingsIcon } from "lucide-react";
import DottedSeparator from "@/components/dotted-separator";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Project } from "@/features/projects/types";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { Member } from "@/features/members/types";
import { MemberAvatar } from "@/features/members/components/member-avatar";

export const WorkspaceAnalyticsClient = () => {
  const workspaceId = useWorkspaceId();

  const { data: analytics, isLoading: isLoadingAnalytics } =
    useGetWorkspaceAnalytics({ workspaceId });
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
  });
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isLoadingMembers } = useGetWorkMembers({
    workspaceId,
  });

  const isLoading =
    isLoadingAnalytics ||
    isLoadingTasks ||
    isLoadingProjects ||
    isLoadingMembers;

  if (isLoading) {
    return <PageLoader />;
  }

  if (!analytics || !tasks || !projects || !members) {
    return <PageError message="Failed to load data" />;
  }

  return (
    <div className="h-full flex flex-col space-y-6">
      <ProjectAnalytics data={analytics} />
      <div className="grid grid-cols-2 xl:grid-cols-2 gap-4">
        <TaskList data={tasks.documents} total={tasks.total} />
        <ProjectsList data={projects.documents} total={projects.total} />
        <MemberList data={members.documents} total={members.total} />
      </div>
    </div>
  );
};

interface TaskListProps {
  data: Task[];
  total: number;
}
export const TaskList = ({ data, total }: TaskListProps) => {
  const workspaceId = useWorkspaceId();
  const { open: openCreateTaskModal } = useModal({ urlKey: "create-task" });

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Tasks ({total})</p>
          <Button variant="secondary" size="icon" onClick={openCreateTaskModal}>
            <PlusIcon className="size-4 text-neutral-400" />
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="flex flex-col gap-y-4">
          {data.map((task) => {
            return (
              <li key={task.$id}>
                <Link href={`/workspaces/${workspaceId}/tasks/${task.$id}`}>
                  <Card className="shadow-none rounded-lg hover:opacity-75 trasition">
                    <CardContent className="p-4">
                      <p className="text-lg font-medium truncate">
                        {task.name}
                      </p>
                      <div className="flex items-center gap-x-2">
                        <p>{task.project?.name}</p>
                        <div className="size-1 rounded-full bg-neutral-300"></div>
                        <div className="text-sm text-muted-foreground flex items-center ">
                          <CalendarIcon className="size-3 mr-1" />
                          <span className="truncate ">
                            {formatDistanceToNow(new Date(task.dueDate))}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            );
          })}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No tasks found
          </li>
        </ul>
        <Button variant="secondary" className="mt-4 w-full" asChild>
          <Link href={`/workspaces/${workspaceId}/tasks`}>Show All</Link>
        </Button>
      </div>
    </div>
  );
};

interface ProjectsListProps {
  data: Project[];
  total: number;
}
export const ProjectsList = ({ data, total }: ProjectsListProps) => {
  const workspaceId = useWorkspaceId();
  const { open: openCreateProjectModal } = useModal({
    urlKey: "create-project",
  });

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Project ({total})</p>
          <Button
            variant="secondary"
            size="icon"
            onClick={openCreateProjectModal}
          >
            <PlusIcon className="size-4 text-neutral-400" />
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data.map((project) => {
            return (
              <li key={project.$id}>
                <Link
                  href={`/workspaces/${workspaceId}/projects/${project.$id}`}
                >
                  <Card className="shadow-none rounded-lg hover:opacity-75 trasition">
                    <CardContent className="p-4 flex items-center gap-x-2.5 ">
                      <ProjectAvatar
                        name={project.name}
                        image={project.imageUrl}
                        fallbackClassName="text-lg"
                      />
                      <p className="text-xs font-medium truncate">
                        {project.name}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            );
          })}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No project found
          </li>
        </ul>
      </div>
    </div>
  );
};

interface MemnerListProps {
  data: Member[];
  total: number;
}
export const MemberList = ({ data, total }: MemnerListProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Members ({total})</p>
          <Button variant="secondary" size="icon" asChild>
            <Link href={`/workspaces/${workspaceId}/members`}>
              <SettingsIcon className="size-4 text-neutral-400" />
            </Link>
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((member) => {
            return (
              <li key={member.$id}>

                  <Card className="shadow-none rounded-lg overflow-hidden">
                    <CardContent className="p-3 flex flex-col items-center gap-x-2">
                      <MemberAvatar
                        name={member.name}
                        className="size-12"
                      />
                      <div className="flex flex-col items-center overflow-hidden">
                      <p className="text-lg font-medium line-clamp-1">
                        {member.name}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {member.email}
                      </p>
                      </div>
                    </CardContent>
                  </Card>
         
              </li>
            );
          })}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No member found
          </li>
        </ul>
      </div>
    </div>
  );
};
