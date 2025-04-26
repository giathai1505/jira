"use client";

import ResponsiveModal from "@/components/responsive-modal";

import { useModal } from "@/hooks/use-modal";

import CreateProjectForm from "./create-project-form";

export const CreateProjectModal = () => {
  const { isOpen, setIsOpen, close } = useModal({ urlKey: "create-project" });

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectForm onCancel={close} />
    </ResponsiveModal>
  );
};
