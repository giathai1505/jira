"use client";

import { Fragment, useCallback } from "react";
import { Loader, PlusIcon } from "lucide-react";
import { useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import DottedSeparator from "@/components/dotted-separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useTaskFilters } from "@/features/tasks/hooks/use-task-filter";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { useGetTasks } from "../api/use-get-tasks";
import { TaskStatus, TaskViewsTabs } from "../types";
import TaskFilter from "./tasks-filter";
import { DataTable } from "./data-table";
import { taskColumnsDef } from "./columns";
import { DataKanban } from "./data-kanban";
import { useBulkUpdateTasks } from "../api/use-bulk-update-task";
import DataCalendar from "./data-calendar";
import { useProjectId } from "@/features/projects/hooks/use-project-id";

interface TaskViewSwitcherProps {
  hideProjectFilter?: boolean;
}

const TaskViewSwitcher = ({ hideProjectFilter }: TaskViewSwitcherProps) => {
  const [{ assigneeId, dueDate, projectId, search, status }] = useTaskFilters();
  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  });
  const workspaceId = useWorkspaceId();
  const paramProjectId = useProjectId()
  const { open } = useModal({ urlKey: "create-task" });
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId: paramProjectId || projectId,
    assigneeId,
    status: status ?? undefined,
    dueDate,
    search,
  });

  const { mutate: bulkUpdate } = useBulkUpdateTasks();

  const handleKanbanTasksChange = useCallback(
    (tasks: { $id: string; status: TaskStatus; position: number }[]) => {
      bulkUpdate({
        json: { tasks },
      });
    },
    [bulkUpdate]
  );

  return (
    <Tabs
      className="flex-1 w-full border rounded-lg mt-5"
      defaultValue={view}
      onValueChange={setView}
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            {TaskViewsTabs.map((tab) => {
              return (
                <TabsTrigger
                  className="h-8 w-full lg:w-auto"
                  value={tab.id}
                  key={tab.id}
                >
                  {tab.text}
                </TabsTrigger>
              );
            })}
          </TabsList>
          <Button size="sm" className="w-full lg:w-auto" onClick={open}>
            <PlusIcon className="size-4 mr-1" /> New
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <TaskFilter hideProjectFilter={hideProjectFilter} />
        <DottedSeparator className="my-4" />
        {isLoadingTasks ? (
          <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Fragment>
            <TabsContent value="table" className="mt-0">
              <DataTable
                columns={taskColumnsDef}
                data={tasks?.documents ?? []}
              />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              <DataKanban
                data={tasks?.documents ?? []}
                onChange={handleKanbanTasksChange}
              />
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              <DataCalendar data={tasks?.documents ?? []} />
            </TabsContent>
          </Fragment>
        )}
      </div>
    </Tabs>
  );
};

export default TaskViewSwitcher;
