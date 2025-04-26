import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { getWorkspaceInfo } from "@/features/workspaces/queries";
import JoinWorkspaceForm from "@/features/workspaces/components/join-workspace-form";

interface JoinWorkspaceProps {
  params: {
    workspaceId: string;
    inviteCode: string;
  };
}

const JoinWorkspace = async ({ params }: JoinWorkspaceProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const workspace = await getWorkspaceInfo({
    workspaceId: params.workspaceId,
  });

  if (!workspace) {
    redirect("/");
  }

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm
        inviteCode={params.inviteCode}
        workspaceId={params.workspaceId}
        workspaceName={workspace.name}
      />
    </div>
  );
};

export default JoinWorkspace;
