import { Modal } from "@/shared/ui/Modal/Modal";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AuthForm } from "../AuthForm/AuthForm";

interface AuthModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = (props: AuthModalProps) => {
  const { className, isOpen, onClose } = props;
  return (
    <Modal
      className={classNames("", {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <AuthForm onCloseModal={onClose} />
    </Modal>
  );
};
