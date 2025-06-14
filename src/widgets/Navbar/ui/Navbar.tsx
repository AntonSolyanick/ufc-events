"use client";

import { RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";
import { useCallback, useState } from "react";

import { AuthModal } from "@/features/Auth";
import { useCheckAuth, useSignOut } from "@/features/Auth/model/hooks/useAuth";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { AppLink } from "@/shared/ui/AppLink";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button";
import { HStack } from "@/shared/ui/Stack/HStack/HStack";
import cls from "./Navbar.module.css";

export const Navbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { mutate: onLogout } = useSignOut();
  const { data: user } = useCheckAuth();

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
          <AppLink href="/favourite-fighters">Избранное</AppLink>
          <AppLink href="/">Все бойцы</AppLink>

          {user ? (
            <Button
              onClick={() => onLogout()}
              size={ButtonSize.XL}
              theme={ButtonTheme.SOLID}
            >
              <RiLogoutBoxLine />
            </Button>
          ) : (
            <Button
              onClick={onShowModal}
              size={ButtonSize.XL}
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
