"use client";

import ResponsiveModal from "@/components/responsive-modal";

import { useModal } from "@/hooks/use-modal";
import CreateTaskFormWrapper from "./create-task-form-wrapper";

export const CreateTaskModal = () => {
  const { isOpen, setIsOpen, close } = useModal({ urlKey: "create-task" });

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateTaskFormWrapper onCancel={close} />
    </ResponsiveModal>
  );
};
