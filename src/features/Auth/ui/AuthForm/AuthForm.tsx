"use client";
import { useState } from "react";

import { Button, ButtonTheme } from "@/shared/ui/Button";
import { SignUp } from "../SignUp/SignUp";
import { SignIn } from "../SignIn/SignIn";

import cls from "./AuthForm.module.css";
import { HStack } from "@/shared/ui/Stack/HStack/HStack";

interface AuthFormProps {
  onCloseModal: () => void;
}

export const AuthForm = (props: AuthFormProps) => {
  const [isRegistration, setIsRegistration] = useState(false);
  const { onCloseModal } = props;

  return (
    <div className={cls.AuthForm}>
      <HStack className={cls.authOptions} justify="around">
        <Button
          fullWidth
          className={isRegistration ? "" : cls.selected}
          onClick={() => setIsRegistration(false)}
          theme={ButtonTheme.SOLID}
        >
          Вход
        </Button>
        <Button
          fullWidth
          className={isRegistration ? cls.selected : ""}
          onClick={() => setIsRegistration(true)}
          theme={ButtonTheme.SOLID}
        >
          Регистрация
        </Button>
      </HStack>
      {isRegistration ? (
        <SignUp onCloseModal={onCloseModal} />
      ) : (
        <SignIn onCloseModal={onCloseModal} />
      )}
    </div>
  );
};
