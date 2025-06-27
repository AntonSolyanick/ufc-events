import { Modal } from "@/shared/ui/Modal/Modal";
import { AuthForm } from "../AuthForm/AuthForm";

interface AuthModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = (props: AuthModalProps) => {
  const { isOpen, onClose } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose} lazy>
      <AuthForm onCloseModal={onClose} />
    </Modal>
  );
};
