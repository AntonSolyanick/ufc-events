"use client";

import { RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";
import { useCallback, useState } from "react";

import { AuthModal } from "@/features/Auth";
import { useCheckAuth, useSignOut } from "@/features/Auth/model/hooks/useAuth";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { AppLink } from "@/shared/ui/AppLink";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button";
import { HStack } from "@/shared/ui/Stack/HStack/HStack";
import { Text } from "@/shared/ui/Text";
import cls from "./Navbar.module.css";
import { TextSize } from "@/shared/ui/Text/Text";

export const Navbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { mutate: onLogout } = useSignOut();
  const { data: user, isPending: isPendingAuth } = useCheckAuth();

  const onShowModal = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  return (
    <header>
      <nav>
        <HStack className={cls.navBar} justify="around">
          <ThemeSwitcher />
          <AppLink href="/favourite-fighters">Мой список</AppLink>
          <AppLink href="/">Все бойцы</AppLink>

          {user ? (
            <Button
              disabled={isPendingAuth}
              onClick={() => onLogout()}
              size={ButtonSize.L}
              theme={ButtonTheme.SOLID}
            >
              <RiLogoutBoxLine />
              <Text size={TextSize.S} text={user.name} />
            </Button>
          ) : (
            <Button
              disabled={isPendingAuth}
              onClick={onShowModal}
              size={ButtonSize.L}
              theme={ButtonTheme.SOLID}
              aria-label="Открыть окно авторизации"
            >
              <RiLoginBoxLine />
            </Button>
          )}
        </HStack>
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={onCloseModal} />
    </header>
  );
};
