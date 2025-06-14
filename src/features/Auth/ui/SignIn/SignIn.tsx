import { Button, ButtonTheme } from "@/shared/ui/Button";
import { VStack } from "@/shared/ui/Stack/VStack/VStack";
import { useForm } from "react-hook-form";
import { BaseAuthFormData } from "../../model/types";
import { useSignIn } from "../../model/hooks/useAuth";
import cls from "./SignIn.module.css";
import { Input } from "@/shared/ui/Input";

export const SignIn = (props: { onCloseModal: () => void }) => {
  const { mutate: signIn, error: signInError, isPending } = useSignIn();
  const { onCloseModal } = props;

  const onSubmit = (data: BaseAuthFormData) => {
    signIn(data, {
      onSuccess: () => {
        onCloseModal();
      },
    });
  };

  const { register, handleSubmit } = useForm<BaseAuthFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack className={cls.inputContainer} align="center" gap="8">
        <Input
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
        />
        <Input
          {...register("password", { required: "Password is required" })}
          placeholder="Пароль"
          type="password"
        />
      </VStack>
      {signInError && (
        <div className={cls.error}>
          {(signInError as Error).message || "signIn failed"}
        </div>
      )}
      <Button
        className={cls.submitButton}
        type="submit"
        disabled={isPending}
        theme={ButtonTheme.SOLID}
        fullWidth
      >
        Войти
      </Button>
    </form>
  );
};
