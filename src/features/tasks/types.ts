import { snakeCaseToTitleCase } from "@/lib/utils";
import { Models } from "node-appwrite";
import { Project } from "../projects/types";

export enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
}

export type Task = Models.Document & {
  name: string;
  status: TaskStatus;
  assigneeId: string;
  projectId: string;
  position: number;
  dueDate: string;
  workspaceId: string;
  description?: string;
};

export const TaskStatusOptions = Object.entries(TaskStatus).map(
  ([key, value]) => ({
    key,
    text: snakeCaseToTitleCase(value),
  })
);

export const TaskViewsTabs = [
  {
    id: "table",
    text: "Table",
  },

  {
    id: "kanban",
    text: "Kanban",
  },

  {
    id: "calendar",
    text: "Calendar",
  },
];
