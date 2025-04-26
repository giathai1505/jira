"use client";

import Link from "next/link";

import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useJoinWorkspace } from "../api/use-join-workspace";
import { useRouter } from "next/navigation";

interface JoinWorkspaceFormProps {
  workspaceName: string;
  workspaceId: string;
  inviteCode: string;
}

const JoinWorkspaceForm = ({
  inviteCode,
  workspaceId,
  workspaceName,
}: JoinWorkspaceFormProps) => {
  const router = useRouter();
  const { mutate, isPending } = useJoinWorkspace();

  const handleSubmit = () => {
    mutate(
      {
        param: { workspaceId: workspaceId },
        json: { code: inviteCode },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join workspace</CardTitle>

        <CardDescription>
          You&apos;ve been invited to join <strong>{workspaceName}</strong>
        </CardDescription>
      </CardHeader>
      <DottedSeparator className="px-7" />
      <CardContent className="p-7">
        <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
          <Button
            className="w-full lg:w-fit"
            variant="secondary"
            type="button"
            asChild
            size="lg"
          >
            <Link href="/">Cancel</Link>
          </Button>
          <Button
            className="w-full lg:w-fit"
            size="lg"
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
          >
            Join
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JoinWorkspaceForm;
