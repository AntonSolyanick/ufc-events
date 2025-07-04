import { Button, ButtonTheme } from "@/shared/ui/Button";
import { useForm } from "react-hook-form";
import { SignUpFormData } from "../../model/types";
import { useSignUp } from "../../model/hooks/useAuth";
import cls from "./SignUp.module.css";
import { VStack } from "@/shared/ui/Stack/VStack/VStack";
import { Input } from "@/shared/ui/Input";
import { Text } from "@/shared/ui/Text";
import { TextSize } from "@/shared/ui/Text/Text";
import { Loader } from "@/shared/ui/Loader";
import { Overlay } from "@/shared/ui/Overlay";

export const SignUp = (props: { onCloseModal: () => void }) => {
  const { mutate: signUp, error: signUpError, isPending } = useSignUp();
  const { onCloseModal } = props;

  const onSubmit = (data: SignUpFormData) => {
    signUp(data, {
      onSuccess: () => {
        onCloseModal();
      },
    });
  };

  const { register, handleSubmit } = useForm<SignUpFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack className={cls.inputContainer} gap="16" align="center">
        <Input
          inputSize="medium"
          {...register("name", { required: "Name is required" })}
          placeholder="Имя"
        />
        <Input
          inputSize="medium"
          {...register("login", { required: "Login is required" })}
          placeholder="Логин"
          type="text"
        />
        <Input
          inputSize="medium"
          {...register("password", { required: "Password is required" })}
          placeholder="Пароль"
          type="password"
        />
        <Input
          inputSize="medium"
          {...register("confirmPassword", {
            required: "confirmPassword is required",
          })}
          placeholder="Подтвердите пароль"
          type="password"
        />
      </VStack>
      {signUpError && (
        <Text
          className={cls.error}
          size={TextSize.L}
          error={(signUpError as Error).message}
        />
      )}
      {isPending && (
        <>
          <Overlay />
          <Loader className={cls.loader} />
        </>
      )}

      <Button
        theme={ButtonTheme.SOLID}
        className={cls.submitButton}
        type="submit"
        disabled={isPending}
        fullWidth
      >
        Зарегистрироваться
      </Button>
    </form>
  );
};
