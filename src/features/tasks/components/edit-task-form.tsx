"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/date-picker";
import DottedSeparator from "@/components/dotted-separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MemberAvatar } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

import { editTaskSchema } from "../schemas";
import { Task, TaskStatus } from "../types";
import { useUpdateTask } from "../api/use-update-task";

interface EditTaskFormProps {
  onCancel?: () => void;
  projectOptions: Array<{ id: string; name: string; imageUrl: string }>;
  memberOptions: Array<{ id: string; name: string }>;
  initialValues: Task;
}

const EditTaskForm = ({
  onCancel,
  memberOptions,
  projectOptions,
  initialValues,
}: EditTaskFormProps) => {
  const { mutate, isPending } = useUpdateTask();

  const form = useForm<z.infer<typeof editTaskSchema>>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      ...initialValues,
      dueDate: initialValues.dueDate
        ? new Date(initialValues.dueDate)
        : undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof editTaskSchema>) => {
    mutate(
      { json: values, param: { taskId: initialValues.$id } },
      {
        onSuccess: () => {
          form.reset();
          onCancel?.();
          // TODO: redirect to new task
        },
      }
    );
  };

  return (
    <Card className="w-ful h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">Edit a new task</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter task name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <DatePicker {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assigneeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignee</FormLabel>

                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select assignee"></SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {memberOptions.map((option) => {
                          return (
                            <SelectItem key={option.id} value={option.id}>
                              <div className="flex items-center gap-x-2">
                                <MemberAvatar
                                  name={option.name}
                                  className="size-6"
                                />
                                {option.name}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>

                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status"></SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        <SelectItem value={TaskStatus.BACKLOG}>
                          Backlog
                        </SelectItem>
                        <SelectItem value={TaskStatus.IN_PROGRESS}>
                          In progress
                        </SelectItem>
                        <SelectItem value={TaskStatus.IN_REVIEW}>
                          In review
                        </SelectItem>
                        <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
                        <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>

                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project"></SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {projectOptions.map((project) => {
                          return (
                            <SelectItem key={project.id} value={project.id}>
                              <div className="flex items-center gap-x-2">
                                <ProjectAvatar
                                  name={project.name}
                                  className="size-6"
                                  image={project.imageUrl}
                                />
                                {project.name}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DottedSeparator className="py-7" />
            <div className="flex items-center justify-between">
              <Button
                type="button"
                size="lg"
                variant="secondary"
                onClick={onCancel}
                disabled={isPending}
                className={cn(!onCancel && "invisible")}
              >
                Cancel
              </Button>

              <Button type="submit" size="lg" disabled={isPending}>
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditTaskForm;
