import { Button, ButtonTheme } from "@/shared/ui/Button";
import { useForm } from "react-hook-form";
import { SignUpFormData } from "../../model/types";
import { useSignUp } from "../../model/hooks/useAuth";
import cls from "./SignUp.module.css";
import { VStack } from "@/shared/ui/Stack/VStack/VStack";
import { Input } from "@/shared/ui/Input";

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
      <VStack className={cls.inputContainer} gap="8" align="center">
        <Input
          {...register("name", { required: "Name is required" })}
          placeholder="Имя"
        />
        <Input
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
          type="email"
        />
        <Input
          {...register("password", { required: "Password is required" })}
          placeholder="Пароль"
          type="password"
        />
        <Input
          {...register("confirmPassword", {
            required: "confirmPassword is required",
          })}
          placeholder="Подтвердите пароль"
          type="password"
        />
      </VStack>
      {signUpError && (
        <div className={cls.error}>
          {(signUpError as Error).message || "Login failed"}
        </div>
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
