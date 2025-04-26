import { parseAsBoolean, useQueryState } from "nuqs";

interface useModalProps {
  urlKey: string;
}

export const useModal = ({ urlKey }: useModalProps) => {
  const [isOpen, setIsOpen] = useQueryState(
    urlKey,
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};
