"use client";
import { useState } from "react";

import { Button, ButtonTheme } from "@/shared/ui/Button";
import { SignUp } from "../SignUp/SignUp";
import { SignIn } from "../SignIn/SignIn";
import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./AuthForm.module.css";
import { HStack } from "@/shared/ui/Stack/HStack/HStack";

interface AuthFormProps extends HTMLDivElement {
  onCloseModal: () => void;
}

export const AuthForm = (props: AuthFormProps) => {
  const [isRegistration, setIsRegistration] = useState(false);
  const { onCloseModal, className } = props;

  return (
    <div className={classNames(cls.AuthForm, {}, [className])}>
      <HStack className={cls.authOptions} gap="48" justify="center">
        <Button
          className={isRegistration ? "" : cls.selected}
          onClick={() => setIsRegistration(false)}
          theme={ButtonTheme.CLEAR}
        >
          Вход
        </Button>
        <Button
          className={isRegistration ? cls.selected : ""}
          onClick={() => setIsRegistration(true)}
          theme={ButtonTheme.CLEAR}
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
